import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCaseById, casePath, caseSlug, publisherName } from '@/lib/cases';
import { absUrl, CONTACT } from '@/lib/site';
import { brevoConfigured, sendDoubleOptIn, sendEmail, upsertContact } from '@/lib/server/brevo';
import { pdfEmail, salesAlert } from '@/lib/server/emails';
import { clientCountry, clientIp, rateLimited, sameOrigin, verifyCaptcha } from '@/lib/server/guard';

const s = (max: number) => z.string().trim().max(max);

const Lead = z.object({
  nombre: s(80).min(2),
  email: z.email().max(254),
  empresa: s(120).min(1),
  cargo: s(120).optional().default(''),
  pais: s(60).min(2),
  privacidad: z.literal(true),
  novedades: z.boolean().default(false),
  website: z.string().max(0), // honeypot must be empty
  captcha: z.string().max(4000).optional().default(''),
  caseId: s(120),
  page: z.string().url().max(500),
  attribution: z
    .object({
      utm_source: s(200),
      utm_medium: s(200),
      utm_campaign: s(200),
      utm_term: s(200),
      utm_content: s(200),
      gclid: s(200),
      first_utm_source: s(200),
      referrer: s(500),
      landing: s(500),
    })
    .partial()
    .default({}),
});

const FREE_MAIL = /@(gmail|hotmail|outlook|yahoo|live|icloud|aol|proton(mail)?)\./i;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: 'Origen no permitido.' }, { status: 403 });
  const ip = clientIp(req);
  if (rateLimited(`lead:${ip}`)) {
    return NextResponse.json({ ok: false, error: 'Demasiados intentos. Pruebe en unos minutos.' }, { status: 429 });
  }

  const parsed = Lead.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const honeypot = parsed.error.issues.some((i) => i.path[0] === 'website');
    // Bots get a fake success so they do not retry.
    if (honeypot) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: 'Revise los datos del formulario.' }, { status: 400 });
  }
  const d = parsed.data;
  if (!(await verifyCaptcha(d.captcha, ip))) {
    return NextResponse.json({ ok: false, error: 'No pudimos verificar el captcha.' }, { status: 403 });
  }

  const item = getCaseById(d.caseId);
  if (!item) return NextResponse.json({ ok: false, error: 'Caso no encontrado.' }, { status: 400 });

  if (!brevoConfigured()) {
    console.error('[lead] BREVO_API_KEY missing; lead not stored', { case: d.caseId });
    return NextResponse.json({ ok: false, error: 'Servicio no disponible. Escríbanos a comercial@qactions.com.' }, { status: 503 });
  }

  const a = d.attribution;
  const [first, ...rest] = d.nombre.split(/\s+/);
  const attributes = {
    NOMBRE: first,
    APELLIDOS: rest.join(' ') || undefined,
    FULLNAME: d.nombre,
    COMPANY_NAME: d.empresa,
    JOB_TITLE: d.cargo || undefined,
    COUNTRY: d.pais,
    INDUSTRY: item.industry,
    OPT_IN: d.novedades,
    LEAD_ORIGEN: 'TechImpact · PDF caso',
    CASO_VISTO: item.id,
    CASO_INDUSTRIA: item.industry,
    CASO_PARTNER: publisherName(item),
    LANDING_URL: a.landing ?? d.page,
    UTM_SOURCE: a.utm_source,
    UTM_MEDIUM: a.utm_medium,
    UTM_CAMPAIGN: a.utm_campaign,
    UTM_TERM: a.utm_term,
    UTM_CONTENT: a.utm_content,
    GCLID: a.gclid,
    FIRST_UTM_SOURCE: a.first_utm_source,
    GEO_PAIS_IP: clientCountry(req) || undefined,
  };

  // Every requester becomes a CRM contact (they asked to be contacted about
  // this request). Marketing consent is the OPT_IN attribute: segment
  // campaigns on OPT_IN = true. If a DOI template is set, opt-ins confirm by email.
  const contact = await upsertContact(d.email, attributes);
  if (!contact.ok) {
    console.error('[lead] Brevo upsert failed', contact.status, contact.data);
    return NextResponse.json({ ok: false, error: 'No pudimos registrar sus datos. Escríbanos a comercial@qactions.com.' }, { status: 502 });
  }
  if (contact.degraded) console.warn('[lead] Custom attributes missing in Brevo: run `npm run brevo:setup`.');

  const caseUrl = absUrl(casePath(item));
  const pdfUrl = absUrl(`/pdf/${caseSlug(item)}.pdf`);

  const tasks: Promise<unknown>[] = [];
  const mail = pdfEmail({ name: d.nombre, caseTitle: item.title, client: item.client, pdfUrl, caseUrl, calendly: CONTACT.calendly });
  tasks.push(sendEmail({ to: [{ email: d.email, name: d.nombre }], subject: mail.subject, html: mail.html, tags: ['techimpact', 'pdf'] }));
  if (d.novedades && process.env.BREVO_DOI_TEMPLATE_ID) {
    tasks.push(sendDoubleOptIn(d.email, { OPT_IN: true }, absUrl(`/gracias?caso=${encodeURIComponent(caseSlug(item))}`)));
  }
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (notify) {
    const alert = salesAlert({
      title: `Nuevo lead TechImpact: ${d.empresa} · ${item.client}`,
      rows: [
        ['Nombre', d.nombre],
        ['Email', d.email + (FREE_MAIL.test(d.email) ? ' (email personal)' : '')],
        ['Empresa', d.empresa],
        ['Cargo', d.cargo],
        ['País', d.pais],
        ['Caso', `${item.client}: ${item.title}`],
        ['URL', caseUrl],
        ['Fuente', [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(' / ') || a.first_utm_source],
        ['Acepta novedades', d.novedades ? 'Sí' : 'No'],
      ],
    });
    tasks.push(sendEmail({ to: notify.split(',').map((email) => ({ email: email.trim() })), subject: alert.subject, html: alert.html, tags: ['techimpact', 'alerta'] }));
  }
  const results = await Promise.allSettled(tasks);
  results.forEach((r) => {
    if (r.status === 'rejected' || (r.value as { ok?: boolean })?.ok === false) console.error('[lead] side task failed', r);
  });

  return NextResponse.json({ ok: true });
}
