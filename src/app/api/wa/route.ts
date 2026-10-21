import { NextResponse } from 'next/server';
import { getCaseBySlug, casePath } from '@/lib/cases';
import { absUrl, CONTACT } from '@/lib/site';
import { clientCountry } from '@/lib/server/guard';

/**
 * WhatsApp redirect. The number depends on the visitor's country (Paraguay has
 * its own country manager); the prefilled text names the case so sales knows
 * what the person was reading. No personal data travels in the URL.
 */
export function GET(req: Request) {
  const url = new URL(req.url);
  const item = getCaseBySlug(url.searchParams.get('caso') ?? '');
  const country = clientCountry(req);
  const phone = country === 'PY' ? CONTACT.whatsappParaguay : CONTACT.whatsappLatam;
  const text = item
    ? `Hola QActions, vi el caso "${item.client}: ${item.title}" (${absUrl(casePath(item))}) y quiero conversar sobre algo similar para mi empresa.`
    : 'Hola QActions, vi sus casos de éxito y quiero conversar sobre las necesidades de mi empresa.';
  const res = NextResponse.redirect(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, 302);
  res.headers.set('Cache-Control', 'private, no-store');
  res.headers.set('X-Robots-Tag', 'noindex');
  return res;
}
