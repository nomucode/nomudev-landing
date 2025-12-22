// src/domain/models.ts

export interface TechStackItem {
    name: string;
    icon: string; // We'll use the icon name from Lucide
}

export interface TechStackCategory {
    id: string;
    title: string;
    items: TechStackItem[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    image?: string;
    link?: string;
    stats?: { label: string; value: string }[]; // e.g., "Code Reduced": "50%"
}
