// src/i18n/config.ts
// Idiomas del sitio: español (principal, sin prefijo) e inglés (/en/).

export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

export const LOCALE_META: Record<Lang, { htmlLang: string; ogLocale: string; label: string }> = {
  es: { htmlLang: 'es-ES', ogLocale: 'es_ES', label: 'Español' },
  en: { htmlLang: 'en', ogLocale: 'en_US', label: 'English' },
};

export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale === 'en' ? 'en' : 'es';
}

// Prefija una ruta interna según el idioma. Las rutas siempre terminan en "/" (trailingSlash: 'always').
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === DEFAULT_LANG ? clean : `/en${clean === '/' ? '/' : clean}`;
}
