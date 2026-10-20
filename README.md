# TechImpact · Casos de éxito

Biblioteca interactiva de casos de éxito de **QActions** y sus partners (Tricentis, Veracode, hCaptcha,
Automation Anywhere y Synthesized) para que los clientes busquen resultados por industria, disciplina y partner.

- 47 casos con cifras textuales de la fuente oficial y enlace a cada una.
- Búsqueda, filtros por industria, partner y disciplina, guardados, recomendaciones por perfil.
- Enlaces directos por caso (`#/caso/<id>`) y selecciones compartibles (`#/guardados?ids=a,b`).
- Impresión / PDF desde el detalle de cada caso.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera dist/ (sitio estático, se puede publicar en cualquier hosting)
npm run lint     # chequeo de tipos
```

## Cambiar logos

Los logos viven en `public/logos/` y se registran una sola vez en `src/data/vendors.ts`.
Reemplace el archivo (mismo nombre) y se actualiza en tarjetas, detalle y sección de partners.
Si el logo es claro (blanco), marque `logoIsLight: true` para mostrarlo sobre placa azul.

## Agregar o editar casos

Edite `src/data/cases.ts`. Cada caso exige `heroKpi` (el número grande), `kpis`, `painPoints`, `benefits`
y `sources` con la URL oficial. Use solo cifras publicadas por la fuente y marque `anonymized: true`
cuando la fuente no nombra al cliente.
