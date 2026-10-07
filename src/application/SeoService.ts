// src/application/SeoService.ts
// Datos estructurados (schema.org JSON-LD) para SEO local y AEO.
import type { ProjectCategoryInfo } from '../domain/models';
import type { Lang, ServicePageContent } from '../i18n';
import { LOCALE_META, useTranslations } from '../i18n';
import { LINKEDIN_URL, PROFILE, SITE } from './ProfileService';

type JsonLd = Record<string, unknown>;

const ids = {
  person: `${SITE.url}/#person`,
  business: `${SITE.url}/#business`,
  website: `${SITE.url}/#website`,
};

const absolute = (path: string) => new URL(path, SITE.url).href;

const areaServed = [
  { '@type': 'City', name: 'Valencia' },
  { '@type': 'AdministrativeArea', name: SITE.region },
  { '@type': 'Country', name: 'España' },
];

export class SeoService {
  static person(lang: Lang, imageUrl: string): JsonLd {
    return {
      '@type': 'Person',
      '@id': ids.person,
      name: PROFILE.name,
      jobTitle: PROFILE.jobTitle[lang],
      url: absolute(lang === 'es' ? '/' : '/en/'),
      image: imageUrl,
      address: { '@type': 'PostalAddress', addressLocality: SITE.locality, addressRegion: SITE.region, addressCountry: SITE.country },
      sameAs: [LINKEDIN_URL],
      knowsAbout: PROFILE.knowsAbout,
      knowsLanguage: ['es', 'en', 'ca'],
      hasCredential: { '@type': 'EducationalOccupationalCredential', name: PROFILE.certification },
    };
  }

  static business(lang: Lang, categories: ProjectCategoryInfo[], imageUrl: string, logoUrl: string): JsonLd {
    const t = useTranslations(lang);
    return {
      '@type': 'ProfessionalService',
      '@id': ids.business,
      name: SITE.brand,
      url: absolute('/'),
      description: t.meta.homeDescription,
      image: imageUrl,
      logo: logoUrl,
      founder: { '@id': ids.person },
      address: { '@type': 'PostalAddress', addressLocality: SITE.locality, addressRegion: SITE.region, addressCountry: SITE.country },
      geo: { '@type': 'GeoCoordinates', ...SITE.geo },
      areaServed,
      sameAs: [LINKEDIN_URL],
      knowsLanguage: ['es', 'en'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: t.services.title,
        itemListElement: categories.map((category) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: category.label, url: absolute(category.href) },
        })),
      },
    };
  }

  static website(lang: Lang): JsonLd {
    return {
      '@type': 'WebSite',
      '@id': ids.website,
      url: absolute('/'),
      name: SITE.brand,
      inLanguage: LOCALE_META[lang].htmlLang,
      publisher: { '@id': ids.business },
    };
  }

  static faq(items: { q: string; a: string }[]): JsonLd {
    return {
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };
  }

  static service(lang: Lang, category: ProjectCategoryInfo, content: ServicePageContent): JsonLd {
    return {
      '@type': 'Service',
      '@id': `${absolute(category.href)}#service`,
      name: content.h1,
      serviceType: category.label,
      description: content.answer,
      url: absolute(category.href),
      inLanguage: LOCALE_META[lang].htmlLang,
      provider: { '@id': ids.business },
      areaServed,
    };
  }

  static breadcrumb(items: { name: string; path: string }[]): JsonLd {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: absolute(item.path) })),
    };
  }

  // Un único bloque JSON-LD con @graph para toda la página
  static graph(nodes: JsonLd[]): string {
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
  }
}
