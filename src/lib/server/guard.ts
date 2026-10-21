import 'server-only';

// Best-effort, per-instance rate limit. Serverless instances do not share
// memory, so add a platform rule too (Vercel Firewall or Cloudflare WAF) for
// real protection: 10 POST/min per IP on /casos-de-exito/api/*.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, max = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

export function clientIp(req: Request) {
  return (
    req.headers.get('x-visitor-ip') ||
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export function clientCountry(req: Request) {
  // x-visitor-country comes from the qactions.com proxy Worker.
  return (
    req.headers.get('x-visitor-country') ||
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-vercel-ip-country') ||
    ''
  ).toUpperCase();
}

/** Same-origin check: the browser sends Origin on POST. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return (
      host === 'qactions.com' ||
      host === 'www.qactions.com' ||
      host === 'localhost' ||
      host.endsWith('.vercel.app') ||
      host.endsWith('.workers.dev') ||
      host === req.headers.get('host')?.split(':')[0]
    );
  } catch {
    return false;
  }
}

export async function verifyCaptcha(token: string, ip: string) {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return true; // Captcha not configured: honeypot + rate limit only.
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  if (process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY) body.set('sitekey', process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY);
  try {
    const r = await fetch('https://api.hcaptcha.com/siteverify', { method: 'POST', body });
    const data = (await r.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}
