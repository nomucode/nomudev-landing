#!/usr/bin/env node
// Genera las imágenes de marca estáticas: Open Graph por idioma, favicon PNG y apple-touch-icon.
// Uso: node scripts/generate-brand-assets.mjs  (requiere sharp, incluido con Astro)
// Los colores replican los tokens primitivos de src/styles/theme.css.
import sharp from 'sharp';

const MARK = 'src/assets/brand/nomudev-mark.png';
const C = { canvas: '#09090b', fg: '#fafafa', muted: '#a1a1aa', subtle: '#8a8a93', primary: '#29b6f6', success: '#00e676', line: '#27272a' };

const og = {
  es: {
    eyebrow: 'NOEL MUÑOZ · CTO E INGENIERO FULL-STACK',
    title: ['Desarrollo de software', 'a medida en Valencia'],
    sub: 'Webs · Aplicaciones web · Escritorio · ERPs',
  },
  en: {
    eyebrow: 'NOEL MUÑOZ · CTO & FULL-STACK ENGINEER',
    title: ['Custom software that', 'runs your business'],
    sub: 'Websites · Web apps · Desktop apps · ERPs',
  },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

for (const [lang, t] of Object.entries(og)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#ffffff" fill-opacity="0.07"/></pattern>
      <radialGradient id="glow" cx="85%" cy="10%" r="60%"><stop offset="0" stop-color="${C.primary}" stop-opacity="0.28"/><stop offset="1" stop-color="${C.primary}" stop-opacity="0"/></radialGradient>
      <linearGradient id="grad" x1="0" x2="1"><stop offset="0" stop-color="${C.primary}"/><stop offset="1" stop-color="${C.success}"/></linearGradient>
    </defs>
    <rect width="1200" height="630" fill="${C.canvas}"/>
    <rect width="1200" height="630" fill="url(#dots)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="${C.line}"/>
    <text x="96" y="210" font-family="JetBrains Mono, Menlo, monospace" font-size="22" letter-spacing="3" fill="${C.primary}">${esc(t.eyebrow)}</text>
    <text x="96" y="300" font-family="Inter, Helvetica, Arial, sans-serif" font-size="68" font-weight="700" letter-spacing="-2" fill="${C.fg}">${esc(t.title[0])}</text>
    <text x="96" y="380" font-family="Inter, Helvetica, Arial, sans-serif" font-size="68" font-weight="700" letter-spacing="-2" fill="url(#grad)">${esc(t.title[1])}</text>
    <text x="96" y="450" font-family="Inter, Helvetica, Arial, sans-serif" font-size="28" fill="${C.muted}">${esc(t.sub)}</text>
    <text x="96" y="540" font-family="JetBrains Mono, Menlo, monospace" font-size="24" fill="${C.subtle}">nomudev.com</text>
  </svg>`;
  const mark = await sharp(MARK).resize(150, 150).toBuffer();
  await sharp(Buffer.from(svg)).composite([{ input: mark, left: 990, top: 400 }]).png({ compressionLevel: 9 }).toFile(`public/og/nomudev-${lang}.png`);
  console.log(`✔ public/og/nomudev-${lang}.png`);
}

const icon = async (size, out, pad) => {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(MARK).resize(inner, inner).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: C.canvas } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(out);
  console.log(`✔ ${out}`);
};
await icon(32, 'public/favicon-32.png', 0.04);
await icon(180, 'public/apple-touch-icon.png', 0.12);
