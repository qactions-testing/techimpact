/**
 * Builds one branded A4 PDF per case into public/pdf/<slug>.pdf.
 * Runs before `next build` (npm "prebuild"), so PDFs are static files with no
 * runtime cost. Content comes from src/data, so a PDF never drifts from its page.
 */
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { Document, Font, Image, Link, Page, StyleSheet, Text, View, renderToFile } from '@react-pdf/renderer';
import { CASE_STUDIES } from '../src/data/cases';
import { VENDORS } from '../src/data/vendors';
import { casePath, caseSlug, isOwnCase, publisherName } from '../src/lib/cases';
import { QACTIONS_OFFER } from '../src/lib/offer';
import { absUrl, CONTACT, CONTENT_REVIEWED_AT } from '../src/lib/site';
import type { CaseStudy } from '../src/types';

const root = process.cwd();
const fontDir = path.join(root, 'node_modules/@fontsource/poppins/files');
Font.register({
  family: 'Poppins',
  fonts: [
    { src: path.join(fontDir, 'poppins-latin-400-normal.woff'), fontWeight: 400 },
    { src: path.join(fontDir, 'poppins-latin-600-normal.woff'), fontWeight: 600 },
    { src: path.join(fontDir, 'poppins-latin-800-normal.woff'), fontWeight: 800 },
  ],
});
Font.registerHyphenationCallback((w) => [w]);

const C = { brand: '#283890', ink: '#2f2f2c', beige: '#f5f3db', sky: '#1f9fcf', aqua: '#0f9f8f', muted: '#6b6b72' };

