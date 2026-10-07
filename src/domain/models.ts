// src/domain/models.ts

export type ProjectCategory = 'landing' | 'webapp' | 'desktop' | 'erp';

export interface ProjectCategoryInfo {
    id: ProjectCategory;
    label: string;        // Título del servicio / sección de portafolio
    shortLabel: string;   // Texto de la pill de navegación
    icon: 'globe' | 'app-window' | 'monitor' | 'layers';
    color: string;        // Token CSS de la categoría, p. ej. 'var(--color-cat-landing)'
    pain: string;         // El problema, en palabras del cliente
    headline: string;     // El resultado que compra
    body: string;         // Cómo lo resuelvo
    tags: string[];       // Prueba técnica
    slug: string;         // Ruta de la página del servicio (sin idioma)
    href: string;         // Ruta localizada de la página del servicio
}

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    description: string;
    techStack: string[];
    image?: string;
    link?: string;
    stats?: { label: string; value: string }[]; // e.g., "Code Reduced": "50%"
}
