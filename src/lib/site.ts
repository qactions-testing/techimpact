// Single place for public URLs and contact points.

export const SITE_ORIGIN = 'https://qactions.com';
export const BASE_PATH = '/techimpact';
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;
export const ORG_ID = `${SITE_ORIGIN}/#organization`;

/** Absolute public URL for a path inside the app (path without basePath). */
export const absUrl = (path = '') => `${SITE_URL}${path === '/' ? '' : path}`;
/** Same-origin URL for client fetches (fetch does not apply basePath). */
export const apiPath = (path: string) => `${BASE_PATH}${path}`;

export const CONTACT = {
  email: 'comercial@qactions.com',
  whatsappLatam: '5491164235643',
  whatsappParaguay: '595986622020',
  calendly: 'https://calendly.com/qactions-marketing/20min-demo',
  contactPage: 'https://qactions.com/contacto/',
  blog: 'https://qactions.com/blog/',
};

export const SOCIAL = [
  'https://www.linkedin.com/company/qactions-srl',
  'https://www.instagram.com/joinqactions/',
  'https://www.facebook.com/qactions.calidadqueimpulsa',
  'https://x.com/JoinQactions',
  'https://www.tiktok.com/@qactions',
  'https://www.youtube.com/@qactions',
];

/** Date the case library was last reviewed against its sources (ISO). */
export const CONTENT_REVIEWED_AT = '2026-10-21';
