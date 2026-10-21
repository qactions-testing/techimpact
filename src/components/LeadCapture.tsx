'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { CalendarDays, Download, FileText, Loader2, MessageCircle } from 'lucide-react';
import { apiPath } from '@/lib/site';
import { getAttribution, track, useProfile } from '@/lib/client';
import CalendlyEmbed from './CalendlyEmbed';
import WhatsAppLink from './WhatsAppLink';

type CaseRef = { id: string; slug: string; title: string; client: string; industry: string; category: string; vendor: string };

declare global {
  interface Window {
    hcaptcha?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;
const COUNTRIES = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España', 'EE.UU.',
  'Guatemala', 'Honduras', 'México', 'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela', 'Otro',
];

export default function LeadCapture({ item, pdfUrl }: { item: CaseRef; pdfUrl: string }) {
  const [profile] = useProfile();
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [lead, setLead] = useState<{ name?: string; email?: string }>({});
  const started = useRef(false);
  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaId = useRef<string | undefined>(undefined);
  const [captchaToken, setCaptchaToken] = useState('');
  const params = { case_id: item.id, industry: item.industry, category: item.category, vendor: item.vendor };

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track('form_start', { ...params, form_type: 'pdf' });
    if (!HCAPTCHA_SITEKEY || !captchaRef.current) return;
    const render = () => {
      if (window.hcaptcha && captchaRef.current && captchaId.current === undefined)
        captchaId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITEKEY,
          theme: 'dark',
          callback: (t: string) => setCaptchaToken(t),
          'expired-callback': () => setCaptchaToken(''),
        });
    };
    if (window.hcaptcha) render();
    else {
      const s = document.createElement('script');
      s.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&hl=es';
      s.async = true;
      s.onload = render;
      document.body.appendChild(s);
    }
  };

  useEffect(() => {
    if (showCalendar) track('calendly_open', params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCalendar]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (HCAPTCHA_SITEKEY && !captchaToken) {
      setError('Confirme que no es un robot.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    const payload = {
      nombre: String(form.get('nombre') ?? ''),
      email: String(form.get('email') ?? ''),
      empresa: String(form.get('empresa') ?? ''),
      cargo: String(form.get('cargo') ?? ''),
      pais: String(form.get('pais') ?? ''),
      privacidad: form.get('privacidad') === 'on',
      novedades: form.get('novedades') === 'on',
      website: String(form.get('website') ?? ''),
      captcha: captchaToken,
      caseId: item.id,
      attribution: getAttribution(),
      page: window.location.href.split('#')[0],
    };
    track('form_submit', { ...params, form_type: 'pdf' });
    try {
      const res = await fetch(apiPath('/api/lead'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'No pudimos registrar sus datos.');
      track('generate_lead', { ...params, lead_source: 'pdf_case', currency: 'USD', value: 1 });
      setLead({ name: payload.nombre, email: payload.email });
      setStatus('done');
      setShowCalendar(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado.');
      setStatus('error');
      if (captchaId.current !== undefined) window.hcaptcha?.reset(captchaId.current);
      setCaptchaToken('');
    }
  };

  const field =
    'w-full rounded-2xl border border-white/10 bg-ink-deep/60 px-4 py-3 text-beige placeholder:text-beige/35 focus:border-sky focus:outline-none';

  return (
    <section id="contacto" className="no-print scroll-mt-24 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-[#22307a] to-ink p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-aqua/20 blur-[90px]" />
        <div className="relative">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">
            <FileText className="h-4 w-4" /> Caso en PDF
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Llévese este caso para su equipo</h2>
          <p className="mt-2 text-beige/75">
            Ficha de una página con resultados, tecnologías y fuente, lista para compartir en su próxima reunión. Se la
            enviamos también por email.
          </p>

          {status === 'done' ? (
            <div className="mt-6 space-y-4" role="status">
              <p className="text-lg font-semibold text-aqua">¡Listo, {lead.name?.split(' ')[0] || 'gracias'}! Su PDF está listo.</p>
              <a
                href={pdfUrl}
                download
                onClick={() => track('pdf_download', params)}
                className="chrome-button inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-semibold"
              >
                <Download className="h-5 w-5" /> Descargar PDF
              </a>
              <p className="text-sm text-beige/70">¿Quiere ver cómo aplicarlo en su empresa? Elija un horario de 20 minutos.</p>
            </div>
          ) : (
            <form onSubmit={submit} onFocus={onStart} className="mt-6 grid gap-3 sm:grid-cols-2" noValidate={false}>
              <label className="sm:col-span-1">
                <span className="sr-only">Nombre y apellido</span>
                <input name="nombre" required minLength={2} maxLength={80} autoComplete="name" placeholder="Nombre y apellido" defaultValue={profile.name} className={field} />
              </label>
              <label>
                <span className="sr-only">Email corporativo</span>
                <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="Email corporativo" className={field} />
              </label>
              <label>
                <span className="sr-only">Empresa</span>
                <input name="empresa" required maxLength={120} autoComplete="organization" placeholder="Empresa" defaultValue={profile.company} className={field} />
              </label>
              <label>
                <span className="sr-only">Cargo</span>
                <input name="cargo" maxLength={120} autoComplete="organization-title" placeholder="Cargo (opcional)" className={field} />
              </label>
              <label className="sm:col-span-2">
                <span className="sr-only">País</span>
                <select name="pais" required defaultValue={profile.country || ''} className={field}>
                  <option value="" disabled>
                    País
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              {/* Honeypot: hidden from people, filled by bots. */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Sitio web <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <label className="flex items-start gap-2 text-sm text-beige/75 sm:col-span-2">
                <input name="privacidad" type="checkbox" required className="mt-1 accent-sky" />
                <span>
                  Acepto la{' '}
                  <a href="https://qactions.com/politica-de-privacidad/" target="_blank" rel="noopener" className="underline">
                    política de privacidad
                  </a>{' '}
                  y que QActions me contacte sobre esta consulta.
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-beige/75 sm:col-span-2">
                <input name="novedades" type="checkbox" className="mt-1 accent-sky" />
                <span>Quiero recibir casos y novedades de QActions (opcional, me puedo dar de baja).</span>
              </label>
              {HCAPTCHA_SITEKEY && <div ref={captchaRef} className="sm:col-span-2" />}
              {status === 'error' && (
                <p role="alert" className="text-sm text-amber-300 sm:col-span-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="chrome-button flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-semibold disabled:opacity-60 sm:col-span-2"
              >
                {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                Recibir el caso en PDF
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="chrome-card flex flex-col rounded-[2rem] p-6 sm:p-8">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">
          <CalendarDays className="h-4 w-4" /> Demo
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">¿Resultados así en su empresa?</h2>
        <p className="mt-2 text-beige/70">
          20 minutos con un especialista de QActions para ver cómo aplicar este caso a sus sistemas. Sin compromiso.
        </p>
        {showCalendar ? (
          <div className="mt-5">
            <CalendlyEmbed caseId={item.id} caseTitle={item.title} prefill={lead.email ? lead : { name: profile.name || undefined }} />
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => setShowCalendar(true)}
              className="chrome-button flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-semibold"
            >
              <CalendarDays className="h-5 w-5" /> Elegir horario
            </button>
            <WhatsAppLink
              caseSlug={item.slug}
              caseId={item.id}
              placement="case"
              className="flex items-center justify-center gap-2 rounded-2xl border border-beige/30 px-6 py-3.5 font-semibold hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" /> Consultar por WhatsApp
            </WhatsAppLink>
            <p className="text-xs text-beige/45">Al abrir la agenda se carga Calendly, que usa sus propias cookies.</p>
          </div>
        )}
      </div>
    </section>
  );
}
