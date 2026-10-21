/**
 * Open Graph images (1200x630) for the home and every case, rendered at build
 * time into public/og/. Workers have no filesystem, so these cannot be
 * generated on request.
 */
import fs from 'node:fs';
import path from 'node:path';
import { CASE_STUDIES } from '../src/data/cases';
import { caseSlug, publisherName } from '../src/lib/cases';
import { brandCard } from '../src/lib/og';

async function write(file: string, res: Response) {
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  const out = path.join(process.cwd(), 'public/og');
  fs.mkdirSync(out, { recursive: true });
  await write(
    path.join(out, 'home.png'),
    await brandCard({
      eyebrow: 'TechImpact',
      title: 'QA, testing, ciberseguridad y RPA + IA, medidos en resultados.',
      footer: `${CASE_STUDIES.length} casos con fuente oficial · qactions.com/techimpact`,
    }),
  );
  for (const item of CASE_STUDIES) {
    await write(
      path.join(out, `${caseSlug(item)}.png`),
      await brandCard({
        eyebrow: `${item.industry} · ${item.category}`,
        kpi: item.heroKpi.value,
        kpiLabel: item.heroKpi.label,
        title: `${item.client}: ${item.title}`,
        footer:
          item.vendor === 'qactions'
            ? 'Caso de QActions · qactions.com/techimpact'
            : `Caso publicado por ${publisherName(item)} · qactions.com/techimpact`,
      }),
    );
  }
  console.log(`OG: ${CASE_STUDIES.length + 1} → public/og`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
