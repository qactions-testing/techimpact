import 'server-only';
import { escapeHtml } from './brevo';

const wrap = (inner: string) => `<!doctype html><html lang="es"><body style="margin:0;background:#f5f3db;font-family:Poppins,Arial,sans-serif;color:#2f2f2c">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3db;padding:24px 0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:#283890;padding:24px 32px"><img src="https://qactions.com/casos-de-exito/logos/qactions-white.png" alt="QActions" height="28" style="display:block;height:28px"></td></tr>
<tr><td style="padding:32px">${inner}</td></tr>
<tr><td style="background:#2f2f2c;color:#f5f3db;padding:20px 32px;font-size:12px;line-height:1.6">QActions · Calidad que impulsa<br>comercial@qactions.com · +54 9 11 6423-5643 · Paraguay +595 986 622020</td></tr>
</table></td></tr></table></body></html>`;

export function pdfEmail(o: { name: string; caseTitle: string; client: string; pdfUrl: string; caseUrl: string; calendly: string }) {
  const first = escapeHtml(o.name.split(' ')[0] || '');
  return {
    subject: `Su caso en PDF: ${o.client} · ${o.caseTitle}`,
    html: wrap(`<p style="font-size:16px;margin:0 0 12px">Hola ${first},</p>
<p style="font-size:16px;line-height:1.6;margin:0 0 20px">Aquí tiene el caso <strong>${escapeHtml(o.client)}: ${escapeHtml(o.caseTitle)}</strong> en PDF, listo para compartir con su equipo.</p>
<p style="margin:0 0 24px"><a href="${o.pdfUrl}" style="background:#283890;color:#f5f3db;text-decoration:none;padding:14px 24px;border-radius:12px;font-weight:600;display:inline-block">Descargar el PDF</a></p>
<p style="font-size:15px;line-height:1.6;margin:0 0 12px">¿Quiere ver cómo lograr un resultado así en su empresa? Agende 20 minutos con un especialista:</p>
<p style="margin:0 0 24px"><a href="${o.calendly}" style="color:#283890;font-weight:600">Elegir horario para una demo →</a></p>
<p style="font-size:13px;color:#6b6b72;margin:0">Ver el caso online: <a href="${o.caseUrl}" style="color:#283890">${o.caseUrl}</a></p>`),
  };
}

export function salesAlert(o: { title: string; rows: [string, string | undefined][] }) {
  const rows = o.rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b6b72;font-size:13px;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:14px">${escapeHtml(v!)}</td></tr>`)
    .join('');
  return { subject: o.title, html: wrap(`<p style="font-size:18px;font-weight:700;margin:0 0 16px">${escapeHtml(o.title)}</p><table role="presentation">${rows}</table>`) };
}
