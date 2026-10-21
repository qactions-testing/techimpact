'use client';

import { useState } from 'react';
import { Printer, Share2 } from 'lucide-react';
import { caseParams, shareLink, track } from '@/lib/client';
import { CaseStudy } from '@/types';
import { SaveButton } from './ui';

export default function CaseActions({ item, url }: { item: CaseStudy; url: string }) {
  const [state, setState] = useState<string | null>(null);
  const share = async () => {
    const result = await shareLink(`${item.client}: ${item.title}`, url);
    if (result !== 'failed') track('case_share', { ...caseParams(item), method: result });
    setState(result === 'copied' ? 'Enlace copiado' : result === 'failed' ? 'No se pudo compartir' : null);
    window.setTimeout(() => setState(null), 2500);
  };
  return (
    <div className="no-print flex items-center gap-1">
      <SaveButton item={item} />
      <button type="button" onClick={share} aria-label="Compartir caso" className="rounded-full p-2.5 hover:bg-white/10">
        <Share2 className="h-5 w-5 text-beige/70" />
      </button>
      <button type="button" onClick={() => window.print()} aria-label="Imprimir" className="rounded-full p-2.5 hover:bg-white/10">
        <Printer className="h-5 w-5 text-beige/70" />
      </button>
      {state && <span className="ml-1 text-xs text-aqua">{state}</span>}
    </div>
  );
}
