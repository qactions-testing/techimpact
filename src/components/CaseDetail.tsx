import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Link2,
  MapPin,
  MessageCircle,
  PlayCircle,
  Printer,
  Quote,
  Share2,
} from 'lucide-react';
import { QACTIONS_LINKS, VENDORS } from '../data/vendors';
import { caseUrl, shareLink } from '../lib';
import { CaseStudy } from '../types';
import { CATEGORY_ACCENT, CATEGORY_ICON, CaseCard, SaveButton, VendorLogo } from './ui';

const QA_BLOG = 'https://qactions.com';

// The most relevant QActions article for each case, so the "read more" CTA is never generic.
function blogFor(item: CaseStudy): { label: string; url: string } {
  if (['Banca', 'Servicios Financieros'].includes(item.industry))
    return { label: 'Testing bancario: guía práctica de QA/QC', url: `${QA_BLOG}/testing-bancario-2026-guia-practica-de-qa-qc/` };
  if (['Fintech', 'Crypto Exchange'].includes(item.industry))
    return { label: 'QA en sistemas de pagos electrónicos', url: `${QA_BLOG}/qa-sistemas-pagos-electronicos-latam/` };
  if (['Energía', 'Petróleo y Gas', 'Minería'].includes(item.industry))
    return { label: 'Pruebas funcionales de software en energía con IA', url: `${QA_BLOG}/pruebas-funcionales-software-energia-empresas-con-ia/` };
  if (item.category === 'RPA + IA')
    return { label: 'QA/QC y RPA con IA', url: `${QA_BLOG}/ia-en-software-qaqc-testing-con-ia/` };
  if (item.vendor === 'tricentis' || item.technology === 'tricentis')
    return { label: 'Tricentis Tosca Agentic: testing con IA', url: `${QA_BLOG}/tricentis-tosca-agentic-testing-de-software-con-ia/` };
  return { label: 'Ciclo completo de pruebas de software', url: `${QA_BLOG}/pruebas-de-software-testing-qa-qc-guia-2026/` };
}

