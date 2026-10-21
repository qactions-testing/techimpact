/**
 * Cloudflare Worker (gratis) que publica la app en qactions.com/casos-de-exito.
 * WordPress sigue sirviendo todo lo demás sin cambios.
 *
 * Ruta del Worker en Cloudflare:  qactions.com/casos-de-exito*
 * Variable ORIGIN: dominio de producción del proyecto en Vercel,
 * p. ej. techimpact-qactions.vercel.app (sin https://).
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = env.ORIGIN;
    const target = new URL(request.url);
    target.hostname = origin;
    target.protocol = 'https:';
    target.port = '';
    // Vercel Web Analytics vive en /_vercel/* en la raíz del deployment.
    if (url.pathname.startsWith('/casos-de-exito/_vercel/')) {
      target.pathname = url.pathname.replace('/casos-de-exito', '');
    }
    const headers = new Headers(request.headers);
    headers.set('x-forwarded-host', url.host);
    headers.set('x-forwarded-proto', 'https');
    // Cloudflare does not guarantee cf-* headers on subrequests: pass the
    // visitor's country and IP explicitly (WhatsApp number, rate limit).
    headers.set('x-visitor-country', request.cf?.country ?? request.headers.get('cf-ipcountry') ?? '');
    headers.set('x-visitor-ip', request.headers.get('cf-connecting-ip') ?? '');
    const res = await fetch(new Request(target, { method: request.method, headers, body: request.body, redirect: 'manual' }));
    const out = new Response(res.body, res);
    // El noindex de hosts técnicos no aplica al dominio público.
    if (out.headers.get('x-robots-tag')?.includes('nofollow')) out.headers.delete('x-robots-tag');
    // Las redirecciones del origen deben apuntar al dominio público.
    const loc = out.headers.get('location');
    if (loc) out.headers.set('location', loc.replace(`https://${origin}`, `https://${url.host}`));
    return out;
  },
};
