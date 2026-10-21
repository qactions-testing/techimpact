'use client';

import { useEffect, useMemo, useState } from 'react';
import { RotateCcw, Search, X } from 'lucide-react';
import { CASE_STUDIES } from '@/data/cases';
import { CATEGORIES, VENDORS, VENDOR_ORDER } from '@/data/vendors';
import { INDUSTRY_ORDER } from '@/lib/cases';
import { matchesQuery } from '@/lib/client';
import { Category, Industry, VendorId } from '@/types';
import { CATEGORY_ACCENT, CATEGORY_ICON, CaseCard, Chip, ChipScroller, SectionHeading, VendorLogo } from './ui';

interface Filters {
  query: string;
  industry: Industry | 'Todas';
  vendor: VendorId | 'all';
  category: Category | 'all';
}

const NO_FILTERS: Filters = { query: '', industry: 'Todas', vendor: 'all', category: 'all' };
const PAGE_SIZE = 12;

export default function Explorer({ initialIndustry }: { initialIndustry?: Industry }) {
  const [filters, setFilters] = useState<Filters>({ ...NO_FILTERS, industry: initialIndustry ?? 'Todas' });
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((f) => ({ ...f, [key]: value }));

  const results = useMemo(
    () =>
      CASE_STUDIES.filter(
        (c) =>
          (filters.industry === 'Todas' || c.industry === filters.industry) &&
          (filters.vendor === 'all' || c.vendor === filters.vendor || c.technology === filters.vendor) &&
          (filters.category === 'all' || c.category === filters.category) &&
          matchesQuery(c, filters.query, VENDORS[c.vendor].name),
      ),
    [filters],
  );

  const industryCounts = useMemo(() => {
    const counts = new Map<Industry, number>();
    CASE_STUDIES.forEach((c) => counts.set(c.industry, (counts.get(c.industry) ?? 0) + 1));
    return counts;
  }, []);

  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => setVisible(PAGE_SIZE), [filters]);

  const hasFilters =
    filters.query !== '' || filters.industry !== 'Todas' || filters.vendor !== 'all' || filters.category !== 'all';
  const jumpToResults = () => document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <section>
        <SectionHeading eyebrow="Disciplinas" title="¿Qué quiere transformar?" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICON[cat];
            const count = CASE_STUDIES.filter((c) => c.category === cat).length;
            const active = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  set('category', active ? 'all' : cat);
                  jumpToResults();
                }}
                className={`chrome-card shine rounded-3xl p-4 text-left transition-transform hover:-translate-y-1 sm:p-6 ${
                  active ? 'ring-2 ring-sky' : ''
                }`}
              >
                <Icon className={`h-7 w-7 ${CATEGORY_ACCENT[cat]}`} />
                <p className="mt-4 text-base font-bold sm:text-lg">{cat}</p>
                <p className="text-sm text-beige/55">{count} casos</p>
              </button>
            );
          })}
        </div>
      </section>

      <section id="resultados" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Biblioteca"
          title="Todos los casos"
          action={
            hasFilters ? (
              <button
                type="button"
                onClick={() => setFilters(NO_FILTERS)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-sky hover:bg-white/5"
              >
                <RotateCcw className="h-4 w-4" /> Limpiar
              </button>
            ) : undefined
          }
        />

        <div className="chrome-card space-y-5 rounded-3xl p-4 sm:p-6">
          <label className="relative block">
            <span className="sr-only">Buscar casos</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-beige/40" />
            <input
              type="search"
              value={filters.query}
              onChange={(e) => set('query', e.target.value)}
              placeholder="Buscar por cliente, industria, producto, país…"
              className="w-full rounded-2xl border border-white/10 bg-ink-deep/60 py-3.5 pr-10 pl-12 text-beige placeholder:text-beige/35 focus:border-sky focus:outline-none"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => set('query', '')}
                aria-label="Borrar búsqueda"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-beige/50 hover:text-beige"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-beige/50">Industria</p>
            <ChipScroller label="Filtrar por industria">
              <Chip active={filters.industry === 'Todas'} onClick={() => set('industry', 'Todas')} count={CASE_STUDIES.length}>
                Todas
              </Chip>
              {INDUSTRY_ORDER.filter((i) => industryCounts.has(i)).map((i) => (
                <Chip key={i} active={filters.industry === i} onClick={() => set('industry', i)} count={industryCounts.get(i)}>
                  {i}
                </Chip>
              ))}
            </ChipScroller>
          </div>

          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-beige/50">Partner tecnológico</p>
            <ChipScroller label="Filtrar por partner">
              <Chip active={filters.vendor === 'all'} onClick={() => set('vendor', 'all')}>
                Todos
              </Chip>
              {VENDOR_ORDER.map((v) => (
                <Chip key={v} active={filters.vendor === v} onClick={() => set('vendor', v)}>
                  {VENDORS[v].name}
                </Chip>
              ))}
            </ChipScroller>
          </div>
        </div>

        <p className="mt-6 mb-4 text-sm text-beige/60" aria-live="polite">
          {results.length} {results.length === 1 ? 'caso' : 'casos'}
          {filters.category !== 'all' && ` · ${filters.category}`}
        </p>

        {results.length === 0 ? (
          <div className="chrome-card rounded-3xl p-10 text-center">
            <p className="text-lg font-semibold">No hay casos con esos filtros.</p>
            <p className="mt-1 text-beige/60">Pruebe con otra industria o borre la búsqueda.</p>
            <button type="button" onClick={() => setFilters(NO_FILTERS)} className="chrome-button mt-5 rounded-full px-5 py-2.5 font-semibold">
              Ver todos los casos
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.slice(0, visible).map((c) => (
                <CaseCard key={c.id} item={c} />
              ))}
            </div>
            {results.length > visible && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="chrome-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
                >
                  Ver más casos <span className="text-ink/60">({results.length - visible})</span>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section>
        <SectionHeading eyebrow="Ecosistema" title="Partners tecnológicos" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {VENDOR_ORDER.map((v) => {
            const vendor = VENDORS[v];
            const count = CASE_STUDIES.filter((c) => c.vendor === v || c.technology === v).length;
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setFilters({ ...NO_FILTERS, vendor: v });
                  jumpToResults();
                }}
                aria-pressed={filters.vendor === v}
                className="chrome-card shine flex items-center gap-4 rounded-3xl p-4 text-left transition-transform hover:-translate-y-1 sm:p-5"
              >
                <VendorLogo id={v} size="lg" className="w-40 flex-none" />
                <div className="min-w-0">
                  <p className="text-sm leading-snug text-beige/75">{vendor.tagline}</p>
                  <p className="mt-1 text-xs font-semibold text-sky">{count} casos →</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