export default function CaseDetail({
  item,
  related,
  isSaved,
  onToggleSave,
  onBack,
  onOpen,
}: {
  item: CaseStudy;
  related: CaseStudy[];
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  onBack: () => void;
  onOpen: (id: string) => void;
}) {
  const [shareState, setShareState] = useState<string | null>(null);
  const Icon = CATEGORY_ICON[item.category];
  const blog = blogFor(item);
  const partner = item.technology ?? item.vendor;
  const offering = partner === 'qactions' ? 'soluciones como esta' : VENDORS[partner].name;

  const share = async () => {
    const result = await shareLink(`${item.client}: ${item.title}`, caseUrl(item.id));
    setShareState(result === 'copied' ? 'Enlace copiado' : result === 'failed' ? 'No se pudo compartir' : null);
    window.setTimeout(() => setShareState(null), 2500);
  };

  return (
    <article className="space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="no-print inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-beige/70 transition-colors hover:bg-white/5 hover:text-beige"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a los casos
      </button>

      {/* Hero */}
      <header className="chrome-card-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-brand/50 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-violet/25 blur-[100px]" />

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <VendorLogo id={item.vendor} size="md" />
              {item.technology && (
                <>
                  <span className="text-xs font-semibold uppercase tracking-widest text-beige/40">con</span>
                  <VendorLogo id={item.technology} size="md" />
                </>
              )}
            </div>
            <div className="no-print flex items-center gap-1">
              <SaveButton saved={isSaved(item.id)} onToggle={() => onToggleSave(item.id)} />
              <button type="button" onClick={share} aria-label="Compartir caso" className="rounded-full p-2.5 hover:bg-white/10">
                <Share2 className="h-5 w-5 text-beige/70" />
              </button>
              <button type="button" onClick={() => window.print()} aria-label="Imprimir o guardar PDF" className="rounded-full p-2.5 hover:bg-white/10">
                <Printer className="h-5 w-5 text-beige/70" />
              </button>
            </div>
          </div>
          {shareState && <p className="mt-2 text-right text-xs text-aqua">{shareState}</p>}

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5">
              <Icon className={`h-4 w-4 ${CATEGORY_ACCENT[item.category]}`} /> {item.category}
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1.5 text-beige/70">{item.industry}</span>
            {item.country && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-beige/70">
                <MapPin className="h-3.5 w-3.5" /> {item.country}
              </span>
            )}
          </div>

          <h1 className="text-kpi mt-6 text-7xl leading-[0.9] font-black tracking-tighter break-words sm:text-8xl lg:text-9xl">
            {item.heroKpi.value}
          </h1>
          <p className="mt-3 max-w-2xl text-xl font-semibold text-beige sm:text-2xl">{item.heroKpi.label}</p>

          <h2 className="text-title mt-8 text-3xl leading-tight font-bold sm:text-4xl">{item.title}</h2>
          <p className="mt-2 text-base font-medium text-beige/60">
            {item.client}
            {item.anonymized && <span className="ml-2 text-xs text-beige/40">(nombre reservado por la fuente)</span>}
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-beige/80">{item.summary}</p>
        </div>
      </header>

      {/* KPI wall */}
      {item.kpis.length > 0 && (
        <section
          aria-label="Resultados"
          className={`grid gap-4 ${
            { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }[item.kpis.length] ?? 'sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {item.kpis.map((k) => (
            <div key={k.label} className="chrome-card rounded-3xl p-6">
              <p className="text-kpi text-4xl leading-none font-black tracking-tight break-words sm:text-5xl">{k.value}</p>
              <p className="mt-3 text-sm text-beige/70">{k.label}</p>
            </div>
          ))}
        </section>
      )}

      {/* Pain points & benefits */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="chrome-card rounded-3xl p-6 sm:p-8">
          <h3 className="mb-5 flex items-center gap-3 text-xl font-bold">
            <span className="rounded-full bg-amber-400/15 p-2 text-amber-300">
              <AlertTriangle className="h-5 w-5" />
            </span>
            Pain points
          </h3>
          <ul className="space-y-4">
            {item.painPoints.map((p) => (
              <li key={p} className="flex gap-3 text-beige/80">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-300 glow-dot" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="chrome-card rounded-3xl p-6 sm:p-8">
          <h3 className="mb-5 flex items-center gap-3 text-xl font-bold">
            <span className="rounded-full bg-aqua/15 p-2 text-aqua">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            Beneficios
          </h3>
          <ul className="space-y-4">
            {item.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-beige/80">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-aqua" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {item.quote && (
        <figure className="chrome-card rounded-3xl p-6 sm:p-8">
          <Quote className="h-8 w-8 text-sky" />
          <blockquote className="mt-3 text-xl leading-relaxed font-medium text-beige sm:text-2xl">
            “{item.quote.text}”
          </blockquote>
          <figcaption className="mt-4 text-sm text-beige/60">{item.quote.author}</figcaption>
        </figure>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="chrome-card rounded-3xl p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-beige/60">Tecnologías</h3>
          <div className="flex flex-wrap gap-2">
            {item.products.map((p) => (
              <span key={p} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="chrome-card rounded-3xl p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-beige/60">Fuente oficial</h3>
          <ul className="space-y-2">
            {item.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky underline-offset-4 hover:underline"
                >
                  <Link2 className="h-4 w-4" /> {s.label} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-beige/40">
            Cifras publicadas por {VENDORS[item.vendor].name}. Ver el documento original para el contexto completo.
          </p>
        </div>
      </section>

      {/* QActions CTA: the only vendor clients are routed to */}
      <section className="no-print relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-[#22307a] to-ink p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-aqua/20 blur-[90px]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <VendorLogo id="qactions" size="md" />
            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">¿Resultados así en su empresa?</h3>
            <p className="mt-2 text-beige/75">
              QActions implementa {offering} en LATAM, con más de 500 proyectos de QA, testing, ciberseguridad y RPA + IA.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:w-auto">
            <a href={QACTIONS_LINKS.demo} target="_blank" rel="noopener noreferrer" className="chrome-button flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-semibold">
              <PlayCircle className="h-5 w-5" /> Solicitar demo
            </a>
            <a href={QACTIONS_LINKS.contact} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border border-beige/30 px-5 py-3.5 font-semibold hover:bg-white/10">
              <MessageCircle className="h-5 w-5" /> Contacto
            </a>
            <a href={blog.url} target="_blank" rel="noopener noreferrer" title={blog.label} className="flex items-center justify-center gap-2 rounded-2xl border border-beige/30 px-5 py-3.5 font-semibold hover:bg-white/10">
              <BookOpen className="h-5 w-5" /> Leer en el blog
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="no-print">
          <h3 className="mb-4 text-xl font-bold">Casos relacionados</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.map((r) => (
              <CaseCard
                key={r.id}
                item={r}
                saved={isSaved(r.id)}
                onToggleSave={() => onToggleSave(r.id)}
                onOpen={() => onOpen(r.id)}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
