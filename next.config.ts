import type { NextConfig } from 'next';

// The app is served under qactions.com/casos-de-exito, so every route, asset
// and API lives under this prefix. Change it here and in src/lib/site.ts.
const BASE_PATH = '/casos-de-exito';

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  async redirects() {
    return [
      // Old host root (techimpact.vercel.app/) -> app root. Browsers keep the
      // #/caso/<id> fragment across the redirect; HashRedirect maps it.
      { source: '/', destination: BASE_PATH, basePath: false, permanent: true },
      { source: '/descubrir', destination: '/para-usted', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Only qactions.com may be indexed. Technical hosts (*.vercel.app,
        // *.workers.dev, previews) answer with noindex.
        source: '/:path*',
        missing: [{ type: 'host', value: '(www\\.)?qactions\\.com' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/pdf/:file*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
