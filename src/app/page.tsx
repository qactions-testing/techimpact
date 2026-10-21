import type { Metadata } from 'next';
import Explorer from '@/components/Explorer';
import Hero from '@/components/Hero';
import JsonLd from '@/components/JsonLd';
import { IndustryIndex, QActionsBand, Testimonials } from '@/components/sections';
import { VENDOR_ORDER } from '@/data/vendors';
import { CASE_STUDIES, casePath } from '@/lib/cases';
import { absUrl, ORG_ID } from '@/lib/site';

export const metadata: Metadata = {
  // Keeps the title the WordPress page already ranks with.
  title: { absolute: 'Casos de éxito en QA, testing, ciberseguridad y RPA + IA | QActions' },
  alternates: { canonical: absUrl('/') },
  openGraph: { url: absUrl('/'), title: 'Casos de éxito de QActions y sus partners' },
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
    name: 'Casos de éxito en QA, testing, ciberseguridad y RPA + IA',
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
