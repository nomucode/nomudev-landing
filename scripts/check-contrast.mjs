#!/usr/bin/env node
// Nomu DS · Verificación de contraste WCAG 2.1 AA
// Resuelve los tokens semánticos de src/styles/theme.css hasta su hex primitivo
// y comprueba cada par texto/fondo declarado. Falla si alguno baja de 4.5:1.

import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/theme.css', import.meta.url), 'utf8');

const vars = new Map();
for (const [, name, value] of css.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
  if (!vars.has(name)) vars.set(name, value.trim());
}

function resolve(name, depth = 0) {
  const value = vars.get(name);
  if (!value || depth > 10) throw new Error(`Token no encontrado: ${name}`);
  const ref = value.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(ref[1], depth + 1) : value;
}

function luminance(hex) {
  const [r, g, b] = hex.replace('#', '').match(/../g).map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const BACKGROUNDS = ['canvas', 'surface', 'raised', 'overlay'];
const FOREGROUNDS = ['fg', 'fg-body', 'fg-muted', 'fg-subtle', 'primary', 'success', 'danger', 'cat-landing', 'cat-webapp', 'cat-desktop', 'cat-erp'];
const EXTRA_PAIRS = [['canvas', 'primary'], ['canvas', 'primary-hover']]; // texto del botón primario

const pairs = [
  ...FOREGROUNDS.flatMap((fg) => BACKGROUNDS.map((bg) => [fg, bg])),
  ...EXTRA_PAIRS,
];

const AA = 4.5;
let failures = 0;

for (const [fg, bg] of pairs) {
  const ratio = contrast(resolve(`--color-${fg}`), resolve(`--color-${bg}`));
  const ok = ratio >= AA;
  if (!ok) failures++;
  if (!ok || process.argv.includes('--verbose')) {
    console.log(`${ok ? '✔' : '✖'} ${fg.padEnd(13)} on ${bg.padEnd(8)} ${ratio.toFixed(2)}:1`);
  }
}

if (failures) {
  console.error(`\n✖ check:contrast — ${failures} pares por debajo de AA (${AA}:1)`);
  process.exit(1);
}

console.log(`✔ check:contrast — ${pairs.length} pares cumplen AA`);
