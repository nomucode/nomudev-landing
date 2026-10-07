// src/i18n/services.en.ts — Service page content in English (served under /en/)
import type { ProjectCategory } from '../domain/models';
import type { ServicePageContent } from './services.es';

export const servicesEn: Record<ProjectCategory, ServicePageContent> = {
  landing: {
    metaTitle: 'Website & Landing Page Development in Valencia, Spain | nomudev',
    metaDescription:
      'Custom websites and landing pages that load in under a second, rank on Google and turn visitors into clients. Built in Valencia, Spain, with fixed-price proposals.',
    h1: 'Website and landing page development',
    answer:
      'I build custom websites and landing pages for companies in Spain and abroad, designed to convert: sub-second load times, technical SEO from day one, a structure that guides visitors to get in touch, and a CMS your team can edit without depending on anyone.',
    benefits: [
      { title: 'More leads from the same traffic', body: 'Every section answers a client objection and leads to one clear action.' },
      { title: 'Found on Google', body: 'Technical SEO, structured data and green Core Web Vitals to compete in search.' },
      { title: 'Independence for your team', body: 'A simple CMS to change copy, images and pages without touching code.' },
    ],
    includes: [
      'Conversion-led structure and copy',
      'Custom, responsive and accessible design',
      'Technical SEO, sitemap and structured data',
      'Privacy-friendly conversion analytics',
      'Editable CMS',
      'Deployment, domain and HTTPS',
    ],
    ideal: [
      'Your current site is slow, dated or not generating leads.',
      "You're launching a product or service and need a landing page that converts.",
      'You want to show up when people search for your service.',
    ],
    faqs: [
      {
        q: 'How much does a professional website cost?',
        a: 'It depends on the number of pages, content and integrations. After a free discovery call I send a fixed-price proposal — no hourly billing, no surprises at the end.',
      },
      {
        q: 'How long does a landing page take?',
        a: 'A landing page is usually live within a few weeks, including copy, design, development and analytics setup.',
      },
      {
        q: 'Will the website be SEO-optimised?',
        a: 'Yes. Technical SEO is included from day one: performance, metadata, sitemap, structured data and a content structure designed to rank.',
      },
      {
        q: 'Can I edit the website myself?',
        a: 'Yes. I set up a simple CMS so your team can change copy, images and pages without a developer.',
      },
    ],
  },
  webapp: {
    metaTitle: 'Custom Web App Development | nomudev — Valencia, Spain',
    metaDescription:
      'Custom web apps, SaaS platforms and MVPs built with Next.js, Spring Boot and Google Cloud. Clean architecture to launch fast and scale without rewrites.',
    h1: 'Custom web app development',
    answer:
      'I build custom web apps, SaaS platforms and MVPs for companies and startups. I use Next.js, Spring Boot, Python and Google Cloud on hexagonal architecture, so the product ships fast, handles growth, and new features land in days rather than months.',
    benefits: [
      { title: 'Launch sooner', body: 'A first useful version in production early, with continuous deployment from day one.' },
      { title: 'Scale without rewrites', body: 'Clean, typed architecture that supports more users and features without starting over.' },
      { title: 'Integrate what you already use', body: 'APIs, payment gateways, third-party services and AI, connected securely.' },
    ],
    includes: [
      'Product definition and technical architecture',
      'Next.js and React frontend',
      'Spring Boot or Python APIs',
      'Google Cloud infrastructure and CI/CD',
      'Authentication, roles and security',
      'AI and third-party integrations',
    ],
    ideal: [
      "You want to launch an MVP or SaaS that won't need rebuilding in a year.",
      'Your current app has become slow or hard to maintain.',
      'You need a technical lead with CTO experience.',
    ],
    faqs: [
      {
        q: 'Which technologies do you use for web apps?',
        a: 'Next.js and React on the frontend; Spring Boot or Python (FastAPI) on the backend; PostgreSQL, MySQL or Firestore for data; and Google Cloud for infrastructure, with automated CI/CD.',
      },
      {
        q: 'Can you build my startup’s MVP?',
        a: 'Yes. We define the minimum scope that validates the business and I build it on an architecture that can grow, so it doesn’t need rewriting when users arrive.',
      },
      {
        q: 'Can you take over or improve an existing app?',
        a: 'Yes. I review the current code and infrastructure and propose an incremental improvement plan, without downtime or a big-bang rewrite.',
      },
      {
        q: 'Do you also handle maintenance?',
        a: 'Yes. I can take care of maintenance, monitoring and ongoing development once the app is in production.',
      },
    ],
  },
  desktop: {
    metaTitle: 'Custom Desktop App Development | nomudev — Valencia, Spain',
    metaDescription:
      'Custom desktop apps for Windows and macOS that work offline, integrate with your hardware and sync with the cloud.',
    h1: 'Custom desktop app development',
    answer:
      'I build custom desktop apps for Windows and macOS: tools that work offline, talk to scanners, printers and other devices, handle local files, and sync securely with your cloud backend.',
    benefits: [
      { title: 'Works offline', body: 'Your team keeps working when the connection drops; data syncs when it returns.' },
      { title: 'Talks to your hardware', body: 'Integration with barcode scanners, printers, scales, audio systems and local files.' },
      { title: 'Always up to date', body: 'Installers and automatic updates with no manual intervention.' },
    ],
    includes: [
      'Cross-platform app for Windows and macOS',
      'Offline mode with sync',
      'Device and local file integration',
      'Cloud backend and secure API',
      'Installers and automatic updates',
      'Training and support',
    ],
    ideal: [
      'Your team works in a warehouse, workshop, studio or production floor.',
      "You need to control devices or files the browser can't reach.",
      'You rely on an old desktop program that needs modernising.',
    ],
    faqs: [
      {
        q: 'When is a desktop app better than a web app?',
        a: 'When you need to work offline, access devices or local files, or get more local performance. Otherwise a web app is usually simpler to maintain — I’ll help you decide.',
      },
      {
        q: 'Will the app run on Windows and Mac?',
        a: 'Yes. I build cross-platform apps that run on Windows and macOS from a single codebase.',
      },
      {
        q: 'Can it sync with a cloud system?',
        a: 'Yes. The app stores data locally and syncs it securely with your cloud backend whenever there’s a connection.',
      },
      {
        q: 'Can you modernise an old desktop program?',
        a: 'Yes. I review the current system and migrate it in phases to a modern app, keeping your data and without stopping your team’s work.',
      },
    ],
  },
  erp: {
    metaTitle: 'Custom ERP Development & Process Automation | nomudev — Valencia, Spain',
    metaDescription:
      'Custom ERPs and CRMs, legacy system migration without downtime, integrations and process automation with Domain-Driven Design.',
    h1: 'Custom ERP development and process automation',
    answer:
      'I build custom ERPs and CRMs for companies that have outgrown spreadsheets or a legacy system. I model how your business really works with Domain-Driven Design, migrate data in phases without stopping operations, and automate the processes between departments.',
    benefits: [
      { title: 'Less manual work', body: 'Data is entered once and flows on its own between orders, stock, invoicing and reports.' },
      { title: 'Migration without downtime', body: 'The old system keeps running while each new module goes live.' },
      { title: 'Built around you', body: 'The software adapts to your processes, not your processes to a generic ERP.' },
    ],
    includes: [
      'Process analysis and domain model (DDD)',
      'Custom modules: orders, stock, invoicing, customers…',
      'Phased data and legacy system migration',
      'Integrations with your current software and APIs',
      'Roles, permissions and approval workflows',
      'Dashboards and reports',
    ],
    ideal: [
      'Your company runs on spreadsheets that no longer scale.',
      'You have a legacy system nobody dares to touch.',
      'An off-the-shelf ERP forces you to change how you work.',
    ],
    faqs: [
      {
        q: 'What are the advantages of a custom ERP over an off-the-shelf one?',
        a: 'It fits your real processes, includes only what you need, has no per-user licences and evolves with you. An off-the-shelf ERP is faster to deploy but forces you to adapt to it.',
      },
      {
        q: 'Can you migrate data from my current system?',
        a: 'Yes. I migrate data and processes in phases: each new module runs alongside the old system until it’s ready, without interrupting daily work.',
      },
      {
        q: 'Can it integrate with the software I already use?',
        a: 'Yes. I connect the ERP to your accounting, online store, CRM or other tools through APIs and custom integrations.',
      },
      {
        q: 'How long does a custom ERP take to implement?',
        a: 'It ships in phases. The first useful module arrives early and the rest builds on it, so you get value from the start instead of waiting for a big launch.',
      },
    ],
  },
};
