# Puesta en producción: qactions.com/techimpact (100 % gratis)

Stack: **Cloudflare Workers Free** (app) + **GitHub Actions** (build y deploy; gratis en repos públicos)
+ **Brevo Free** + **Calendly Free** + **GTM/GA4** + **Search Console**. WordPress sigue sirviendo todo lo que
no sea `/techimpact`, incluida la página actual `/casos-de-exito`, que **no se toca**.

Orden: **1 Cloudflare → 2 secretos en GitHub → 3 Brevo → 4 primer deploy (staging) → 5 dominio → 6 WordPress →
7 medición → 8 Search Console**.

> El repositorio es **público**: claves y tokens van solo en *Settings → Secrets and variables → Actions*,
> nunca en el código ni en el chat.

## 1. Cloudflare (cuenta Free)

1. Crear cuenta en dash.cloudflare.com. Copiar el **Account ID** (barra lateral de *Workers & Pages*).
2. *My Profile → API Tokens → Create token* → plantilla **Edit Cloudflare Workers** → incluir la zona
   `qactions.com` cuando exista (paso 5). Copiar el token.

## 2. Secretos y variables en GitHub

*Repo → Settings → Secrets and variables → Actions*:

| Tipo | Nombre | Valor |
|---|---|---|
| Secret | `CLOUDFLARE_API_TOKEN` | token del paso 1 |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Account ID |
| Secret | `BREVO_API_KEY` | Brevo → *SMTP & API → API keys → Generate* (cuenta marketing@qactions.com) |
| Secret | `CALENDLY_TOKEN` | Calendly → *Integrations → API & Webhooks → Personal access tokens → Generate* |
| Secret (opcional) | `HCAPTCHA_SECRET` | dashboard.hcaptcha.com |
| Variable | `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` (paso 7) |
| Variable (opcional) | `NEXT_PUBLIC_HCAPTCHA_SITEKEY` | site key de hCaptcha |
| Variable | `PRODUCTION` | `true` **solo después del paso 5** |

## 3. Brevo (una vez)

*Actions → «Brevo setup» → Run workflow*. El flujo:
- renombra el remitente `marketing@qactions.com` de **«My Company» a «QActions»**;
- crea 16 atributos (`CASO_VISTO`, `UTM_*`, `DEMO_AGENDADA`, `FECHA_DEMO`…);
- crea la lista **«TechImpact · Leads»** e imprime su id.

Copiar el id a `BREVO_LIST_ID` en `wrangler.jsonc` (no es secreto) o pedírmelo y lo cargo.
Límites Free: 300 emails/día (cada lead usa 2: PDF + alerta a ventas) y 50 deals abiertos (se crean solo al
agendar demo). Segmentar campañas por `OPT_IN = true`.

En Calendly, evento `20min-demo`: primera pregunta «¿Qué caso le interesa?» (el embed la completa sola) y una
pregunta «Empresa» (nombra el deal).

## 4. Primer deploy (staging)

Mergear el PR → corre *Deploy (Cloudflare Workers)* → la app queda en
`https://qactions-techimpact.<subdominio>.workers.dev/techimpact` con `noindex`. Probar formulario, Calendly
y WhatsApp ahí.

## 5. Dominio: qactions.com/techimpact

1. Cloudflare → *Add a site* → `qactions.com` → plan Free. **Antes de cambiar nameservers**, comparar los
   registros importados con los del proveedor actual: A/AAAA del hosting de WordPress, **MX**, **SPF, DKIM y
   DMARC** (Brevo y el correo corporativo) y TXT de verificación de Google. Un MX faltante corta el email.
2. Cambiar los nameservers en el registrador del dominio. Esperar el estado *Active*.
3. Proxy (nube naranja) en el registro de `qactions.com`; *SSL/TLS* en **Full (strict)** si el hosting tiene
   certificado válido.
4. GitHub → variable `PRODUCTION=true` → *Actions → Deploy → Run workflow*. La ruta
   `qactions.com/techimpact*` queda en el Worker; todo lo demás sigue yendo a WordPress.
