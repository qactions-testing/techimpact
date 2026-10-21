import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

async function fonts() {
  const dir = path.join(process.cwd(), 'node_modules/@fontsource/poppins/files');
  const [b, x] = await Promise.all([
    readFile(path.join(dir, 'poppins-latin-700-normal.woff')),
    readFile(path.join(dir, 'poppins-latin-900-normal.woff')),
  ]);
  return [
    { name: 'Poppins', data: b, weight: 700 as const, style: 'normal' as const },
    { name: 'Poppins', data: x, weight: 900 as const, style: 'normal' as const },
  ];
}

async function logo() {
  const buf = await readFile(path.join(process.cwd(), 'public/logos/qactions-white.png'));
  return `data:image/png;base64,${buf.toString('base64')}`;
}

/** Brand card: #283890 / #2f2f2c / #f5f3db with celeste-violeta-aqua accents. */
export async function brandCard(input: { eyebrow: string; kpi?: string; kpiLabel?: string; title: string; footer: string }) {
  // Poppins' latin subset has no arrow glyph.
  const t = (x?: string) => x?.replace(/\s*→\s*/g, ' a ');
  const o = { ...input, kpi: t(input.kpi), kpiLabel: t(input.kpiLabel), title: t(input.title)! };
  const src = await logo();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: 'linear-gradient(135deg, #283890 0%, #1c2563 45%, #191917 100%)',
          color: '#f5f3db',
          fontFamily: 'Poppins',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} height={44} alt="" />
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, color: '#5ccff5', letterSpacing: 3, textTransform: 'uppercase' }}>
            {o.eyebrow}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {o.kpi && (
            <div
              style={{
                display: 'flex',
                fontSize: o.kpi.length > 9 ? 120 : 168,
                fontWeight: 900,
                lineHeight: 1,
                backgroundImage: 'linear-gradient(120deg, #f5f3db 0%, #5ccff5 45%, #a78bfa 75%, #2dd4bf 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {o.kpi}
            </div>
          )}
          {o.kpiLabel && <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, marginTop: 12, maxWidth: 1000 }}>{o.kpiLabel}</div>}
          <div style={{ display: 'flex', fontSize: o.kpi ? 30 : 60, fontWeight: o.kpi ? 700 : 900, marginTop: 24, color: o.kpi ? '#b8c4f8' : '#f5f3db', maxWidth: 1050 }}>
            {o.title}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 22, color: 'rgba(245,243,219,0.65)' }}>{o.footer}</div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
