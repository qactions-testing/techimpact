import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Bookmark,
  Compass,
  LayoutGrid,
  Link2,
  MessageCircle,
  PlayCircle,
  Quote,
  RotateCcw,
  Search,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import CircuitBackground from './components/CircuitBackground';
import CaseDetail from './components/CaseDetail';
import { CATEGORY_ACCENT, CATEGORY_ICON, CaseCard, Chip, ChipScroller, SectionHeading, VendorLogo } from './components/ui';
import { CASE_STUDIES, QACTIONS_TESTIMONIALS } from './data/cases';
import { CATEGORIES, QACTIONS_LINKS, VENDORS, VENDOR_ORDER } from './data/vendors';
import { matchesQuery, recommend, Route, shareLink, topPicks, useHashRoute, usePersistentState } from './lib';
import { CaseStudy, Category, Industry, UserProfile, VendorId } from './types';

const INDUSTRY_ORDER: Industry[] = [
  'Banca',
  'Fintech',
  'Servicios Financieros',
  'Crypto Exchange',
  'Seguros',
  'Telecomunicaciones',
  'Retail',
  'E-commerce',
  'SaaS',
  'Tecnología',
  'Salud',
  'Life Sciences',
  'Minería',
  'Petróleo y Gas',
  'Energía',
  'Sector Público',
  'Educación',
  'Automotriz',
  'Agroindustria',
  'Gaming',
];

const COUNTRIES = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España',
  'EE.UU.', 'Guatemala', 'Honduras', 'México', 'Panamá', 'Paraguay', 'Perú', 'República Dominicana',
  'Uruguay', 'Venezuela', 'Otro',
];

const EMPTY_PROFILE: UserProfile = { name: '', company: '', country: '', industries: [], categories: [] };

const NAV: { view: Route['view']; label: string; icon: typeof Compass }[] = [
  { view: 'explorar', label: 'Explorar', icon: LayoutGrid },
  { view: 'descubrir', label: 'Para usted', icon: Compass },
  { view: 'guardados', label: 'Guardados', icon: Bookmark },
  { view: 'perfil', label: 'Perfil', icon: User },
];

interface Filters {
  query: string;
  industry: Industry | 'Todas';
  vendor: VendorId | 'all';
  category: Category | 'all';
}

const NO_FILTERS: Filters = { query: '', industry: 'Todas', vendor: 'all', category: 'all' };
const PAGE_SIZE = 12;

