import type { Metadata } from 'next';
import Explorer from '@/components/Explorer';
import Hero from '@/components/Hero';
import JsonLd from '@/components/JsonLd';
import { IndustryIndex, QActionsBand, Testimonials } from '@/components/sections';
import { VENDOR_ORDER } from '@/data/vendors';
import { CASE_STUDIES, casePath } from '@/lib/cases';
import { absUrl, ORG_ID } from '@/lib/site';

export const metadata: Metadata = {
  // Distinct from the WordPress /casos-de-exito page (QActions' own cases) so
  // both URLs do not compete for the same query.
  title: { absolute: 'TechImpact: biblioteca de casos de testing, ciberseguridad y RPA + IA por industria | QActions' },
  description:
    '47 casos de QActions, Tricentis, Veracode, hCaptcha, Automation Anywhere y Synthesized en banca, seguros, telco, retail, energía, salud y sector público. Filtre por industria; cada cifra enlaza su fuente.',
  alternates: { canonical: absUrl('/') },
  openGraph: {
    url: absUrl('/'),
    title: 'TechImpact: casos de QActions y sus partners por industria',
    images: [{ url: absUrl('/og/home.png'), width: 1200, height: 630 }],
  },
};

export default function Home() {
  const featured = CASE_STUDIES.filter((c) => c.featured);
  const stats = [
    { v: CASE_STUDIES.length, l: 'casos de éxito' },
    { v: new Set(CASE_STUDIES.map((c) => c.industry)).size, l: 'industrias' },
    { v: VENDOR_ORDER.length - 1, l: 'partners' },
  ];
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absUrl('/')}#page`,
    url: absUrl('/'),
    name: 'TechImpact: biblioteca de casos de testing, ciberseguridad y RPA + IA',
    inLanguage: 'es',
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: CASE_STUDIES.length,
      itemListElement: CASE_STUDIES.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(casePath(c)), name: c.title })),
    },
  };
  return (
    <div className="space-y-14">
      <JsonLd data={collection} />
      <Hero featured={featured} stats={stats} />
      <Explorer />
      <IndustryIndex />
      <Testimonials />
      <QActionsBand />
    </div>
  );
}
