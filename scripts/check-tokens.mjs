#!/usr/bin/env node
// Nomu DS · Guardián de tokens
// Falla si un componente usa colores o tamaños fuera del sistema (hex, rgb/hsl,
// paleta por defecto de Tailwind o valores arbitrarios de color/tamaño).
// Los tokens viven solo en src/styles/theme.css.
// Para una excepción justificada, añade el comentario `tokens-ignore` en la misma línea.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const EXTENSIONS = ['.astro', '.tsx', '.ts', '.css'];
const IGNORED_FILES = ['src/styles/theme.css'];

// Componentes heredados pendientes de reconstruir con el sistema (iteración 4 del plan).
// Se informan como aviso, sin bloquear. Esta lista solo puede encogerse.
const LEGACY_FILES = [
  'src/infrastructure/ui/molecules/TVModal.astro',
  'src/infrastructure/ui/molecules/CyberRainTransition.tsx',
];

const PALETTE = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const UTILITIES = 'text|bg|border|from|via|to|ring|outline|fill|stroke|shadow|decoration|caret|accent|divide|placeholder';

const RULES = [
  { name: 'hex color', re: /(?<![\w&%-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/ },
  { name: 'rgb()/hsl()', re: /\b(?:rgba?|hsla?)\(/ },
  { name: 'Tailwind palette color', re: new RegExp(`\\b(?:${UTILITIES})-(?:${PALETTE})-\\d{2,3}\\b`) },
  { name: 'raw black/white', re: new RegExp(`\\b(?:${UTILITIES})-(?:black|white)\\b`) },
  { name: 'arbitrary color/size value', re: new RegExp(`\\b(?:${UTILITIES})-\\[(?:#|rgb|hsl|\\d)`) },
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const errors = [];
const warnings = new Map();

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  if (!EXTENSIONS.some((ext) => file.endsWith(ext)) || IGNORED_FILES.includes(rel)) continue;

  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (line.includes('tokens-ignore')) return;
    for (const rule of RULES) {
      const match = line.match(rule.re);
      if (!match) continue;
      if (LEGACY_FILES.includes(rel)) {
        warnings.set(rel, (warnings.get(rel) ?? 0) + 1);
      } else {
        errors.push(`${rel}:${i + 1}  ${rule.name}: "${match[0]}"`);
      }
    }
  });
}

for (const [file, count] of warnings) {
  console.warn(`⚠ legacy  ${file} (${count} valores fuera del sistema)`);
}

if (errors.length) {
  console.error(`\n✖ ${errors.length} valores fuera del design system:\n`);
  errors.forEach((e) => console.error(`  ${e}`));
  console.error('\nUsa un token de src/styles/theme.css (o añade `tokens-ignore` si es una excepción justificada).');
  process.exit(1);
}

console.log('✔ lint:tokens — sin valores fuera del design system');
