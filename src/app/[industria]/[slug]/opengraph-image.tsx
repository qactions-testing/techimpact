import { CASE_STUDIES, caseSlug, getCaseBySlug, industrySlug, publisherName } from '@/lib/cases';
import { brandCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Caso de éxito de QActions';
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ industria: industrySlug(c.industry), slug: caseSlug(c) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = getCaseBySlug((await params).slug)!;
  return brandCard({
    eyebrow: `${item.industry} · ${item.category}`,
    kpi: item.heroKpi.value,
    kpiLabel: item.heroKpi.label,
    title: `${item.client}: ${item.title}`,
    footer: item.vendor === 'qactions' ? 'Caso de QActions · qactions.com/casos-de-exito' : `Caso publicado por ${publisherName(item)} · qactions.com/casos-de-exito`,
  });
}
