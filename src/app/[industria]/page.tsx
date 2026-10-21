import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { QActionsBand } from '@/components/sections';
import { CaseCard } from '@/components/ui';
import { VENDORS } from '@/data/vendors';
import {
  casePath,
  casesByIndustry,
  industriesWithCases,
  industryFromSlug,
  industrySlug,
  MIN_CASES_TO_INDEX_INDUSTRY,
} from '@/lib/cases';
import { absUrl, ORG_ID } from '@/lib/site';

type Params = { industria: string };
// Unknown slugs still 404 through load(). (dynamicParams=false on this
// top-level segment made OpenNext on Workers answer 404 for every hub.)
export const dynamicParams = true;

export function generateStaticParams(): Params[] {
  return industriesWithCases().map((i) => ({ industria: industrySlug(i) }));
}

function load(slug: string) {
  const industry = industryFromSlug(slug);
  if (!industry) notFound();
  return { industry, list: casesByIndustry(industry) };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { industria } = await params;
  const { industry, list } = load(industria);
  const partners = Array.from(new Set(list.map((c) => VENDORS[c.vendor].name)));
  return {
    title: `Casos de éxito en ${industry}: testing, ciberseguridad y RPA + IA`,
    description: `${list.length} casos de éxito en ${industry} con ${partners.join(', ')}: resultados medidos y fuente oficial de cada cifra.`.slice(0, 158),
    alternates: { canonical: absUrl(`/${industria}`) },
    openGraph: { images: [{ url: absUrl('/og/home.png'), width: 1200, height: 630 }] },
    // Hubs with one or two cases are thin: useful to visitors, not to the index.
    robots: list.length < MIN_CASES_TO_INDEX_INDUSTRY ? { index: false, follow: true } : undefined,
  };
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { industria } = await params;
  const { industry, list } = load(industria);
  const others = industriesWithCases().filter((i) => i !== industry);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      url: absUrl(`/${industria}`),
      name: `Casos de éxito en ${industry}`,
      inLanguage: 'es',
      publisher: { '@id': ORG_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: list.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(casePath(c)), name: c.title })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'QActions', item: 'https://qactions.com/' },
        { '@type': 'ListItem', position: 2, name: 'Casos de éxito', item: absUrl('/') },
        { '@type': 'ListItem', position: 3, name: industry },
      ],
    },
  ];
  return (
    <div className="space-y-12">
      <JsonLd data={jsonLd} />
      <nav aria-label="Ruta" className="text-sm text-beige/55">
        <Link href="/" className="hover:text-beige">
          Casos de éxito
        </Link>{' '}
        / <span className="text-beige/80">{industry}</span>
      </nav>
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">{list.length} casos</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Casos de éxito en <span className="text-title">{industry}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-beige/70">
          Resultados de QActions y sus partners en {industry.toLowerCase()}: testing, ciberseguridad, RPA + IA y gestión de
          datos de prueba. Cada cifra enlaza la fuente oficial.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <CaseCard key={c.id} item={c} />
        ))}
      </div>
      <QActionsBand />
      <section>
        <h2 className="mb-4 text-xl font-bold">Otras industrias</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((i) => (
            <Link key={i} href={`/${industrySlug(i)}`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-beige/75 hover:text-beige">
              {i}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
