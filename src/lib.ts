import { useCallback, useEffect, useState } from 'react';
import { CaseStudy, UserProfile } from './types';

// ── Storage ──────────────────────────────────────────────────────────────
// Browser storage can be unavailable (private mode, blocked site data), so
// every access is guarded and the app keeps working in memory.
function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback));
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore: storage is a convenience, not a requirement.
    }
  }, [key, value]);
  return [value, setValue] as const;
}

// ── Hash routing ─────────────────────────────────────────────────────────
// Hash routes keep deep links (e.g. #/caso/aa-petrobras) working on any
// static host without server rewrites, so cases can be shared with clients.
export type Route =
  | { view: 'explorar' }
  | { view: 'descubrir' }
  | { view: 'guardados'; ids?: string[] }
  | { view: 'perfil' }
  | { view: 'caso'; id: string };

function parseHash(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?');
  const [view, id] = path.split('/');
  switch (view) {
    case 'caso':
      return id ? { view: 'caso', id: decodeURIComponent(id) } : { view: 'explorar' };
    case 'descubrir':
      return { view: 'descubrir' };
    case 'guardados': {
      const ids = new URLSearchParams(query).get('ids');
      return { view: 'guardados', ids: ids ? ids.split(',').filter(Boolean) : undefined };
    }
    case 'perfil':
      return { view: 'perfil' };
    default:
      return { view: 'explorar' };
  }
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const navigate = useCallback((path: string) => {
    window.location.hash = path.startsWith('#') ? path : `#/${path.replace(/^\//, '')}`;
  }, []);
  return { route, navigate };
}

export function caseUrl(id: string) {
  return `${window.location.origin}${window.location.pathname}#/caso/${encodeURIComponent(id)}`;
}

/** Native share sheet where available, clipboard otherwise. */
export async function shareLink(title: string, url: string): Promise<'shared' | 'copied' | 'failed'> {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
      return 'shared';
    }
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch {
    return 'failed';
  }
}

// ── Search & recommendations ─────────────────────────────────────────────
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export function matchesQuery(c: CaseStudy, query: string, vendorName: string) {
  const q = normalize(query.trim());
  if (!q) return true;
  const haystack = normalize(
    [c.client, c.title, c.summary, c.industry, c.category, c.country ?? '', vendorName, ...c.products].join(' '),
  );
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

const LATAM = [
  'argentina', 'bolivia', 'brasil', 'chile', 'colombia', 'costa rica', 'ecuador', 'el salvador',
  'guatemala', 'honduras', 'mexico', 'nicaragua', 'panama', 'paraguay', 'peru',
  'republica dominicana', 'uruguay', 'venezuela',
];

const isLatam = (country?: string) => !!country && LATAM.includes(normalize(country));

export interface Recommendation {
  item: CaseStudy;
  score: number;
  reasons: string[];
}

export function recommend(cases: CaseStudy[], profile: UserProfile, limit = 9): Recommendation[] {
  const scored = cases.map((item) => {
    const reasons: string[] = [];
    let score = 0;
    if (profile.industries.includes(item.industry)) {
      score += 3;
      reasons.push(item.industry);
    }
    if (profile.categories.includes(item.category)) {
      score += 2;
      reasons.push(item.category);
    }
    if (profile.country && item.country && normalize(profile.country) === normalize(item.country)) {
      score += 2;
      reasons.push(item.country);
    } else if (isLatam(profile.country) && (isLatam(item.country) || item.vendor === 'qactions')) {
      score += 1;
      reasons.push('LATAM');
    }
    return { item, score, reasons };
  });
  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || Number(!!b.item.featured) - Number(!!a.item.featured))
    .slice(0, limit);
}

/** Five featured cases, shuffled once per day so the fallback feels fresh but stable. */
export function topPicks(cases: CaseStudy[], count = 5): CaseStudy[] {
  const day = Math.floor(Date.now() / 86_400_000);
  const pool = cases.filter((c) => c.featured);
  return [...pool]
    .map((c, i) => ({ c, k: Math.sin(day * 9301 + i * 49297) }))
    .sort((a, b) => a.k - b.k)
    .slice(0, count)
    .map(({ c }) => c);
}
