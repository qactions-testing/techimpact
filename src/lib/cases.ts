import { CASE_STUDIES } from '@/data/cases';
import { VENDORS } from '@/data/vendors';
import { CaseStudy, Industry } from '@/types';

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const industrySlug = (i: Industry) => slugify(i);

/** URL slug of a case. Stable: derived from the id, never from editable copy. */
export const caseSlug = (c: CaseStudy) => c.id.replace(/^aa-/, 'automation-anywhere-');

/** Path inside the app (without basePath). */
export const casePath = (c: CaseStudy) => `/${industrySlug(c.industry)}/${caseSlug(c)}`;

export const getCaseBySlug = (slug: string) => CASE_STUDIES.find((c) => caseSlug(c) === slug);
export const getCaseById = (id: string) => CASE_STUDIES.find((c) => c.id === id);

export const INDUSTRY_ORDER: Industry[] = [
  'Banca', 'Fintech', 'Servicios Financieros', 'Crypto Exchange', 'Seguros', 'Telecomunicaciones',
  'Retail', 'E-commerce', 'SaaS', 'Tecnología', 'Salud', 'Life Sciences', 'Minería', 'Petróleo y Gas',
  'Energía', 'Sector Público', 'Educación', 'Automotriz', 'Agroindustria', 'Gaming',
];

export const industriesWithCases = () => INDUSTRY_ORDER.filter((i) => CASE_STUDIES.some((c) => c.industry === i));
export const industryFromSlug = (slug: string) => INDUSTRY_ORDER.find((i) => industrySlug(i) === slug);
export const casesByIndustry = (i: Industry) => CASE_STUDIES.filter((c) => c.industry === i);

/** Industry hubs with fewer cases are thin pages: kept for users, not indexed. */
export const MIN_CASES_TO_INDEX_INDUSTRY = 3;

export function relatedCases(item: CaseStudy, limit = 3) {
  return CASE_STUDIES.filter((c) => c.id !== item.id)
    .map((c) => ({ c, s: (c.industry === item.industry ? 2 : 0) + (c.category === item.category ? 1 : 0) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ c }) => c);
}

/** Who publishes the numbers, phrased for copy. */
export const publisherName = (c: CaseStudy) => VENDORS[c.vendor].name;
export const isOwnCase = (c: CaseStudy) => c.vendor === 'qactions';

export function caseTitleTag(c: CaseStudy) {
  const who = c.anonymized ? c.industry : c.client;
  return `${who}: ${c.heroKpi.value} ${c.heroKpi.label}`.slice(0, 70);
}

export function caseDescription(c: CaseStudy) {
  const source = isOwnCase(c) ? 'Caso de QActions' : `Caso publicado por ${publisherName(c)}`;
  const text = `${source}. ${c.summary}`;
  return text.length > 158 ? `${text.slice(0, 155).replace(/\s+\S*$/, '')}…` : text;
}

export { CASE_STUDIES };
