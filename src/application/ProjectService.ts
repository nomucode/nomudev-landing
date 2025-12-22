// src/application/ProjectService.ts
import type { Project, TechStackCategory } from '../domain/models';

export class ProjectService {
    static getFeaturedProjects(): Project[] {
        return [
            {
                id: 'music-erp',
                title: 'Music Industry ERP Ecosystem',
                description: 'Refactored a legacy monolith to Hexagonal Architecture using Next.js & DDD (reduced code by 50%). Orchestrated full GCP ecosystem and automated CI/CD workflows.',
                techStack: ['Legacy Migration', 'Cloud Architecture'],
                stats: [{ label: 'Code Reduction', value: '50%' }]
            },
            {
                id: 'ai-bi',
                title: 'AI-Driven Music Intelligence',
                description: 'Java Spring Boot API integrating Google Vertex AI for predictive trends. Implemented high-performance hybrid data sync between MySQL and Firestore for real-time UX.',
                techStack: ['Microservices', 'Vertex AI'],
                stats: [{ label: 'Sync Latency', value: '<50ms' }]
            },
            {
                id: 'algo-matching',
                title: 'Match-Booker Algorithm',
                description: 'Developed a Tinder-style matching algorithm service using Python FastAPI to connect venues and artists, with automated serverless reporting.',
                techStack: ['Algorithmic Backend', 'Python'],
                stats: [{ label: 'Matching Efficiency', value: '3x' }]
            },
            {
                id: 'musicadders',
                title: 'Musicadders Distribution Platform',
                description: 'Built a scalable digital distribution platform with Next.js. Engineered a "One-Click Migration" feature processing massive Spotify catalogs instantly.',
                techStack: ['High-Traffic Frontend', 'API Integration'],
                stats: [{ label: 'Catalog Processed', value: 'Instant' }]
            }
        ];
    }

    static getTechStack(): TechStackCategory[] {
        return [
            {
                id: 'backend',
                title: 'Backend Engineering',
                items: [
                    { name: 'Java (Spring Boot)', icon: 'coffee' },
                    { name: 'Python (FastAPI)', icon: 'snake' },
                    { name: 'Kotlin', icon: 'code-2' },
                    { name: 'Node.js (NestJS)', icon: 'server' },
                    { name: 'C# (.NET Core)', icon: 'hash' }
                ]
            },
            {
                id: 'devops',
                title: 'DevOps & Cloud',
                items: [
                    { name: 'GCP (Cloud Run/GKE)', icon: 'cloud' },
                    { name: 'Docker & K8s', icon: 'container' },
                    { name: 'Terraform (IaC)', icon: 'ship' },
                    { name: 'CI/CD (Azure/GHA)', icon: 'webhook' }
                ]
            },
            {
                id: 'database',
                title: 'Database & Data',
                items: [
                    { name: 'PostgreSQL', icon: 'database' },
                    { name: 'Firestore / NoSQL', icon: 'flame' },
                    { name: 'Redis (Caching)', icon: 'zap' },
                    { name: 'BigQuery', icon: 'database' }
                ]
            },
            {
                id: 'other',
                title: 'Other Technologies',
                items: [
                    { name: 'Next.js & React', icon: 'layout-template' },
                    { name: 'TypeScript', icon: 'code-2' },
                    { name: 'Hexagonal Arch / DDD', icon: 'hexagon' },
                    { name: 'Kafka / Event-Driven', icon: 'brain-circuit' }
                ]
            }
        ];
    }
}
