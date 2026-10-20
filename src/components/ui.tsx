import React, { useEffect, useRef, useState } from 'react';
import { Bookmark, Bot, Bug, ChevronLeft, ChevronRight, Database, MapPin, ShieldCheck } from 'lucide-react';
import { VENDORS } from '../data/vendors';
import { CaseStudy, Category, VendorId } from '../types';

export const CATEGORY_ICON: Record<Category, React.ComponentType<{ className?: string }>> = {
  'Software Testing': Bug,
  Ciberseguridad: ShieldCheck,
  'RPA + IA': Bot,
  'Data Management': Database,
};

export const CATEGORY_ACCENT: Record<Category, string> = {
  'Software Testing': 'text-sky',
  Ciberseguridad: 'text-violet',
  'RPA + IA': 'text-aqua',
  'Data Management': 'text-beige',
};

/** Logo on a chrome plate whose tone matches the artwork (light logos on blue). */
export function VendorLogo({ id, size = 'md', className = '' }: { id: VendorId; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const vendor = VENDORS[id];
  const [failed, setFailed] = useState(false);
  const box = { sm: 'h-8 px-2.5', md: 'h-10 px-3', lg: 'h-14 px-4' }[size];
  const img = vendor.logoTall
    ? { sm: 'h-6 max-w-[92px]', md: 'h-8 max-w-[120px]', lg: 'h-11 max-w-[170px]' }[size]
    : { sm: 'h-4 max-w-[92px]', md: 'h-5 max-w-[120px]', lg: 'h-7 max-w-[170px]' }[size];
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl ${box} ${
        vendor.logoIsLight ? 'logo-plate-dark' : 'logo-plate-light'
      } ${className}`}
      title={vendor.name}
    >
      {failed ? (
        <span className={`text-xs font-bold ${vendor.logoIsLight ? 'text-beige' : 'text-ink'}`}>{vendor.name}</span>
      ) : (
        <img
          src={vendor.logo}
          alt={vendor.name}
          className={`${img} w-auto object-contain`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

export function SaveButton({ saved, onToggle, className = '' }: { saved: boolean; onToggle: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={saved}
      aria-label={saved ? 'Quitar de guardados' : 'Guardar caso'}
      className={`rounded-full p-2.5 transition-colors hover:bg-white/10 ${className}`}
    >
      <Bookmark className={`h-5 w-5 ${saved ? 'fill-aqua text-aqua' : 'text-beige/60'}`} />
    </button>
  );
}

export function CaseCard({
  item,
  saved,
  onToggleSave,
  onOpen,
  reasons,
}: {
  item: CaseStudy;
  saved: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
  reasons?: string[];
}) {
  const Icon = CATEGORY_ICON[item.category];
  return (
    <article
      role="link"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
      className="chrome-card shine group flex h-full cursor-pointer flex-col rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-sky sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <VendorLogo id={item.vendor} size="sm" />
          {item.technology && (
            <>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-beige/40">con</span>
              <VendorLogo id={item.technology} size="sm" />
            </>
          )}
        </div>
        <SaveButton saved={saved} onToggle={onToggleSave} className="-mr-2 -mt-2" />
      </div>

      <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
        <Icon className={`h-4 w-4 ${CATEGORY_ACCENT[item.category]}`} />
        <span className="text-beige/60">{item.category}</span>
        <span className="text-beige/25">•</span>
        <span className="text-beige/60">{item.industry}</span>
      </div>

      <p className="text-kpi mt-2 text-5xl leading-none font-black tracking-tight sm:text-6xl">{item.heroKpi.value}</p>
      <p className="mt-2 text-sm font-medium text-beige/80">{item.heroKpi.label}</p>

      <h3 className="text-title mt-5 text-xl leading-snug font-bold">{item.title}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-beige/55">
        {item.client}
        {item.country && (
          <>
            <MapPin className="ml-1 h-3.5 w-3.5" /> {item.country}
          </>
        )}
      </p>

      {item.kpis.length > 0 && (
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-white/10 pt-4 mt-5">
          {item.kpis.slice(0, 2).map((k) => (
            <div key={k.label}>
              <p className="text-lg font-bold text-aqua">{k.value}</p>
              <p className="text-[11px] leading-tight text-beige/50">{k.label}</p>
            </div>
          ))}
        </div>
      )}

      {reasons && reasons.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {reasons.map((r) => (
            <span key={r} className="rounded-full bg-sky/10 px-2.5 py-1 text-[10px] font-semibold text-sky">
              {r}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

/** Horizontal chip row: native touch scroll, mouse drag, and arrow buttons. */
export function ChipScroller({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, scroll: 0 });
  const [edges, setEdges] = useState({ left: false, right: false });

  const updateEdges = () => {
    const el = ref.current;
    if (!el) return;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [children]);

  const scrollBy = (dir: number) => ref.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });

  return (
    <div className="relative">
      {edges.left && (
        <button
          type="button"
          aria-label="Desplazar a la izquierda"
          onClick={() => scrollBy(-1)}
          className="chrome-card-strong absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-full p-2 sm:block"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      <div
        ref={ref}
        role="group"
        aria-label={label}
        onScroll={updateEdges}
        onMouseDown={(e) => {
          if (!ref.current) return;
          drag.current = { active: true, moved: false, startX: e.pageX, scroll: ref.current.scrollLeft };
        }}
        onMouseMove={(e) => {
          if (!drag.current.active || !ref.current) return;
          const dx = e.pageX - drag.current.startX;
          if (Math.abs(dx) > 4) drag.current.moved = true;
          ref.current.scrollLeft = drag.current.scroll - dx;
        }}
        onMouseUp={() => (drag.current.active = false)}
        onMouseLeave={() => (drag.current.active = false)}
        onClickCapture={(e) => {
          // A drag should not also select the chip under the cursor.
          if (drag.current.moved) {
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="no-scrollbar flex cursor-grab gap-2 overflow-x-auto py-1 select-none active:cursor-grabbing sm:px-10"
      >
        {children}
      </div>
      {edges.right && (
        <button
          type="button"
          aria-label="Desplazar a la derecha"
          onClick={() => scrollBy(1)}
          className="chrome-card-strong absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full p-2 sm:block"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-none items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? 'chrome-button border-transparent'
          : 'border-white/10 bg-white/5 text-beige/70 hover:border-white/25 hover:text-beige'
      }`}
    >
      {children}
      {count !== undefined && (
        <span className={`text-xs ${active ? 'text-ink/60' : 'text-beige/40'}`}>{count}</span>
      )}
    </button>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
