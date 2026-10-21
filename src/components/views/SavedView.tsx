'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Bookmark, Link2 } from 'lucide-react';
import { CASE_STUDIES } from '@/data/cases';
import { absUrl } from '@/lib/site';
import { shareLink, useMounted, useSavedCases } from '@/lib/client';
import { CaseStudy } from '@/types';
import { CaseCard } from '../ui';

export default function SavedView() {
  const mounted = useMounted();
  const search = useSearchParams();
  const { savedIds, setSavedIds } = useSavedCases();
  const [notice, setNotice] = useState<string | null>(null);
  const sharedIds = search.get('ids')?.split(',').filter(Boolean);
  const showingShared = !!sharedIds?.length;
  const ids = showingShared ? sharedIds! : mounted ? savedIds : [];
  const items = ids.map((id) => CASE_STUDIES.find((c) => c.id === id)).filter((c): c is CaseStudy => !!c);

  const shareSelection = async () => {
    const result = await shareLink('Mi selección de casos de éxito · QActions', absUrl(`/guardados?ids=${savedIds.join(',')}`));
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
          <button
            type="button"
            onClick={() => setSavedIds((prev) => Array.from(new Set([...prev, ...items.map((c) => c.id)])))}
            className="chrome-button rounded-full px-5 py-2.5 font-semibold"
          >
            Guardar todos
          </button>
        ) : (
          savedIds.length > 0 &&
          mounted && (
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
          <Link href="/" className="chrome-button mt-5 inline-block rounded-full px-5 py-2.5 font-semibold">
            Explorar casos
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((c) => (
            <CaseCard key={c.id} item={c} />
          ))}
        </div>
      )}
    </div>
  );
}
