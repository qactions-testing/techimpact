'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '@/data/cases';
import { CATEGORIES } from '@/data/vendors';
import { INDUSTRY_ORDER } from '@/lib/cases';
import { EMPTY_PROFILE, useMounted, useProfile, useSavedCases } from '@/lib/client';
import { CATEGORY_ICON, Chip } from '../ui';

const COUNTRIES = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'El Salvador', 'España',
  'EE.UU.', 'Guatemala', 'Honduras', 'México', 'Panamá', 'Paraguay', 'Perú', 'República Dominicana',
  'Uruguay', 'Venezuela', 'Otro',
];

export default function ProfileView() {
  const router = useRouter();
  const mounted = useMounted();
  const [stored, setProfile] = useProfile();
  const profile = mounted ? stored : EMPTY_PROFILE;
  const { savedIds } = useSavedCases();
  const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  const field = 'w-full rounded-2xl border border-white/10 bg-ink-deep/60 px-4 py-3 text-beige placeholder:text-beige/35 focus:border-sky focus:outline-none';
  const availableIndustries = INDUSTRY_ORDER.filter((i) => CASE_STUDIES.some((c) => c.industry === i));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">Perfil</p>
        <h1 className="text-3xl font-bold tracking-tight">Personalice sus recomendaciones</h1>
        <p className="mt-2 text-beige/60">Se guarda solo en este navegador. Usamos su industria, disciplina de interés y país para priorizar casos.</p>
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
        <Link href="/guardados" className="text-sm text-beige/60 hover:text-beige">
          {mounted ? savedIds.length : 0} casos guardados →
        </Link>
        <div className="flex gap-3">
          <button type="button" onClick={() => setProfile(EMPTY_PROFILE)} className="rounded-full border border-white/15 px-5 py-2.5 font-semibold hover:bg-white/5">
            Restablecer
          </button>
          <button type="button" onClick={() => router.push('/para-usted')} className="chrome-button flex items-center gap-2 rounded-full px-6 py-2.5 font-semibold">
            Ver recomendaciones <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