export default function App() {
  const { route, navigate } = useHashRoute();
  const [savedIds, setSavedIds] = usePersistentState<string[]>('techimpact_saved', []);
  const [profile, setProfile] = usePersistentState<UserProfile>('techimpact_profile', EMPTY_PROFILE);
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);

  const isSaved = (id: string) => savedIds.includes(id);
  const toggleSave = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const openCase = (id: string) => navigate(`caso/${id}`);

  const cardProps = (c: CaseStudy) => ({
    item: c,
    saved: isSaved(c.id),
    onToggleSave: () => toggleSave(c.id),
    onOpen: () => openCase(c.id),
  });

  const activeView = route.view === 'caso' ? 'explorar' : route.view;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CircuitBackground />

      <header className="no-print sticky top-0 z-40 border-b border-white/10 bg-ink-deep/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#/" className="flex items-center gap-3" aria-label="TechImpact, inicio">
            <VendorLogo id="qactions" size="sm" />
            <span className="text-lg font-bold tracking-tight">
              Tech<span className="text-title">Impact</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {NAV.map(({ view, label, icon: Icon }) => (
              <a
                key={view}
                href={`#/${view === 'explorar' ? '' : view}`}
                aria-current={activeView === view ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeView === view ? 'bg-white/10 text-beige' : 'text-beige/60 hover:text-beige'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {view === 'guardados' && savedIds.length > 0 && (
                  <span className="rounded-full bg-aqua px-1.5 text-[10px] font-bold text-ink">{savedIds.length}</span>
                )}
              </a>
            ))}
          </nav>
          <a
            href={QACTIONS_LINKS.meeting}
            target="_blank"
            rel="noopener noreferrer"
            className="chrome-button hidden items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold sm:flex"
          >
            <MessageCircle className="h-4 w-4" /> Hablemos
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pt-6 pb-32 sm:px-6 md:pb-16 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={route.view === 'caso' ? `caso-${route.id}` : route.view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {route.view === 'explorar' && (
              <ExploreView filters={filters} setFilters={setFilters} cardProps={cardProps} onOpen={openCase} />
            )}
            {route.view === 'caso' && (
              <CaseRoute id={route.id} isSaved={isSaved} toggleSave={toggleSave} onOpen={openCase} />
            )}
            {route.view === 'descubrir' && (
              <DiscoverView profile={profile} cardProps={cardProps} onEditProfile={() => navigate('perfil')} />
            )}
            {route.view === 'guardados' && (
              <SavedView
                savedIds={savedIds}
                sharedIds={route.ids}
                onSaveAll={(ids) => setSavedIds((prev) => Array.from(new Set([...prev, ...ids])))}
                cardProps={cardProps}
              />
            )}
            {route.view === 'perfil' && (
              <ProfileView profile={profile} setProfile={setProfile} savedCount={savedIds.length} onDone={() => navigate('descubrir')} />
            )}
          </motion.div>
        </AnimatePresence>

        <Footer />
      </main>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="Principal"
        className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-deep/85 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur-xl md:hidden"
      >
        <div className="grid grid-cols-4">
          {NAV.map(({ view, label, icon: Icon }) => (
            <a
              key={view}
              href={`#/${view === 'explorar' ? '' : view}`}
              aria-current={activeView === view ? 'page' : undefined}
              className={`relative flex flex-col items-center gap-1 pt-3 text-[10px] font-semibold tracking-wide uppercase ${
                activeView === view ? 'text-aqua' : 'text-beige/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
              {view === 'guardados' && savedIds.length > 0 && (
                <span className="absolute top-2 left-1/2 ml-2 rounded-full bg-aqua px-1.5 text-[9px] font-bold text-ink">
                  {savedIds.length}
                </span>
              )}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

type CardProps = (c: CaseStudy) => {
  item: CaseStudy;
  saved: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
};

// ── Explorar ─────────────────────────────────────────────────────────────
function ExploreView({
  filters,
  setFilters,
  cardProps,
  onOpen,
}: {
  filters: Filters;
  setFilters: (f: Filters | ((f: Filters) => Filters)) => void;
  cardProps: CardProps;
  onOpen: (id: string) => void;
}) {
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
    <div className="space-y-14">
      <Hero onOpen={onOpen} />

      {/* Disciplines */}
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

      {/* Search & filters */}
      <section id="resultados" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Biblioteca"
          title="Casos de éxito"
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
                <CaseCard key={c.id} {...cardProps(c)} />
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

      <PartnerGrid
        activeVendor={filters.vendor}
        onSelect={(v) => {
          setFilters({ ...NO_FILTERS, vendor: v });
          jumpToResults();
        }}
      />

      <Testimonials />
      <QActionsBand />
    </div>
  );
}

function Hero({ onOpen }: { onOpen: (id: string) => void }) {
  const featured = useMemo(() => CASE_STUDIES.filter((c) => c.featured), []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = featured[index % featured.length];

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % featured.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, featured.length]);

  const industries = new Set(CASE_STUDIES.map((c) => c.industry)).size;

  return (
    <section className="grid items-center gap-8 pt-4 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-10">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span className="h-2 w-2 rounded-full bg-aqua text-aqua glow-dot" /> Casos verificados con fuente oficial
        </p>
        <h1 className="mt-5 text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl lg:text-6xl">
          Impacto tecnológico real, <span className="text-title">medido en resultados.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-beige/70">
          Testing, ciberseguridad, RPA + IA y gestión de datos en banca, telecomunicaciones, retail, energía, salud y más.
          Filtre por su industria y descubra qué lograron empresas como la suya.
        </p>
        <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4">
          {[
            { v: CASE_STUDIES.length, l: 'casos de éxito' },
            { v: industries, l: 'industrias' },
            { v: VENDOR_ORDER.length, l: 'partners' },
          ].map((s) => (
            <div key={s.l}>
              <dt className="sr-only">{s.l}</dt>
              <dd className="text-kpi text-4xl font-black sm:text-5xl">{s.v}</dd>
              <dd className="text-xs text-beige/55 sm:text-sm">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-brand/50 via-violet/20 to-aqua/20 blur-3xl" />
        <AnimatePresence mode="wait">
          <motion.button
            key={current.id}
            type="button"
            onClick={() => onOpen(current.id)}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="chrome-card-strong shine relative block w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-brand/60 to-transparent p-7 text-left sm:p-10"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
                Caso destacado
              </span>
              <div className="flex items-center gap-2">
                <VendorLogo id={current.vendor} size="sm" />
                {current.technology && <VendorLogo id={current.technology} size="sm" />}
              </div>
            </div>
            <p className="text-kpi mt-8 text-7xl leading-[0.9] font-black tracking-tighter sm:text-8xl">
              {current.heroKpi.value}
            </p>
            <p className="mt-3 text-lg font-semibold sm:text-xl">{current.heroKpi.label}</p>
            <p className="text-title mt-6 text-2xl font-bold">{current.title}</p>
            <p className="mt-1 text-sm text-beige/60">
              {current.client} · {current.industry}
            </p>
            <span className="chrome-button mt-8 inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold">
              Ver caso completo <ArrowRight className="h-4 w-4" />
            </span>
          </motion.button>
        </AnimatePresence>
        <div className="relative mt-4 flex justify-center gap-2" role="tablist" aria-label="Casos destacados">
          {featured.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === index % featured.length}
              aria-label={`${c.client}: ${c.heroKpi.value}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index % featured.length ? 'w-8 bg-sky' : 'w-3 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerGrid({ activeVendor, onSelect }: { activeVendor: VendorId | 'all'; onSelect: (v: VendorId) => void }) {
  return (
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
              onClick={() => onSelect(v)}
              aria-pressed={activeVendor === v}
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
  );
}

function Testimonials() {
  return (
    <section>
      <SectionHeading eyebrow="Clientes de QActions" title="Lo que dicen" />
      <div className="grid gap-4 md:grid-cols-3">
        {QACTIONS_TESTIMONIALS.map((t) => (
          <figure key={t.author} className="chrome-card rounded-3xl p-6">
            <Quote className="h-6 w-6 text-sky" />
            <blockquote className="mt-3 text-lg leading-relaxed font-medium">“{t.text}”</blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold">{t.author}</span>
              <span className="block text-beige/55">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-xs text-beige/40">
        Fuente:{' '}
        <a href="https://qactions.com/clientes/" target="_blank" rel="noopener noreferrer" className="underline">
          qactions.com/clientes
        </a>
      </p>
    </section>
  );
}

function QActionsBand() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-[#22307a] to-ink p-6 sm:p-10">
      <div className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-violet/30 blur-[90px]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <VendorLogo id="qactions" size="lg" />
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            +500 proyectos de QA, testing, seguridad y RPA + IA.
          </h2>
          <p className="mt-3 max-w-xl text-beige/75">
            QActions implementa Tricentis, Veracode, hCaptcha, Automation Anywhere y Synthesized en banca, seguros, retail,
            telecomunicaciones, minería, petróleo y gas, salud y sector público.
          </p>
        </div>
        <div className="grid gap-3">
          <a href={QACTIONS_LINKS.demo} target="_blank" rel="noopener noreferrer" className="chrome-button flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold">
            <PlayCircle className="h-5 w-5" /> Solicitar una demo
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a href={QACTIONS_LINKS.contact} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-beige/30 px-4 py-3 text-center font-semibold hover:bg-white/10">
              Contacto
            </a>
            <a href={QACTIONS_LINKS.blog} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-beige/30 px-4 py-3 text-center font-semibold hover:bg-white/10">
              Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Caso ─────────────────────────────────────────────────────────────────
function CaseRoute({
  id,
  isSaved,
  toggleSave,
  onOpen,
}: {
  id: string;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  const item = CASE_STUDIES.find((c) => c.id === id);
  if (!item) {
    return (
      <div className="chrome-card rounded-3xl p-10 text-center">
        <p className="text-lg font-semibold">No encontramos ese caso.</p>
        <a href="#/" className="chrome-button mt-5 inline-block rounded-full px-5 py-2.5 font-semibold">
          Ver todos los casos
        </a>
      </div>
    );
  }
  const related = CASE_STUDIES.filter((c) => c.id !== item.id)
    .map((c) => ({ c, s: (c.industry === item.industry ? 2 : 0) + (c.category === item.category ? 1 : 0) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map(({ c }) => c);

  return (
    <CaseDetail
      item={item}
      related={related}
      isSaved={isSaved}
      onToggleSave={toggleSave}
      onOpen={onOpen}
      onBack={() => (window.history.length > 1 ? window.history.back() : (window.location.hash = '#/'))}
    />
  );
}

// ── Para usted ───────────────────────────────────────────────────────────
function DiscoverView({
  profile,
  cardProps,
  onEditProfile,
}: {
  profile: UserProfile;
  cardProps: CardProps;
  onEditProfile: () => void;
}) {
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
              {profile.name ? `Hola, ${profile.name.split(' ')[0]}` : 'Recomendados para usted'}
            </h1>
            <p className="mt-1 text-beige/65">
              {hasPrefs
                ? `Según su perfil: ${[...profile.industries, ...profile.categories, profile.country].filter(Boolean).join(' · ')}`
                : 'Complete su perfil (industria, disciplina y país) para ver casos a su medida.'}
            </p>
          </div>
        </div>
        <button type="button" onClick={onEditProfile} className="chrome-button flex-none rounded-full px-5 py-2.5 font-semibold">
          {hasPrefs ? 'Editar perfil' : 'Completar perfil'}
        </button>
      </div>

      {recs.length > 0 ? (
        <section>
          <SectionHeading eyebrow={`${recs.length} coincidencias`} title="Casos alineados a su perfil" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recs.map((r) => (
              <CaseCard key={r.item.id} {...cardProps(r.item)} reasons={r.reasons} />
            ))}
          </div>
        </section>
      ) : (
        <section>
          <SectionHeading
            eyebrow={hasPrefs ? 'Sin coincidencias exactas' : 'Selección del día'}
            title="Top 5 casos de alto impacto"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {picks.map((c) => (
              <CaseCard key={c.id} {...cardProps(c)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Guardados ────────────────────────────────────────────────────────────
function SavedView({
  savedIds,
  sharedIds,
  onSaveAll,
  cardProps,
}: {
  savedIds: string[];
  sharedIds?: string[];
  onSaveAll: (ids: string[]) => void;
  cardProps: CardProps;
}) {
  const [notice, setNotice] = useState<string | null>(null);
  const showingShared = !!sharedIds?.length;
  const ids = showingShared ? sharedIds! : savedIds;
  const items = ids.map((id) => CASE_STUDIES.find((c) => c.id === id)).filter((c): c is CaseStudy => !!c);

  const shareSelection = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/guardados?ids=${savedIds.join(',')}`;
    const result = await shareLink('Mi selección de casos de éxito · TechImpact', url);
    setNotice(result === 'copied' ? 'Enlace copiado: compártalo con su equipo.' : result === 'failed' ? 'No se pudo compartir.' : null);
    window.setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">
            {showingShared ? 'Selección compartida' : 'Su biblioteca'}
          </p>
          <h1 className="text-3xl font-bold tracking-tight">{showingShared ? 'Casos que le compartieron' : 'Casos guardados'}</h1>
        </div>
        {showingShared ? (
          <button type="button" onClick={() => onSaveAll(items.map((c) => c.id))} className="chrome-button rounded-full px-5 py-2.5 font-semibold">
            Guardar todos
          </button>
        ) : (
          savedIds.length > 0 && (
            <button type="button" onClick={shareSelection} className="chrome-button flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold">
              <Link2 className="h-4 w-4" /> Compartir selección
            </button>
          )
        )}
      </div>
      {notice && <p className="text-sm text-aqua">{notice}</p>}

      {items.length === 0 ? (
        <div className="chrome-card rounded-3xl p-10 text-center">
          <Bookmark className="mx-auto h-10 w-10 text-beige/30" />
          <p className="mt-4 text-lg font-semibold">Todavía no guardó casos.</p>
          <p className="mt-1 text-beige/60">Toque el marcador de cualquier caso para tenerlo a mano y compartirlo.</p>
          <a href="#/" className="chrome-button mt-5 inline-block rounded-full px-5 py-2.5 font-semibold">
            Explorar casos
          </a>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((c) => (
            <CaseCard key={c.id} {...cardProps(c)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Perfil ───────────────────────────────────────────────────────────────
function ProfileView({
  profile,
  setProfile,
  savedCount,
  onDone,
}: {
  profile: UserProfile;
  setProfile: (p: UserProfile | ((p: UserProfile) => UserProfile)) => void;
  savedCount: number;
  onDone: () => void;
}) {
  const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  const field = 'w-full rounded-2xl border border-white/10 bg-ink-deep/60 px-4 py-3 text-beige placeholder:text-beige/35 focus:border-sky focus:outline-none';
  const availableIndustries = INDUSTRY_ORDER.filter((i) => CASE_STUDIES.some((c) => c.industry === i));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">Perfil</p>
        <h1 className="text-3xl font-bold tracking-tight">Personalice sus recomendaciones</h1>
        <p className="mt-2 text-beige/60">
          Se guarda solo en este navegador. Usamos su industria, disciplina de interés y país para priorizar casos.
        </p>
      </div>

      <div className="chrome-card grid gap-4 rounded-3xl p-6 sm:grid-cols-3">
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-beige/70">Nombre</span>
          <input className={field} value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} placeholder="Su nombre" autoComplete="name" />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-beige/70">Empresa</span>
          <input className={field} value={profile.company} onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))} placeholder="Empresa" autoComplete="organization" />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-medium text-beige/70">País</span>
          <select className={field} value={profile.country} onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}>
            <option value="">Seleccione…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="chrome-card rounded-3xl p-6">
        <h2 className="mb-3 font-semibold">Industrias de interés</h2>
        <div className="flex flex-wrap gap-2">
          {availableIndustries.map((i) => (
            <Chip key={i} active={profile.industries.includes(i)} onClick={() => setProfile((p) => ({ ...p, industries: toggle(p.industries, i) }))}>
              {i}
            </Chip>
          ))}
        </div>
      </div>

      <div className="chrome-card rounded-3xl p-6">
        <h2 className="mb-3 font-semibold">Disciplinas de interés</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICON[c];
            return (
              <Chip key={c} active={profile.categories.includes(c)} onClick={() => setProfile((p) => ({ ...p, categories: toggle(p.categories, c) }))}>
                <Icon className="h-4 w-4" /> {c}
              </Chip>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a href="#/guardados" className="text-sm text-beige/60 hover:text-beige">
          {savedCount} casos guardados →
        </a>
        <div className="flex gap-3">
          <button type="button" onClick={() => setProfile(EMPTY_PROFILE)} className="rounded-full border border-white/15 px-5 py-2.5 font-semibold hover:bg-white/5">
            Restablecer
          </button>
          <button type="button" onClick={onDone} className="chrome-button flex items-center gap-2 rounded-full px-6 py-2.5 font-semibold">
            Ver recomendaciones <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-beige/45">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} TechImpact by{' '}
          <a href="https://qactions.com" target="_blank" rel="noopener noreferrer" className="text-beige/70 hover:text-beige">
            QActions
          </a>
        </p>
        <p className="max-w-xl sm:text-right">
          Cifras tomadas de las publicaciones oficiales de cada fabricante; cada caso enlaza su fuente. Los nombres
          reservados respetan la confidencialidad indicada en la fuente.
        </p>
      </div>
    </footer>
  );
}
