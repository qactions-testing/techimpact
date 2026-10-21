'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { CaseStudy, UserProfile } from '@/types';

// ── Storage ──────────────────────────────────────────────────────────────
// Browser storage can be unavailable (private mode, blocked site data), so
// every access is guarded and the app keeps working in memory.
function read<T>(store: 'local' | 'session', key: string, fallback: T): T {
  try {
    const s = store === 'local' ? window.localStorage : window.sessionStorage;
    const raw = s.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(store: 'local' | 'session', key: string, value: unknown) {
  try {
    const s = store === 'local' ? window.localStorage : window.sessionStorage;
    s.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is a convenience, not a requirement.
  }
}

// Shared, cross-component persistent state (saving a case must update the
// header badge immediately).
const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, unknown>();
function subscribe(key: string, cb: () => void) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(cb);
  return () => {
    listeners.get(key)!.delete(cb);
  };
}

export function usePersistentState<T>(key: string, fallback: T) {
  const value = useSyncExternalStore(
    (cb) => subscribe(key, cb),
    () => {
      if (!cache.has(key)) cache.set(key, read('local', key, fallback));
      return cache.get(key) as T;
    },
    () => fallback,
  );
  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = (cache.has(key) ? cache.get(key) : read('local', key, fallback)) as T;
      const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      cache.set(key, resolved);
      write('local', key, resolved);
      listeners.get(key)?.forEach((cb) => cb());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
  return [value, setValue] as const;
}

const NO_IDS: string[] = [];
export function useSavedCases() {
  const [savedIds, setSavedIds] = usePersistentState<string[]>('techimpact_saved', NO_IDS);
  const toggle = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  return { savedIds, setSavedIds, isSaved: (id: string) => savedIds.includes(id), toggle };
}

export const EMPTY_PROFILE: UserProfile = { name: '', company: '', country: '', industries: [], categories: [] };
export const useProfile = () => usePersistentState<UserProfile>('techimpact_profile', EMPTY_PROFILE);

export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

// ── Consent (Consent Mode v2) ──────────────────────────────────────────────
export type Consent = 'granted' | 'denied' | null;
const CONSENT_KEY = 'qa_consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): Consent {
  return read<Consent>('local', CONSENT_KEY, null);
}

export function setConsent(value: 'granted' | 'denied') {
  write('local', CONSENT_KEY, value);
  // Same-host cookie so WordPress can read the same choice.
  try {
    document.cookie = `${CONSENT_KEY}=${value}; Path=/; Max-Age=${60 * 60 * 24 * 180}; SameSite=Lax; Secure`;
  } catch {}
  window.gtag?.('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
  window.dispatchEvent(new Event('qa-consent'));
}

// ── Tracking ─────────────────────────────────────────────────────────────
// Events go to the GTM dataLayer; GTM maps them to GA4. With consent denied,
// GA4 only receives cookieless pings (Consent Mode v2).
export type TrackEvent =
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'generate_lead'
  | 'pdf_download'
  | 'calendly_open'
  | 'calendly_booking'
  | 'whatsapp_click'
  | 'case_share'
  | 'case_save';

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {}
}

export const caseParams = (c: CaseStudy) => ({
  case_id: c.id,
  case_title: c.title,
  industry: c.industry,
  category: c.category,
  vendor: c.vendor,
});

// ── Attribution (UTMs) ─────────────────────────────────────────────────────
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;
export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  first_utm_source?: string;
  referrer?: string;
  landing?: string;
};

/** Reads UTMs on landing: last touch replaces, first touch is kept for the visit. */
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    UTM_KEYS.forEach((k) => {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    });
    const current = read<Attribution>('session', 'qa_attr', {});
    const next: Attribution = Object.keys(found).length > 0 ? { ...found } : { ...current };
    const ref = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : undefined;
    next.first_utm_source = current.first_utm_source ?? found.utm_source ?? (ref ? new URL(ref).hostname : 'direct');
    next.referrer = current.referrer ?? ref;
    next.landing = current.landing ?? window.location.href.split('#')[0];
    write('session', 'qa_attr', next);
  } catch {}
}

export const getAttribution = (): Attribution => read<Attribution>('session', 'qa_attr', {});

// ── Sharing ────────────────────────────────────────────────────────────────
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
  return cases
    .map((item) => {
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
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || Number(!!b.item.featured) - Number(!!a.item.featured))
    .slice(0, limit);
}

/** Featured cases, shuffled once per day so the fallback feels fresh but stable. */
export function topPicks(cases: CaseStudy[], count = 5): CaseStudy[] {
  const day = Math.floor(Date.now() / 86_400_000);
  return cases
    .filter((c) => c.featured)
    .map((c, i) => ({ c, k: Math.sin(day * 9301 + i * 49297) }))
    .sort((a, b) => a.k - b.k)
    .slice(0, count)
    .map(({ c }) => c);
}
