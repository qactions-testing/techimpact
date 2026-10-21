import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCaseById, casePath, publisherName } from '@/lib/cases';
import { absUrl } from '@/lib/site';
import { createDeal, getContact, sendEmail, upsertContact } from '@/lib/server/brevo';
import { salesAlert } from '@/lib/server/emails';
import { clientIp, rateLimited, sameOrigin } from '@/lib/server/guard';

const Body = z.object({
  inviteeUri: z
    .string()
    .regex(/^https:\/\/api\.calendly\.com\/scheduled_events\/[\w-]+\/invitees\/[\w-]+$/),
  caseId: z.string().max(120),
  attribution: z.record(z.string(), z.string().max(500)).optional().default({}),
});

type Invitee = {
  resource: {
    email: string;
    name: string;
    event: string;
    questions_and_answers?: { question: string; answer: string }[];
    tracking?: Record<string, string | null>;
  };
};

/**
 * Called by the browser after `calendly.event_scheduled`. The message itself
 * is untrusted, so with CALENDLY_TOKEN set we re-read the invitee from the
 * Calendly API (free plan) and only then write to Brevo. Without a token the
 * booking is counted in GA4 only.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  if (rateLimited(`demo:${clientIp(req)}`, 5)) return NextResponse.json({ ok: false }, { status: 429 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  const token = process.env.CALENDLY_TOKEN;
  if (!token || !process.env.BREVO_API_KEY) return NextResponse.json({ ok: true, verified: false });

  const auth = { headers: { authorization: `Bearer ${token}` }, cache: 'no-store' as const };
  const inv = await fetch(parsed.data.inviteeUri, auth);
  if (!inv.ok) return NextResponse.json({ ok: false, verified: false }, { status: 400 });
  const invitee = ((await inv.json()) as Invitee).resource;
  const ev = await fetch(invitee.event, auth).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  const start: string | undefined = ev?.resource?.start_time;

  const item = getCaseById(parsed.data.caseId);
  const existing = await getContact(invitee.email);
  if (existing.ok && existing.data.attributes?.CALENDLY_INVITEE === parsed.data.inviteeUri) {
    return NextResponse.json({ ok: true, verified: true, duplicate: true });
  }

  const company = invitee.questions_and_answers?.find((q) => /empresa|company/i.test(q.question))?.answer;
  const a = parsed.data.attribution;
  const contact = await upsertContact(invitee.email, {
    FULLNAME: invitee.name,
    NOMBRE: invitee.name.split(' ')[0],
    COMPANY_NAME: company,
    DEMO_AGENDADA: true,
    FECHA_DEMO: start?.slice(0, 10),
    CALENDLY_INVITEE: parsed.data.inviteeUri,
    LEAD_ORIGEN: 'TechImpact · Demo Calendly',
    CASO_VISTO: item?.id,
    CASO_INDUSTRIA: item?.industry,
    CASO_PARTNER: item ? publisherName(item) : undefined,
    UTM_SOURCE: a.utm_source,
    UTM_MEDIUM: a.utm_medium,
    UTM_CAMPAIGN: a.utm_campaign,
    FIRST_UTM_SOURCE: a.first_utm_source,
  });
  let contactId = (contact.data as { id?: number }).id;
  if (!contactId) contactId = (await getContact(invitee.email)).data.id;

  const deal = await createDeal(
    `Demo TechImpact · ${company || invitee.name} · ${item?.client ?? 'caso'}`.slice(0, 120),
    contactId,
  );
  if (!deal.ok) console.error('[demo] Brevo deal failed', deal.status, deal.data);

  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (notify) {
    const alert = salesAlert({
      title: `Demo agendada desde TechImpact: ${company || invitee.name}`,
      rows: [
        ['Nombre', invitee.name],
        ['Email', invitee.email],
        ['Empresa', company],
        ['Fecha', start ? new Date(start).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }) : undefined],
        ['Caso', item ? `${item.client}: ${item.title}` : undefined],
        ['URL', item ? absUrl(casePath(item)) : undefined],
        ['Fuente', [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(' / ') || a.first_utm_source],
      ],
    });
    await sendEmail({ to: notify.split(',').map((email) => ({ email: email.trim() })), subject: alert.subject, html: alert.html, tags: ['techimpact', 'demo'] });
  }
  return NextResponse.json({ ok: true, verified: true, deal: deal.ok });
}
