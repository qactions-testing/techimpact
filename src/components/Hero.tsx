'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { casePath } from '@/lib/cases';
import { CaseStudy } from '@/types';
import { VendorLogo } from './ui';

export default function Hero({
  featured,
  stats,
}: {
  featured: CaseStudy[];
  stats: { v: number; l: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = featured[index % featured.length];

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % featured.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, featured.length]);

  return (
    <section className="grid items-center gap-8 pt-4 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-10">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span className="glow-dot h-2 w-2 rounded-full bg-aqua text-aqua" /> Cada cifra enlaza su fuente oficial
        </p>
        <h1 className="mt-5 text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl lg:text-6xl">
          Casos de éxito en QA, testing, ciberseguridad y RPA + IA,{' '}
          <span className="text-title">medidos en resultados.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-beige/70">
          Lo que lograron bancos, aseguradoras, telcos, retailers, energéticas y organismos públicos con QActions y con
          Tricentis, Veracode, hCaptcha, Automation Anywhere y Synthesized. Filtre por su industria y vea qué funciona en
          empresas como la suya.
        </p>
        <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4">
          {stats.map((s) => (
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
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              href={casePath(current)}
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
            </Link>
          </motion.div>
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