5. *Security → WAF → Rate limiting rules* (1 regla gratis): `URI Path starts with /techimpact/api/` →
   10 solicitudes / 10 s por IP → *Block*.

## 6. WordPress

1. robots.txt (Yoast/Rank Math → editor de robots.txt), agregar:
   ```
   Sitemap: https://qactions.com/techimpact/sitemap.xml
   ```
   No bloquear `Googlebot`, `OAI-SearchBot`, `PerplexityBot` ni `ClaudeBot`.
2. Enlaces internos (lo que más pesa para posicionar una URL nueva):
   - Menú y home: «TechImpact · Biblioteca de casos» → `/techimpact`.
   - Página `/casos-de-exito`: un bloque «Ver los 47 casos por industria» → `/techimpact`, y cada caso propio
     enlazando su página (p. ej. `/techimpact/petroleo-y-gas/qactions-petrosea-sap`).
   - Páginas de servicio → la industria que corresponde (`/techimpact/banca`, `/techimpact/seguros`…).
3. Diferenciación para no canibalizar: `/casos-de-exito` = casos propios de QActions (resumen);
   `/techimpact` = biblioteca completa por industria. Los títulos de la app ya están escritos así.
4. TranslatePress: excluir `/techimpact/*`.
5. Si el tema emite schema `Organization`, usar `@id: https://qactions.com/#organization`.

## 7. Medición (GTM + GA4)

1. GTM → contenedor web → variable `NEXT_PUBLIC_GTM_ID` → re-deploy.
2. Etiqueta **Google tag** (G-…) en *Initialization – All Pages*. Consent Mode v2 ya viene en la app.
3. Disparador *Evento personalizado* + etiqueta *GA4 Event* por evento: `generate_lead`, `calendly_booking`,
   `whatsapp_click` (marcar los tres como **eventos clave**), `pdf_download`, `form_start`, `form_submit`,
   `calendly_open`, `case_share`, `case_save`. Parámetros: `case_id`, `industry`, `category`, `vendor`, `placement`.
4. Ingresos: al ganar un deal en Brevo, cargar el monto; cruzar deals ganados con `UTM_SOURCE` y `CASO_VISTO`.

## 8. Search Console

1. Propiedad de **dominio** `qactions.com` (TXT en Cloudflare) + propiedad de prefijo
   `https://qactions.com/techimpact/`.
2. Enviar `https://qactions.com/techimpact/sitemap.xml`; inspeccionar 3–5 casos → *Solicitar indexación*.
3. Rich Results Test en 2 casos (Article, Breadcrumb).

## Checklist

- [ ] `https://qactions.com/` y `/casos-de-exito` siguen siendo WordPress; `/techimpact` es la app.
- [ ] `curl -sI https://qactions.com/techimpact/banca | grep -i x-robots` → vacío (indexable).
- [ ] `curl -sI https://qactions-techimpact.<sub>.workers.dev/techimpact | grep -i x-robots` → `noindex`.
- [ ] Email corporativo y de Brevo siguen llegando (MX/SPF/DKIM).
- [ ] Formulario → email con PDF + alerta a comercial@ + contacto en «TechImpact · Leads».
- [ ] Reserva en Calendly → contacto `DEMO_AGENDADA = true` + deal en Brevo.
- [ ] WhatsApp desde Paraguay abre +595 986 622020.
- [ ] GTM Preview: consent `denied` → «Aceptar» → `granted`; eventos en GA4 DebugView.

## Límites del plan gratis (a vigilar)

Workers Free: 100.000 solicitudes/día, 10 ms de CPU por solicitud y bundle ≤ 3 MiB comprimido (hoy: ~1,3 MiB).
Si se supera el límite diario, el Worker responde error hasta el reinicio (00:00 UTC); WordPress no se afecta.

## Vercel

El proyecto `techimpact` en Vercel (Hobby) ya no hace falta. Después del paso 5, desconectarlo del repo o
borrarlo para que no siga publicando la app en `techimpact.vercel.app`.
