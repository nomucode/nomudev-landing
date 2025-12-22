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
                title: 'Backend & Core',
                items: [
                    { name: 'Java 21 (Spring Boot)', icon: 'coffee' },
                    { name: 'Python (FastAPI)', icon: 'snake' },
                    { name: 'C# (.NET)', icon: 'hash' },
                    { name: 'Kotlin', icon: 'code-2' },
                    { name: 'Node.js', icon: 'server' }
                ]
            },
            {
                id: 'architecture-frontend',
                title: 'Architecture & Frontend',
                items: [
                    { name: 'DDD / Hexagonal', icon: 'hexagon' },
                    { name: 'Microservices / REST', icon: 'network' },
                    { name: 'Next.js (SSR/ISR)', icon: 'layout-template' },
                    { name: 'React & TypeScript', icon: 'code' }
                ]
            },
            {
                id: 'cloud-devops',
                title: 'Cloud & DevOps (GCP)',
                items: [
                    { name: 'GCP (Run, Build, IAM)', icon: 'cloud' },
                    { name: 'Firebase & VPC', icon: 'flame' },
                    { name: 'Docker / Compose', icon: 'container' },
                    { name: 'Azure Pipelines / GHA', icon: 'webhook' }
                ]
            },
            {
                id: 'data-ai',
                title: 'Data & Persistence',
                items: [
                    { name: 'PostgreSQL / MySQL', icon: 'database' },
                    { name: 'MongoDB / Firestore', icon: 'server' }, // Using server as fallback for mongo/firestore if flame is taken or generic DB
                    { name: 'Vertex AI Integration', icon: 'brain-circuit' }
                ]
            }
        ];
    }
}
