'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CASE_STUDIES } from '@/data/cases';
import { casePath } from '@/lib/cases';
import { captureAttribution } from '@/lib/client';

/**
 * Runs once per page load:
 * - stores UTMs for the lead form;
 * - maps old hash links (#/caso/<id>, #/guardados?ids=…) from the previous SPA
 *   to the new real URLs, so links already shared keep working.
 */
export default function ClientBoot() {
  const router = useRouter();
  useEffect(() => {
    captureAttribution();
    const hash = window.location.hash;
    if (!hash.startsWith('#/')) return;
    const [path, query = ''] = hash.slice(2).split('?');
    const [view, id] = path.split('/');
    const target =
      view === 'caso' && id
        ? (() => {
            const c = CASE_STUDIES.find((x) => x.id === decodeURIComponent(id));
            return c ? casePath(c) : '/';
          })()
        : view === 'guardados'
          ? `/guardados${query ? `?${query}` : ''}`
          : view === 'descubrir'
            ? '/para-usted'
            : view === 'perfil'
              ? '/perfil'
              : null;
    if (target) router.replace(target);
  }, [router]);
  return null;
}
