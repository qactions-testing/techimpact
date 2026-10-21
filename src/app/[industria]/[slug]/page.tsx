import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, CheckCircle2, ExternalLink, Link2, MapPin, Quote } from 'lucide-react';
import CaseActions from '@/components/CaseActions';
import JsonLd from '@/components/JsonLd';
import LeadCapture from '@/components/LeadCapture';
import { CaseCard, VendorLogo } from '@/components/ui';
import { CATEGORY_ACCENT, CATEGORY_ICON } from '@/lib/categories';
import { VENDORS } from '@/data/vendors';
import {
  CASE_STUDIES,
  caseDescription,
  casePath,
  caseSlug,
  caseTitleTag,
  getCaseBySlug,
  industrySlug,
  isOwnCase,
  publisherName,
  relatedCases,
} from '@/lib/cases';
import { QACTIONS_OFFER } from '@/lib/offer';
import { absUrl, BASE_PATH, CONTACT, CONTENT_REVIEWED_AT, ORG_ID } from '@/lib/site';

type Params = { industria: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((c) => ({ industria: industrySlug(c.industry), slug: caseSlug(c) }));
}

function load(params: Params) {
  const item = getCaseBySlug(params.slug);
  if (!item || industrySlug(item.industry) !== params.industria) notFound();
  return item;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const item = load(await params);
  const url = absUrl(casePath(item));
  return {
    title: caseTitleTag(item),
    description: caseDescription(item),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${item.client}: ${item.title}`,
      description: item.summary,
      images: [{ url: absUrl(`/og/${caseSlug(item)}.png`), width: 1200, height: 630, alt: `${item.client}: ${item.heroKpi.value} ${item.heroKpi.label}` }],
    },
  };
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
  const item = load(await params);
  const url = absUrl(casePath(item));
  const Icon = CATEGORY_ICON[item.category];
  const own = isOwnCase(item);
  const partner = item.technology ?? item.vendor;
  const offer = QACTIONS_OFFER[item.category];
  const related = relatedCases(item);
  const where = [item.industry, item.country].filter(Boolean).join(', ');
  const pdfUrl = `${BASE_PATH}/pdf/${caseSlug(item)}.pdf`;

  // Answer-first summary: the sentence search engines and AI assistants quote.
  const capsule = `${item.client} (${where}) logró ${item.heroKpi.value} ${item.heroKpi.label} con ${item.products
    .slice(0, 3)
    .join(', ')}. ${own ? 'Proyecto implementado por QActions.' : `Cifras publicadas por ${publisherName(item)}.`}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: `${item.client}: ${item.title}`.slice(0, 110),
      description: item.summary,
      inLanguage: 'es',
      url,
      mainEntityOfPage: url,
      image: absUrl(`/og/${caseSlug(item)}.png`),
      dateModified: CONTENT_REVIEWED_AT,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      about: [
        { '@type': 'Thing', name: item.category },
        ...item.products.map((p) => ({ '@type': 'SoftwareApplication', name: p })),
      ],
      mentions: own
        ? undefined
        : [{ '@type': 'Organization', name: VENDORS[item.vendor].name, url: VENDORS[item.vendor].website }],
      citation: item.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'QActions', item: 'https://qactions.com/' },
        { '@type': 'ListItem', position: 2, name: 'Casos de éxito', item: absUrl('/') },
        { '@type': 'ListItem', position: 3, name: item.industry, item: absUrl(`/${industrySlug(item.industry)}`) },
        { '@type': 'ListItem', position: 4, name: item.title },
      ],
    },
  ];

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <nav aria-label="Ruta" className="no-print text-sm text-beige/55">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-beige">
              Casos de éxito
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/${industrySlug(item.industry)}`} className="hover:text-beige">
              {item.industry}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-beige/80" aria-current="page">
            {item.client}
          </li>
        </ol>
      </nav>

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
            <CaseActions item={item} url={url} />
          </div>

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

          <p className="text-kpi mt-6 text-7xl leading-[0.9] font-black tracking-tighter break-words sm:text-8xl lg:text-9xl">
            {item.heroKpi.value}
          </p>
          <p className="mt-3 max-w-2xl text-xl font-semibold text-beige sm:text-2xl">{item.heroKpi.label}</p>

          <h1 className="text-title mt-8 text-3xl leading-tight font-bold sm:text-4xl">{item.title}</h1>
          <p className="mt-2 text-base font-medium text-beige/60">
            {item.client}
            {item.anonymized && <span className="ml-2 text-xs text-beige/40">(nombre reservado por la fuente)</span>}
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-beige/80">{item.summary}</p>
        </div>
      </header>

      <section aria-label="En resumen" className="chrome-card rounded-3xl border-l-4 border-l-aqua p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-aqua">En resumen</h2>
        <p className="mt-2 text-lg leading-relaxed text-beige">{capsule}</p>
      </section>

      {item.kpis.length > 0 && (
        <section aria-label="Resultados">
          <h2 className="sr-only">Resultados</h2>
          <div
            className={`grid gap-4 ${
              ({ 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' } as Record<number, string>)[item.kpis.length] ??
              'sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {item.kpis.map((k) => (
              <div key={k.label} className="chrome-card rounded-3xl p-6">
                <p className="text-kpi text-4xl leading-none font-black tracking-tight break-words sm:text-5xl">{k.value}</p>
                <p className="mt-3 text-sm text-beige/70">{k.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="chrome-card rounded-3xl p-6 sm:p-8">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-bold">
            <span className="rounded-full bg-amber-400/15 p-2 text-amber-300">
              <AlertTriangle className="h-5 w-5" />
            </span>
            El desafío
          </h2>
          <ul className="space-y-4">
            {item.painPoints.map((p) => (
              <li key={p} className="flex gap-3 text-beige/80">
                <span className="glow-dot mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-300 text-amber-300" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="chrome-card rounded-3xl p-6 sm:p-8">
          <h2 className="mb-5 flex items-center gap-3 text-xl font-bold">
            <span className="rounded-full bg-aqua/15 p-2 text-aqua">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            La solución y sus beneficios
          </h2>
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
          <blockquote className="mt-3 text-xl leading-relaxed font-medium text-beige sm:text-2xl">“{item.quote.text}”</blockquote>
          <figcaption className="mt-4 text-sm text-beige/60">{item.quote.author}</figcaption>
        </figure>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="chrome-card rounded-3xl p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-beige/60">Tecnologías</h2>
          <div className="flex flex-wrap gap-2">
            {item.products.map((p) => (
              <span key={p} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="chrome-card rounded-3xl p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-beige/60">Fuente</h2>
          {own ? (
            <p className="text-sm leading-relaxed text-beige/75">
              Caso propio de QActions. Por confidencialidad, las referencias del cliente se comparten a pedido en una reunión
              comercial:{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-sky underline">
                {CONTACT.email}
              </a>
              .
            </p>
          ) : (
            <>
              <ul className="space-y-2">
                {item.sources.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 text-sky underline-offset-4 hover:underline"
                    >
                      <Link2 className="h-4 w-4" /> {s.label} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-beige/45">
                Caso publicado por {publisherName(item)}; las cifras se citan textualmente de esa fuente. QActions es partner
                de {publisherName(item)} e implementa su tecnología en LATAM. Revisado el{' '}
                {CONTENT_REVIEWED_AT.split('-').reverse().join('/')}.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="chrome-card rounded-3xl p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">Lectura QActions</p>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
          Cómo lograr un resultado así {partner === 'qactions' ? 'en su empresa' : `con ${VENDORS[partner].name} en su empresa`}
        </h2>
        {item.qactionsTake && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-beige/85">{item.qactionsTake}</p>}
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {offer.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-kpi text-3xl font-black">0{i + 1}</p>
              <p className="mt-2 font-bold">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-beige/70">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-beige/60">
          Servicios de QActions relacionados: {offer.services.join(' · ')}.
        </p>
      </section>

      <LeadCapture
        item={{ id: item.id, slug: caseSlug(item), title: item.title, client: item.client, industry: item.industry, category: item.category, vendor: item.vendor }}
        pdfUrl={pdfUrl}
      />

      {related.length > 0 && (
        <section className="no-print">
          <h2 className="mb-4 text-xl font-bold">Casos relacionados</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.map((r) => (
              <CaseCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
