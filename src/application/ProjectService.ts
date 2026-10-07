// src/application/ProjectService.ts
// Datos estructurales de servicios y proyectos; el copy localizado vive en src/i18n.
import type { Project, ProjectCategory, ProjectCategoryInfo } from '../domain/models';
import { localizePath, useTranslations, type Lang } from '../i18n';

const CATEGORIES: Pick<ProjectCategoryInfo, 'id' | 'icon' | 'color'>[] = [
  { id: 'landing', icon: 'globe', color: 'var(--color-cat-landing)' },
  { id: 'webapp', icon: 'app-window', color: 'var(--color-cat-webapp)' },
  { id: 'desktop', icon: 'monitor', color: 'var(--color-cat-desktop)' },
  { id: 'erp', icon: 'layers', color: 'var(--color-cat-erp)' },
];

const PROJECTS: { id: keyof ReturnType<typeof useTranslations>['projects']; category: ProjectCategory; statValue: string }[] = [
  { id: 'music-erp', category: 'erp', statValue: '50%' },
  { id: 'ai-bi', category: 'webapp', statValue: '<50ms' },
  { id: 'algo-matching', category: 'webapp', statValue: '3x' },
  { id: 'musicadders', category: 'webapp', statValue: 'Instant' },
];

export class ProjectService {
  // Servicios y categorías del portafolio, en orden de aparición
  static getCategories(lang: Lang): ProjectCategoryInfo[] {
    const t = useTranslations(lang).services.items;
    return CATEGORIES.map((category) => ({ ...category, ...t[category.id], href: localizePath(`/${t[category.id].slug}/`, lang) }));
  }

  static getCategory(lang: Lang, id: ProjectCategory): ProjectCategoryInfo {
    return this.getCategories(lang).find((category) => category.id === id)!;
  }

  static getProjects(lang: Lang): Project[] {
    const t = useTranslations(lang).projects;
    return PROJECTS.map(({ id, category, statValue }) => ({
      id,
      category,
      title: t[id].title,
      description: t[id].description,
      techStack: t[id].tags,
      stats: [{ label: t[id].statLabel, value: lang === 'es' && statValue === 'Instant' ? 'Al instante' : statValue }],
    }));
  }

  static getProjectsByCategory(lang: Lang, category: ProjectCategory): Project[] {
    return this.getProjects(lang).filter((project) => project.category === category);
  }
}
