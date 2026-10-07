// src/i18n/index.ts — Acceso al copy según el idioma
import { es } from './es';
import { en } from './en';
import { servicesEs } from './services.es';
import { servicesEn } from './services.en';
import type { Lang } from './config';

export * from './config';
export type { Dict } from './es';
export type { ServicePageContent } from './services.es';

const dictionaries = { es, en };
const servicePages = { es: servicesEs, en: servicesEn };

export function useTranslations(lang: Lang) {
  return dictionaries[lang];
}

export function useServicePages(lang: Lang) {
  return servicePages[lang];
}
