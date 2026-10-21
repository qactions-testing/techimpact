// One-time Brevo setup: creates the custom contact attributes and the
// "TechImpact · Leads" list used by /api/lead and /api/demo.
// Usage: BREVO_API_KEY=xkeysib-... npm run brevo:setup
const key = process.env.BREVO_API_KEY;
if (!key) {
  console.error('Set BREVO_API_KEY first.');
  process.exit(1);
}
const api = (path, init = {}) =>
  fetch(`https://api.brevo.com/v3${path}`, {
    ...init,
    headers: { 'api-key': key, accept: 'application/json', 'content-type': 'application/json' },
  });

const TEXT = [
  'LEAD_ORIGEN', 'CASO_VISTO', 'CASO_INDUSTRIA', 'CASO_PARTNER', 'LANDING_URL', 'UTM_SOURCE', 'UTM_MEDIUM',
  'UTM_CAMPAIGN', 'UTM_TERM', 'UTM_CONTENT', 'GCLID', 'FIRST_UTM_SOURCE', 'GEO_PAIS_IP', 'CALENDLY_INVITEE',
];
const OTHER = { DEMO_AGENDADA: 'boolean', FECHA_DEMO: 'date' };

for (const [name, type] of [...TEXT.map((n) => [n, 'text']), ...Object.entries(OTHER)]) {
  const r = await api(`/contacts/attributes/normal/${name}`, { method: 'POST', body: JSON.stringify({ type }) });
  const msg = r.ok ? 'creado' : (await r.json().catch(() => ({}))).message ?? r.status;
  console.log(`${name.padEnd(18)} ${type.padEnd(8)} ${msg}`);
}

const lists = await (await api('/contacts/lists?limit=50')).json();
let list = lists.lists?.find((l) => l.name === 'TechImpact · Leads');
if (!list) {
  const folders = await (await api('/contacts/folders?limit=50')).json();
  const folderId = folders.folders?.[0]?.id ?? 1;
  const r = await api('/contacts/lists', { method: 'POST', body: JSON.stringify({ name: 'TechImpact · Leads', folderId }) });
  list = await r.json();
}
console.log(`\nLista "TechImpact · Leads": id ${list.id}  →  BREVO_LIST_ID=${list.id}`);
