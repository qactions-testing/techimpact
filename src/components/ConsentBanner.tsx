'use client';

import { useEffect, useState } from 'react';
import { getConsent, setConsent } from '@/lib/client';

/**
 * Minimal consent banner for Consent Mode v2. Default is "denied" (set in the
 * layout before GTM loads); nothing that sets cookies runs until "Aceptar".
 * If WordPress gets a CMP later, both can share the qa_consent cookie.
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const c = getConsent();
    if (c) setConsent(c);
    else setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener('qa-consent-open', reopen);
    return () => window.removeEventListener('qa-consent-open', reopen);
  }, []);
  if (!open) return null;
  const choose = (v: 'granted' | 'denied') => {
    setConsent(v);
    setOpen(false);
  };
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
      className="no-print fixed inset-x-3 bottom-24 z-50 mx-auto max-w-2xl rounded-3xl border border-white/15 bg-ink-deep/95 p-5 shadow-2xl backdrop-blur-xl md:bottom-6"
    >
      <p className="text-sm text-beige/80">
        Usamos cookies de analítica para entender qué casos le resultan útiles y mejorar el sitio. Puede aceptarlas o
        seguir sin ellas.{' '}
        <a href="https://qactions.com/politica-de-privacidad/" className="text-sky underline">
          Más información
        </a>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold hover:bg-white/5"
        >
          Solo necesarias
        </button>
        <button type="button" onClick={() => choose('granted')} className="chrome-button rounded-full px-5 py-2 text-sm font-semibold">
          Aceptar
        </button>
      </div>
    </div>
  );
}
