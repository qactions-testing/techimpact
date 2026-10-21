import 'server-only';

// Thin wrapper over the Brevo REST API (https://developers.brevo.com).
// The API key never leaves the server.

// Overridable only for local tests against a mock server.
const API = process.env.BREVO_API_BASE || 'https://api.brevo.com/v3';

export type BrevoResult<T = unknown> = { ok: boolean; status: number; data: T };

async function call<T = unknown>(path: string, init: RequestInit = {}): Promise<BrevoResult<T>> {
  const key = process.env.BREVO_API_KEY;
  if (!key) return { ok: false, status: 500, data: { message: 'BREVO_API_KEY missing' } as T };
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { 'api-key': key, accept: 'application/json', 'content-type': 'application/json', ...init.headers },
    cache: 'no-store',
  });
  const text = await res.text();
  let data: unknown = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }
  return { ok: res.ok, status: res.status, data: data as T };
}

export const brevoConfigured = () => !!process.env.BREVO_API_KEY;
const listIds = () =>
  (process.env.BREVO_LIST_ID ?? '')
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0);

type Attrs = Record<string, string | number | boolean | undefined>;
const clean = (a: Attrs) => Object.fromEntries(Object.entries(a).filter(([, v]) => v !== undefined && v !== ''));

/** Built-in attributes that exist in the QActions account already. */
const CORE = new Set(['NOMBRE', 'APELLIDOS', 'FULLNAME', 'COMPANY_NAME', 'JOB_TITLE', 'COUNTRY', 'INDUSTRY', 'OPT_IN']);

/**
 * Create or update a contact. If Brevo rejects the payload (e.g. a custom
 * attribute was not created yet with `npm run brevo:setup`), retry with core
 * attributes only so the lead is never lost.
 */
export async function upsertContact(email: string, attributes: Attrs, addToLists = true) {
  const body = (attrs: Attrs) =>
    JSON.stringify({ email, attributes: clean(attrs), updateEnabled: true, ...(addToLists && listIds().length ? { listIds: listIds() } : {}) });
  let r = await call<{ id?: number; message?: string }>('/contacts', { method: 'POST', body: body(attributes) });
  let degraded = false;
  if (!r.ok && r.status === 400) {
    degraded = true;
    const core = Object.fromEntries(Object.entries(attributes).filter(([k]) => CORE.has(k)));
    r = await call('/contacts', { method: 'POST', body: body(core) });
  }
  return { ...r, degraded };
}

export async function getContact(email: string) {
  return call<{ id?: number; attributes?: Record<string, unknown> }>(`/contacts/${encodeURIComponent(email)}?identifierType=email_id`);
}

/** Double opt-in for marketing consent (only if a DOI template is configured). */
export async function sendDoubleOptIn(email: string, attributes: Attrs, redirectionUrl: string) {
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const lists = listIds();
  if (!templateId || !lists.length) return { ok: false, status: 0, data: { message: 'DOI not configured' } };
  return call('/contacts/doubleOptinConfirmation', {
    method: 'POST',
    body: JSON.stringify({ email, attributes: clean(attributes), includeListIds: lists, templateId, redirectionUrl }),
  });
}

export async function sendEmail(opts: { to: { email: string; name?: string }[]; subject: string; html: string; tags?: string[] }) {
  return call('/smtp/email', {
    method: 'POST',
    body: JSON.stringify({
      sender: { name: 'QActions', email: process.env.BREVO_SENDER_EMAIL || 'marketing@qactions.com' },
      replyTo: { email: 'comercial@qactions.com', name: 'QActions Comercial' },
      to: opts.to,
      subject: opts.subject,
      htmlContent: opts.html,
      tags: opts.tags,
    }),
  });
}

/** Deal in Brevo CRM (Free plan: 50 open deals, so only for booked demos). */
export async function createDeal(name: string, contactId: number | undefined, attributes: Attrs = {}) {
  const attrs: Attrs = { ...attributes };
  if (process.env.BREVO_PIPELINE_ID) attrs.pipeline = process.env.BREVO_PIPELINE_ID;
  if (process.env.BREVO_DEAL_STAGE_ID) attrs.deal_stage = process.env.BREVO_DEAL_STAGE_ID;
  const r = await call<{ id?: string }>('/crm/deals', { method: 'POST', body: JSON.stringify({ name, attributes: clean(attrs) }) });
  if (r.ok && r.data.id && contactId) {
    await call(`/crm/deals/link-unlink/${r.data.id}`, { method: 'PATCH', body: JSON.stringify({ linkContactIds: [contactId] }) });
  }
  return r;
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);
