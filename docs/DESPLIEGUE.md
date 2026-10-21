# Puesta en producción: qactions.com/casos-de-exito

Orden obligatorio: **1 hosting → 2 Brevo → 3 dominio → 4 WordPress → 5 medición → 6 Search Console**.
Hasta completar el paso 3, la app sigue respondiendo en `*.vercel.app` con `noindex` (no compite con el sitio).

## 1. Hosting (Vercel)

1. El plan **Hobby prohíbe el uso comercial**. Pasar el equipo `marketing-9431s-projects` a **Pro (USD 20/mes)**
   o mover el proyecto a Cloudflare (ver «Alternativa sin costo» al final).
2. Project → Settings → General: *Framework Preset* = **Next.js** (antes era Vite), *Output* por defecto.
3. Settings → Environment Variables (Production): las de `.env.example`. Mínimo: `BREVO_API_KEY`, `BREVO_LIST_ID`,
   `LEAD_NOTIFY_EMAIL`, `NEXT_PUBLIC_GTM_ID`.
4. Firewall → regla: `path starts with /casos-de-exito/api/` y método POST → *rate limit* 10/min por IP.
5. Mergear el PR. El build genera los 47 PDF (`prebuild`) y 126 páginas estáticas.

## 2. Brevo

1. `BREVO_API_KEY=xkeysib-… npm run brevo:setup` → crea 16 atributos y la lista «TechImpact · Leads»; copiar el id a `BREVO_LIST_ID`.
2. Senders: renombrar el remitente «My Company» a **QActions** (hoy los emails saldrían con ese nombre en otros envíos).
3. Plan Free: **300 emails/día** (cada lead consume 2: PDF + alerta a ventas) y **50 deals abiertos**. Los deals se
   crean solo para demos agendadas. Con más de ~100 leads/día, pasar a Starter.
4. Opcional: plantilla de doble opt-in (Templates → tipo DOI) → `BREVO_DOI_TEMPLATE_ID`. Sin ella, el consentimiento
   de marketing queda en el atributo `OPT_IN`: **segmentar campañas por `OPT_IN = true`**.
5. Calendly → Integrations → API & Webhooks → *Personal access token* → `CALENDLY_TOKEN`. Sin token, las demos se
   miden en GA4 pero no crean contacto ni deal (el aviso del navegador no es confiable por sí solo).
6. En el evento `20min-demo` de Calendly, primera pregunta: «¿Qué caso le interesa?» (el embed la completa) y una
   pregunta «Empresa» (se usa para nombrar el deal).

## 3. Dominio: qactions.com/casos-de-exito

La URL hoy la ocupa una página de WordPress. El proxy la reemplaza; WordPress sigue sirviendo todo lo demás.

1. Cloudflare (plan Free): agregar `qactions.com`, **verificar que se importen todos los registros** (A del hosting
   de WordPress, MX, SPF/DKIM/DMARC de Brevo y Google) y cambiar los nameservers en el registrador.
2. `cd proxy && npx wrangler deploy` (editar `ORIGIN` en `wrangler.toml` con el dominio de producción de Vercel).
3. Verificar: `https://qactions.com/casos-de-exito` responde la app, `https://qactions.com/` sigue siendo WordPress,
   el email llega (MX).
4. En Vercel → Settings → Domains: no hace falta agregar qactions.com (el Worker apunta al dominio `.vercel.app`).

## 4. WordPress

1. Página actual `/casos-de-exito/`: pasar a **borrador** (o cambiar su slug) después del paso 3; si no, queda
   inaccesible pero sigue en el sitemap de Yoast/Rank Math. Quitarla del sitemap del plugin.
2. robots.txt (Yoast → Herramientas → Editor de archivos, o Rank Math → General → robots.txt). Agregar:
   ```
   Sitemap: https://qactions.com/casos-de-exito/sitemap.xml
   ```
   No bloquear `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot` ni `Googlebot` si se quiere aparecer en respuestas de IA.
