// One-time Brevo setup (safe to re-run):
// - renames the marketing@qactions.com sender from "My Company" to "QActions";
// - creates the custom contact attributes used by /api/lead and /api/demo;
// - creates the "TechImpact · Leads" list and prints its id.
// Usage: BREVO_API_KEY=xkeysib-... npm run brevo:setup   (or the "Brevo setup" GitHub Action)
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

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'marketing@qactions.com';
const senders = await (await api('/senders')).json();
const sender = senders.senders?.find((x) => x.email === SENDER_EMAIL);
if (!sender) console.log(`Remitente ${SENDER_EMAIL}: no encontrado (revisar en Brevo > Senders).`);
else if (sender.name === 'QActions') console.log(`Remitente ${SENDER_EMAIL}: ya se llama QActions.`);
else {
  const r = await api(`/senders/${sender.id}`, { method: 'PUT', body: JSON.stringify({ name: 'QActions', email: sender.email }) });
  console.log(`Remitente ${SENDER_EMAIL}: "${sender.name}" → "QActions" ${r.ok ? 'OK' : `ERROR ${r.status} ${await r.text()}`}`);
}

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