const s = StyleSheet.create({
  page: { fontFamily: 'Poppins', fontSize: 9, color: C.ink, backgroundColor: '#ffffff', paddingBottom: 54 },
  band: { backgroundColor: C.brand, paddingHorizontal: 36, paddingVertical: 18, color: C.beige },
  bandTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { height: 22 },
  eyebrow: { fontSize: 8, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9fdcf5' },
  kpi: { fontSize: 40, fontWeight: 800, marginTop: 10, color: C.beige, lineHeight: 1 },
  kpiLabel: { fontSize: 13, fontWeight: 600, marginTop: 4, color: C.beige },
  title: { fontSize: 14, fontWeight: 800, marginTop: 8, color: '#ffffff' },
  client: { fontSize: 9.5, marginTop: 2, color: '#cfd5f6' },
  body: { paddingHorizontal: 36, paddingTop: 12 },
  summary: { fontSize: 10.5, lineHeight: 1.4 },
  kpis: { flexDirection: 'row', gap: 8, marginTop: 10 },
  kpiBox: { flex: 1, borderWidth: 1, borderColor: '#e4e2cf', borderRadius: 8, padding: 10, backgroundColor: '#fbfaf0' },
  kpiV: { fontSize: 17, fontWeight: 800, color: C.brand },
  kpiL: { fontSize: 8, color: C.muted, marginTop: 2 },
  cols: { flexDirection: 'row', gap: 16, marginTop: 12 },
  col: { flex: 1 },
  h: { fontSize: 10.5, fontWeight: 800, color: C.brand, marginBottom: 6 },
  li: { flexDirection: 'row', marginBottom: 2 },
  dot: { width: 10, color: C.aqua, fontWeight: 800 },
  liText: { flex: 1, lineHeight: 1.25 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  chip: { borderWidth: 1, borderColor: '#d6d4c0', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2, fontSize: 8 },
  quote: { marginTop: 10, padding: 8, borderLeftWidth: 3, borderLeftColor: C.sky, backgroundColor: '#f4f8fd', fontSize: 10, lineHeight: 1.45 },
  offer: { marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: C.ink, color: C.beige },
  offerH: { fontSize: 11, fontWeight: 800, color: '#ffffff' },
  steps: { flexDirection: 'row', gap: 8, marginTop: 8 },
  step: { flex: 1 },
  stepN: { fontSize: 12, fontWeight: 800, color: '#5ccff5' },
  stepT: { fontSize: 9, fontWeight: 600, color: '#ffffff' },
  stepX: { fontSize: 8, color: '#d9d7c6', lineHeight: 1.35, marginTop: 1 },
  cta: { marginTop: 10, flexDirection: 'row', gap: 8 },
  btn: { backgroundColor: C.beige, color: C.ink, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, fontSize: 8.5, fontWeight: 600, textDecoration: 'none' },
  source: { marginTop: 8, fontSize: 7, color: C.muted, lineHeight: 1.3 },
  footer: { position: 'absolute', bottom: 18, left: 36, right: 36, flexDirection: 'row', justifyContent: 'space-between', fontSize: 7.5, color: C.muted },
});

// Poppins' latin subset has no arrow glyph.
const t = (x: string) => x.replace(/\s*→\s*/g, ' a ');

const Bullets = ({ items }: { items: string[] }) => (
  <View>
    {items.map((it) => (
      <View key={it} style={s.li}>
        <Text style={s.dot}>•</Text>
        <Text style={s.liText}>{t(it)}</Text>
      </View>
    ))}
  </View>
);

function CasePdf({ c, logo }: { c: CaseStudy; logo: string }) {
  const url = absUrl(casePath(c));
  const offer = QACTIONS_OFFER[c.category];
  const partner = c.technology ?? c.vendor;
  const src = isOwnCase(c)
    ? 'Caso propio de QActions. Referencias del cliente disponibles a pedido en una reunión comercial.'
    : `Caso publicado por ${publisherName(c)}. Cifras citadas de: ${c.sources.map((x) => x.url).join(' · ')}. QActions es partner de ${publisherName(c)}.`;
  return (
    <Document title={`${c.client}: ${c.title}`} author="QActions" subject={`Caso de éxito · ${c.industry}`} language="es">
      <Page size="A4" style={s.page}>
        <View style={s.band}>
          <View style={s.bandTop}>
            <Image src={logo} style={s.logo} />
            <Text style={s.eyebrow}>
              {c.category} · {c.industry}
              {c.country ? ` · ${c.country}` : ''}
            </Text>
          </View>
          <Text style={s.kpi}>{t(c.heroKpi.value)}</Text>
          <Text style={s.kpiLabel}>{t(c.heroKpi.label)}</Text>
          <Text style={s.title}>{t(c.title)}</Text>
          <Text style={s.client}>
            {c.client}
            {c.anonymized ? ' (nombre reservado por la fuente)' : ''} · {VENDORS[c.vendor].name}
            {c.technology ? ` con ${VENDORS[c.technology].name}` : ''}
          </Text>
        </View>
        <View style={s.body}>
          <Text style={s.summary}>{t(c.summary)}</Text>
          {c.kpis.length > 0 && (
            <View style={s.kpis}>
              {c.kpis.slice(0, 4).map((k) => (
                <View key={k.label} style={s.kpiBox}>
                  <Text style={s.kpiV}>{t(k.value)}</Text>
                  <Text style={s.kpiL}>{t(k.label)}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={s.cols}>
            <View style={s.col}>
              <Text style={s.h}>El desafío</Text>
              <Bullets items={c.painPoints} />
            </View>
            <View style={s.col}>
              <Text style={s.h}>La solución y sus beneficios</Text>
              <Bullets items={c.benefits} />
            </View>
          </View>
          {c.quote && (
            <View style={s.quote}>
              <Text>“{c.quote.text}”</Text>
              <Text style={{ fontSize: 8, color: C.muted, marginTop: 4 }}>{c.quote.author}</Text>
            </View>
          )}
          <View style={{ marginTop: 10 }}>
            <Text style={s.h}>Tecnologías</Text>
            <View style={s.chips}>
              {c.products.map((p) => (
                <Text key={p} style={s.chip}>
                  {p}
                </Text>
              ))}
            </View>
          </View>
          <View style={s.offer} wrap={false}>
            <Text style={s.offerH}>
              Cómo lograrlo {partner === 'qactions' ? 'en su empresa' : `con ${VENDORS[partner].name} en su empresa`}, con QActions
            </Text>
            <View style={s.steps}>
              {offer.steps.map((st, i) => (
                <View key={st.title} style={s.step}>
                  <Text style={s.stepN}>0{i + 1}</Text>
                  <Text style={s.stepT}>{st.title}</Text>
                  <Text style={s.stepX}>{st.text}</Text>
                </View>
              ))}
            </View>
            <View style={s.cta}>
              <Link src={CONTACT.calendly} style={s.btn}>
                Agendar demo de 20 min
              </Link>
              <Link src={`https://wa.me/${CONTACT.whatsappLatam}`} style={s.btn}>
                WhatsApp +54 9 11 6423-5643
              </Link>
              <Link src={`mailto:${CONTACT.email}`} style={s.btn}>
                {CONTACT.email}
              </Link>
            </View>
          </View>
          <Text style={s.source}>
            {src} Revisado el {CONTENT_REVIEWED_AT.split('-').reverse().join('/')}. Caso online: {url}
          </Text>
        </View>
        <View style={s.footer} fixed>
          <Text>QActions · Calidad que impulsa · qactions.com</Text>
          <Text>Paraguay +595 986 622020</Text>
        </View>
      </Page>
    </Document>
  );
}

async function main() {
  const out = path.join(root, 'public/pdf');
  fs.mkdirSync(out, { recursive: true });
  const logo = path.join(root, 'public/logos/qactions-white.png');
  const only = process.argv[2];
  const list = only ? CASE_STUDIES.filter((c) => c.id === only) : CASE_STUDIES;
  for (const c of list) await renderToFile(<CasePdf c={c} logo={logo} />, path.join(out, `${caseSlug(c)}.pdf`));
  console.log(`PDFs: ${list.length} → public/pdf`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
