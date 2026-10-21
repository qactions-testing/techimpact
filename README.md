# TechImpact · Casos de éxito de QActions

Biblioteca de casos de éxito de **QActions** y sus partners (Tricentis, Veracode, hCaptcha, Automation Anywhere,
Synthesized), publicada en **https://qactions.com/techimpact**. Next.js (App Router) con páginas pre-renderizadas,
servida gratis en Cloudflare Workers (OpenNext) junto a WordPress.

- 47 casos, cada uno con URL propia: `/techimpact/<industria>/<caso>`; 20 páginas por industria.
- SEO: title/description/canonical/Open Graph por caso, imagen OG generada, JSON-LD (Organization, Article,
  BreadcrumbList, CollectionPage), `sitemap.xml`, `noindex` en hosts técnicos y vistas personales.
- Captación: formulario → Brevo (UTMs, caso visto, consentimiento) + PDF de marca por caso, Calendly embebido con
  verificación de la reserva y deal en Brevo CRM, WhatsApp con número por país y mensaje con el caso.
- Medición: GTM/GA4 con Consent Mode v2 y eventos de conversión.
- Los enlaces viejos `#/caso/<id>` redirigen a la URL nueva.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar lo necesario
npm run dev                  # http://localhost:3000/techimpact
npm run build                # PDFs + imágenes OG + build de Next
npm run cf:preview           # build para Workers y prueba local con el runtime real
npm run lint                 # chequeo de tipos
```

Puesta en producción paso a paso: [docs/DESPLIEGUE.md](docs/DESPLIEGUE.md).

## Editar casos

`src/data/cases.ts`. Cada caso exige `heroKpi`, `kpis`, `painPoints`, `benefits` y `sources` con la URL oficial
(los casos propios de QActions van con `sources: []`). Use solo cifras publicadas por la fuente y marque
`anonymized: true` cuando la fuente no nombra al cliente.

**Lo que más impacta en posicionamiento:** completar `qactionsTake` (2–4 frases originales: qué significa el caso
para una empresa de LATAM y qué haría QActions). Sin ese texto, la página compite con el original del fabricante.

Al cambiar contenido, actualizar `CONTENT_REVIEWED_AT` en `src/lib/site.ts`. La URL de un caso deriva de su `id`:
no cambie un `id` publicado (rompería enlaces indexados).

## Logos

`public/logos/`, registrados en `src/data/vendors.ts`. Si el logo es claro, `logoIsLight: true`.
