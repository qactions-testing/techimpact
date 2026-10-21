import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import CircuitBackground from '@/components/CircuitBackground';
import ClientBoot from '@/components/ClientBoot';
import ConsentBanner from '@/components/ConsentBanner';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import { BASE_PATH, ORG_ID, SITE_ORIGIN, SITE_URL, SOCIAL } from '@/lib/site';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: 'TechImpact: resultados de QA, testing, ciberseguridad y RPA + IA | QActions',
    template: '%s | QActions',
  },
  description:
    'Casos de éxito de QActions y de sus partners Tricentis, Veracode, hCaptcha, Automation Anywhere y Synthesized, por industria, con la fuente oficial de cada cifra.',
  applicationName: 'TechImpact by QActions',
  openGraph: { siteName: 'QActions', locale: 'es_419', type: 'website' },
  twitter: { card: 'summary_large_image' },
  icons: { icon: `${BASE_PATH}/logos/qactions-blue.png` },
};

export const viewport: Viewport = { themeColor: '#191917', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

// Organization lives at a stable @id so WordPress can emit the same entity and
// every page references it instead of redefining it.
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'QActions',
  url: SITE_ORIGIN,
  logo: `${SITE_URL}/logos/qactions-blue.png`,
  slogan: 'Calidad que impulsa',
  email: 'comercial@qactions.com',
  sameAs: SOCIAL,
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'sales', telephone: '+54-9-11-6423-5643', areaServed: ['AR', 'ES', '419'], availableLanguage: 'es' },
    { '@type': 'ContactPoint', contactType: 'sales', telephone: '+595-986-622020', areaServed: 'PY', availableLanguage: 'es' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Consent Mode v2: everything denied until the visitor chooses. Must run before GTM. */}
        <Script id="consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var c = null; try { c = JSON.parse(localStorage.getItem('qa_consent')); } catch (e) {}
          var v = c === 'granted' ? 'granted' : 'denied';
          gtag('consent', 'default', { ad_storage: v, analytics_storage: v, ad_user_data: v, ad_personalization: v, wait_for_update: 500 });
          gtag('set', 'ads_data_redaction', true);
        `}</Script>
      </head>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body className="min-h-screen">
        <JsonLd data={organization} />
        <div className="relative min-h-screen overflow-x-hidden">
          <CircuitBackground />
          <Header />
          <main className="mx-auto max-w-7xl px-4 pt-6 pb-32 sm:px-6 md:pb-16 lg:px-8">
            {children}
            <Footer />
          </main>
        </div>
        <ClientBoot />
        <ConsentBanner />
      </body>
    </html>
  );
}
