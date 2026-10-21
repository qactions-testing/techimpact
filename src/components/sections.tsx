import Link from 'next/link';
import { CalendarDays, MessageCircle, Quote } from 'lucide-react';
import { QACTIONS_TESTIMONIALS } from '@/data/cases';
import { casePath, casesByIndustry, industriesWithCases, industrySlug } from '@/lib/cases';
import { QACTIONS_FACTS } from '@/lib/offer';
import { CONTACT } from '@/lib/site';
import { SectionHeading, VendorLogo } from './ui';
import WhatsAppLink from './WhatsAppLink';

/** Server-rendered index: every case is one crawlable link away from the hub. */
export function IndustryIndex() {
  return (
    <section>
      <SectionHeading eyebrow="Índice" title="Casos por industria" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industriesWithCases().map((i) => {
          const list = casesByIndustry(i);
          return (
            <div key={i} className="chrome-card rounded-3xl p-5">
              <Link href={`/${industrySlug(i)}`} className="font-bold text-beige hover:text-sky">
                {i} <span className="text-sm font-normal text-beige/45">· {list.length}</span>
              </Link>
              <ul className="mt-3 space-y-1.5 text-sm">
                {list.map((c) => (
                  <li key={c.id}>
                    <Link href={casePath(c)} className="text-beige/65 hover:text-beige">
                      {c.client}: {c.heroKpi.value} {c.heroKpi.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section>
      <SectionHeading eyebrow="Clientes de QActions" title="Lo que dicen" />
      <div className="grid gap-4 md:grid-cols-3">
        {QACTIONS_TESTIMONIALS.map((t) => (
          <figure key={t.author} className="chrome-card rounded-3xl p-6">
            <Quote className="h-6 w-6 text-sky" />
            <blockquote className="mt-3 text-lg leading-relaxed font-medium">“{t.text}”</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold">{t.author}</span>
              <span className="block text-beige/55">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-xs text-beige/40">
        Fuente:{' '}
        <a href="https://qactions.com/clientes/" className="underline">
          qactions.com/clientes
        </a>
      </p>
    </section>
  );
}

export function QActionsBand() {
  return (
    <section className="no-print relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-[#22307a] to-ink p-6 sm:p-10">
      <div className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-violet/30 blur-[90px]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <VendorLogo id="qactions" size="lg" />
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Calidad que impulsa resultados como estos.</h2>
          <p className="mt-3 max-w-xl text-beige/75">
            QActions implementa Tricentis, Veracode, hCaptcha, Automation Anywhere y Synthesized en banca, seguros, retail,
            telecomunicaciones, minería, energía, salud y sector público, desde Argentina, Paraguay y EE.UU.
          </p>
          <dl className="mt-6 grid max-w-lg grid-cols-3 gap-4">
            {QACTIONS_FACTS.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-2xl font-black text-beige sm:text-3xl">{f.value}</dd>
                <dd className="text-xs text-beige/60">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-3">
          <a href={CONTACT.calendly} className="chrome-button flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold">
            <CalendarDays className="h-5 w-5" /> Agendar demo de 20 minutos
          </a>
          <WhatsAppLink
            placement="band"
            className="flex items-center justify-center gap-2 rounded-2xl border border-beige/30 px-4 py-3 text-center font-semibold hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5" /> Escribir por WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
