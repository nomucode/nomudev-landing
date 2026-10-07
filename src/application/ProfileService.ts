// src/application/ProfileService.ts
// Datos estructurales del perfil de Noel (fuente: CV, sección 1.0 de CLAUDE.md). El copy localizado vive en src/i18n.
import type { Lang } from '../i18n';

// Único canal de contacto público (decisión de Noel: sin email, teléfono ni agenda)
export const LINKEDIN_URL = 'https://www.linkedin.com/in/nomudev/';

export const SITE = {
  url: 'https://nomudev.com',
  brand: 'nomudev',
  // Zona de servicio para SEO local (sin dirección postal pública)
  locality: 'Valencia',
  region: 'Comunitat Valenciana',
  regionCode: 'ES-VC',
  country: 'ES',
  geo: { latitude: 39.4699, longitude: -0.3763 },
  areaServed: ['Valencia', 'Comunitat Valenciana', 'España'],
};

// [[PENDIENTE de validar por Noel]]: plazas, trimestre, tiempo de respuesta y condiciones de la llamada
export const AVAILABILITY = {
  slots: 2,
  period: { es: 'T1 2027', en: 'Q1 2027' } satisfies Record<Lang, string>,
  responseTime: { es: '24 horas', en: '24 hours' } satisfies Record<Lang, string>,
  responseTimeShort: '24 h',
};

export const PROFILE = {
  name: 'Noel Muñoz',
  jobTitle: { es: 'Ingeniero de software full-stack y CTO', en: 'Full-stack software engineer and CTO' } satisfies Record<Lang, string>,
  stack: ['Next.js', 'React', 'TypeScript', 'Spring Boot', 'Python', 'Google Cloud', 'Docker', 'CI/CD', 'Vertex AI'],
  knowsAbout: ['Domain-Driven Design', 'Hexagonal architecture', 'Next.js', 'Spring Boot', 'Python', 'Google Cloud', 'ERP development', 'Legacy migration'],
  // [[PENDIENTE]]: nivel de la certificación Dante (Level 1, 2 o 3) y año
  certification: 'Dante Certified',
  proof: ['-50%', '<50ms'],
  timeline: [
    { year: '2025', company: 'UNNE' },
    { year: '2025', company: 'Huming Music' },
    { year: '2024', company: 'Infinity Apps' },
    { year: 'DAM', company: 'I.E.S. Abastos' },
  ],
};
