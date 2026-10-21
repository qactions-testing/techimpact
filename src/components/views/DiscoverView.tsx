'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { CASE_STUDIES } from '@/data/cases';
import { recommend, topPicks, useMounted, useProfile } from '@/lib/client';
import { CaseCard, SectionHeading } from '../ui';

export default function DiscoverView() {
  const [profile] = useProfile();
  const mounted = useMounted();
  const recs = useMemo(() => recommend(CASE_STUDIES, profile), [profile]);
  const picks = useMemo(() => topPicks(CASE_STUDIES), []);
  const hasPrefs = profile.industries.length > 0 || profile.categories.length > 0 || profile.country !== '';

  return (
    <div className="space-y-8">
      <div className="chrome-card-strong flex flex-col gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="rounded-2xl bg-gradient-to-br from-sky to-violet p-3 text-ink">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              {mounted && profile.name ? `Hola, ${profile.name.split(' ')[0]}` : 'Recomendados para usted'}
            </h1>
            <p className="mt-1 text-beige/65">
              {mounted && hasPrefs
                ? `Según su perfil: ${[...profile.industries, ...profile.categories, profile.country].filter(Boolean).join(' · ')}`
                : 'Complete su perfil (industria, disciplina y país) para ver casos a su medida.'}
            </p>
          </div>
        </div>
        <Link href="/perfil" className="chrome-button flex-none rounded-full px-5 py-2.5 text-center font-semibold">
          {mounted && hasPrefs ? 'Editar perfil' : 'Completar perfil'}
        </Link>
      </div>

      {mounted && recs.length > 0 ? (
        <section>
          <SectionHeading eyebrow={`${recs.length} coincidencias`} title="Casos alineados a su perfil" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recs.map((r) => (
              <CaseCard key={r.item.id} item={r.item} reasons={r.reasons} />
            ))}
          </div>
        </section>
      ) : (
        <section>
          <SectionHeading eyebrow={mounted && hasPrefs ? 'Sin coincidencias exactas' : 'Selección del día'} title="Top 5 casos de alto impacto" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {picks.map((c) => (
              <CaseCard key={c.id} item={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
