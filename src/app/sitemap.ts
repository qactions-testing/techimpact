import type { MetadataRoute } from 'next';
import {
  CASE_STUDIES,
  casePath,
  casesByIndustry,
  industriesWithCases,
  industrySlug,
  MIN_CASES_TO_INDEX_INDUSTRY,
} from '@/lib/cases';
import { absUrl, CONTENT_REVIEWED_AT } from '@/lib/site';

// Published at https://qactions.com/casos-de-exito/sitemap.xml. Reference it
// from the WordPress robots.txt (robots.txt only works at the host root).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_REVIEWED_AT);
  return [
    { url: absUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    ...industriesWithCases()
      .filter((i) => casesByIndustry(i).length >= MIN_CASES_TO_INDEX_INDUSTRY)
      .map((i) => ({ url: absUrl(`/${industrySlug(i)}`), lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...CASE_STUDIES.map((c) => ({ url: absUrl(casePath(c)), lastModified, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