3. Menú principal y home: enlazar «Casos de éxito» a `/casos-de-exito`. Desde cada página de servicio, enlazar la
   industria correspondiente (p. ej. `/casos-de-exito/banca`). El enlazado interno pesa más que cualquier etiqueta.
4. TranslatePress: excluir `/casos-de-exito/*` de la traducción automática (la app no tiene versión en inglés).
5. Si el tema emite schema `Organization`, usar `@id: https://qactions.com/#organization` para que coincida con la app.

## 5. Medición (GTM + GA4, gratis)

1. GTM: crear contenedor web → `NEXT_PUBLIC_GTM_ID`.
2. En GTM: etiqueta **Google tag** con el ID de GA4 (G-…), disparador *Initialization – All Pages*.
   Consent Mode v2 ya viene configurado por la app (todo `denied` hasta «Aceptar»).
3. Variables de capa de datos: `case_id`, `industry`, `category`, `vendor`, `placement`, `lead_source`.
4. Un disparador *Evento personalizado* y una etiqueta *GA4 Event* (mismo nombre) por cada evento:

   | Evento | Cuándo | Marcar como evento clave |
   |---|---|---|
   | `generate_lead` | Formulario de PDF aceptado por el servidor | Sí |
   | `calendly_booking` | Reserva confirmada en el embed | Sí |
   | `whatsapp_click` | Clic en cualquier botón de WhatsApp | Sí |
   | `pdf_download` | Descarga del PDF tras el formulario | No |
   | `form_start`, `form_submit` | Embudo del formulario | No |
   | `calendly_open`, `cta_click`, `case_share`, `case_save` | Interés | No |

5. GA4 → Admin → Eventos clave: `generate_lead`, `calendly_booking`, `whatsapp_click`.
6. Ingresos: en Brevo CRM, al ganar un deal, cargar el monto. Informe mensual: deals ganados × `UTM_SOURCE` / `CASO_VISTO`
   del contacto (atribución de primer y último toque; indicativa, no multitoque).

## 6. Search Console

1. Propiedad de **dominio** `qactions.com` (registro TXT en Cloudflare) y propiedad de prefijo
   `https://qactions.com/casos-de-exito/` para informes separados.
2. Enviar `https://qactions.com/casos-de-exito/sitemap.xml`.
3. Inspección de URL en 3–5 casos → «Solicitar indexación». Probar 2 casos en Rich Results Test (Article, Breadcrumb).

## Checklist de validación

- [ ] `curl -s https://qactions.com/casos-de-exito/banca | grep '<h1'` devuelve el H1 (HTML sin JS).
- [ ] `curl -sI https://qactions.com/casos-de-exito | grep -i x-robots` no devuelve nada (indexable).
- [ ] `curl -sI https://<proyecto>.vercel.app/casos-de-exito | grep -i x-robots` devuelve `noindex`.
- [ ] Formulario de un caso → llega el email con el PDF y la alerta a comercial@; el contacto aparece en la lista.
- [ ] Reserva de prueba en Calendly → contacto con `DEMO_AGENDADA = true` y deal en Brevo.
- [ ] WhatsApp desde Paraguay (o con VPN PY) abre +595 986 622020.
- [ ] GTM Preview: `consent default denied` → «Aceptar» → `consent update granted`; eventos en GA4 DebugView.
- [ ] Enlaces viejos `techimpact.vercel.app/#/caso/<id>` llevan a la URL nueva.

## Alternativa sin costo (Cloudflare Workers + OpenNext)

Evita Vercel Pro: `npm i -D @opennextjs/cloudflare wrangler`, `npx opennextjs-cloudflare build` y desplegar con ruta
`qactions.com/casos-de-exito*` (reemplaza al proxy). Plan Free de Workers: 100.000 solicitudes/día y bundle ≤ 3 MiB;
no está probado en este repo, verificar el tamaño del bundle antes de migrar.
