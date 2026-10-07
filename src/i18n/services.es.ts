// src/i18n/services.es.ts — Contenido de las páginas de servicio en español (SEO local: Valencia / España)
import type { ProjectCategory } from '../domain/models';

export interface ServicePageContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  // Respuesta directa (40–60 palabras): lo que extraen buscadores y asistentes de IA
  answer: string;
  benefits: { title: string; body: string }[];
  includes: string[];
  ideal: string[];
  faqs: { q: string; a: string }[];
}

export const servicesEs: Record<ProjectCategory, ServicePageContent> = {
  landing: {
    metaTitle: 'Desarrollo web y landing pages en Valencia | nomudev',
    metaDescription:
      'Desarrollo de webs corporativas y landing pages en Valencia que cargan en menos de un segundo, posicionan en Google y convierten visitas en clientes. Presupuesto cerrado.',
    h1: 'Desarrollo web y landing pages en Valencia',
    answer:
      'Desarrollo webs corporativas y landing pages a medida para empresas de Valencia y toda España, pensadas para convertir: carga en menos de un segundo, SEO técnico desde el primer día, una estructura que guía al visitante hacia el contacto y un CMS para que tu equipo edite sin depender de nadie.',
    benefits: [
      { title: 'Más contactos con el mismo tráfico', body: 'Cada sección responde a una objeción del cliente y le lleva a una única acción clara.' },
      { title: 'Visible en Google', body: 'SEO técnico, datos estructurados y Core Web Vitals en verde para competir en búsquedas locales.' },
      { title: 'Autonomía para tu equipo', body: 'Un CMS sencillo para cambiar textos, imágenes y páginas sin tocar código.' },
    ],
    includes: [
      'Estructura y copy orientados a conversión',
      'Diseño a medida, responsive y accesible',
      'SEO técnico, sitemap y datos estructurados',
      'Analítica de conversiones respetuosa con la privacidad',
      'CMS editable',
      'Despliegue, dominio y certificado HTTPS',
    ],
    ideal: [
      'Tu web actual es lenta, anticuada o no genera contactos.',
      'Vas a lanzar un producto o servicio y necesitas una landing que convierta.',
      'Quieres aparecer cuando buscan tu servicio en Valencia.',
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una página web profesional en Valencia?',
        a: 'Depende del número de páginas, del contenido y de las integraciones. Tras una llamada de diagnóstico gratuita te envío un presupuesto cerrado, sin costes por horas ni sorpresas al final.',
      },
      {
        q: '¿Cuánto se tarda en hacer una landing page?',
        a: 'Una landing suele estar publicada en pocas semanas, contando el copy, el diseño, el desarrollo y la configuración de analítica.',
      },
      {
        q: '¿La web estará optimizada para SEO?',
        a: 'Sí. Incluye SEO técnico desde el primer día: rendimiento, etiquetas, sitemap, datos estructurados y una estructura de contenido pensada para posicionar en búsquedas locales.',
      },
      {
        q: '¿Podré editar la web yo mismo?',
        a: 'Sí. Configuro un CMS sencillo para que tu equipo cambie textos, imágenes y páginas sin depender de un programador.',
      },
    ],
  },
  webapp: {
    metaTitle: 'Desarrollo de aplicaciones web a medida en Valencia | nomudev',
    metaDescription:
      'Desarrollo de aplicaciones web y SaaS a medida en Valencia con Next.js, Spring Boot y Google Cloud. Arquitectura limpia para lanzar rápido y escalar sin reescribir.',
    h1: 'Desarrollo de aplicaciones web a medida en Valencia',
    answer:
      'Desarrollo aplicaciones web, plataformas SaaS y MVPs a medida para empresas y startups de Valencia y toda España. Uso Next.js, Spring Boot, Python y Google Cloud sobre arquitectura hexagonal, para que el producto salga rápido, aguante el crecimiento y las nuevas funcionalidades lleguen en días, no en meses.',
    benefits: [
      { title: 'Lanza antes', body: 'Una primera versión útil en producción cuanto antes, con despliegue continuo desde el primer día.' },
      { title: 'Escala sin reescribir', body: 'Arquitectura limpia y tipada que soporta más usuarios y más funcionalidades sin empezar de cero.' },
      { title: 'Integra lo que ya usas', body: 'APIs, pasarelas de pago, servicios de terceros e inteligencia artificial conectados de forma segura.' },
    ],
    includes: [
      'Definición del producto y arquitectura técnica',
      'Frontend con Next.js y React',
      'APIs con Spring Boot o Python',
      'Infraestructura en Google Cloud y CI/CD',
      'Autenticación, roles y seguridad',
      'Integraciones con IA y servicios externos',
    ],
    ideal: [
      'Quieres lanzar un MVP o un SaaS que no haya que rehacer en un año.',
      'Tu aplicación actual se ha quedado lenta o es difícil de mantener.',
      'Necesitas un responsable técnico con experiencia de CTO.',
    ],
    faqs: [
      {
        q: '¿Qué tecnologías usas para desarrollar aplicaciones web?',
        a: 'Next.js y React en el frontend; Spring Boot o Python (FastAPI) en el backend; PostgreSQL, MySQL o Firestore como bases de datos; y Google Cloud para la infraestructura, con CI/CD automatizado.',
      },
      {
        q: '¿Puedes desarrollar el MVP de mi startup?',
        a: 'Sí. Defino contigo el alcance mínimo que valida el negocio y lo construyo sobre una arquitectura que pueda crecer, para no tener que reescribirlo cuando lleguen los usuarios.',
      },
      {
        q: '¿Puedes continuar o mejorar una aplicación que ya existe?',
        a: 'Sí. Analizo el código y la infraestructura actuales y propongo un plan de mejora incremental, sin parar el servicio ni reescribirlo todo de golpe.',
      },
      {
        q: '¿Te encargas también del mantenimiento?',
        a: 'Sí. Puedo encargarme del mantenimiento, la monitorización y la evolución de la aplicación una vez en producción.',
      },
    ],
  },
  desktop: {
    metaTitle: 'Desarrollo de aplicaciones de escritorio a medida | nomudev Valencia',
    metaDescription:
      'Desarrollo de aplicaciones de escritorio a medida para Windows y macOS: funcionan sin conexión, se integran con tu hardware y se sincronizan con la nube. Valencia y toda España.',
    h1: 'Desarrollo de aplicaciones de escritorio a medida',
    answer:
      'Desarrollo aplicaciones de escritorio a medida para Windows y macOS para empresas de Valencia y toda España: herramientas que funcionan sin conexión, se comunican con lectores, impresoras y otros dispositivos, manejan archivos locales y se sincronizan de forma segura con tu nube.',
    benefits: [
      { title: 'Funciona sin conexión', body: 'Tu equipo sigue trabajando aunque caiga internet; los datos se sincronizan al volver.' },
      { title: 'Habla con tu hardware', body: 'Integración con lectores de códigos, impresoras, básculas, sistemas de audio y archivos locales.' },
      { title: 'Siempre actualizada', body: 'Instaladores y actualizaciones automáticas sin que nadie tenga que intervenir.' },
    ],
    includes: [
      'Aplicación multiplataforma para Windows y macOS',
      'Modo sin conexión con sincronización',
      'Integración con dispositivos y archivos locales',
      'Backend en la nube y API segura',
      'Instaladores y actualizaciones automáticas',
      'Formación y soporte',
    ],
    ideal: [
      'Tu equipo trabaja en almacén, taller, estudio o planta de producción.',
      'Necesitas controlar dispositivos o archivos que el navegador no permite.',
      'Usas un programa antiguo de escritorio que hay que modernizar.',
    ],
    faqs: [
      {
        q: '¿Cuándo conviene una aplicación de escritorio en lugar de una web?',
        a: 'Cuando necesitas trabajar sin conexión, acceder a dispositivos o archivos del equipo, o mayor rendimiento en local. Si no, una aplicación web suele ser más sencilla de mantener; te ayudo a decidirlo.',
      },
      {
        q: '¿La aplicación funcionará en Windows y en Mac?',
        a: 'Sí. Desarrollo aplicaciones multiplataforma que funcionan en Windows y macOS con una sola base de código.',
      },
      {
        q: '¿Puede sincronizarse con un sistema en la nube?',
        a: 'Sí. La aplicación guarda los datos en local y los sincroniza de forma segura con tu backend en la nube cuando hay conexión.',
      },
      {
        q: '¿Puedes modernizar un programa de escritorio antiguo?',
        a: 'Sí. Analizo el sistema actual y lo migro por fases a una aplicación moderna, manteniendo los datos y sin parar el trabajo de tu equipo.',
      },
    ],
  },
  erp: {
    metaTitle: 'ERP a medida en Valencia: desarrollo y automatización | nomudev',
    metaDescription:
      'Desarrollo de ERPs y CRMs a medida en Valencia. Migración de sistemas antiguos sin parar la operativa, integraciones y automatización de procesos con Domain-Driven Design.',
    h1: 'ERP a medida y automatización de procesos en Valencia',
    answer:
      'Desarrollo ERPs y CRMs a medida para empresas de Valencia y toda España que han superado las hojas de cálculo o un sistema antiguo. Modelo cómo funciona de verdad tu empresa con Domain-Driven Design, migro los datos por fases sin parar la operativa y automatizo los procesos entre departamentos.',
    benefits: [
      { title: 'Menos trabajo manual', body: 'Los datos se introducen una vez y fluyen solos entre pedidos, stock, facturación e informes.' },
      { title: 'Migración sin parar', body: 'El sistema antiguo sigue funcionando mientras cada módulo nuevo se pone en marcha.' },
      { title: 'Hecho a tu medida', body: 'El software se adapta a tus procesos, no tus procesos a un ERP genérico.' },
    ],
    includes: [
      'Análisis de procesos y modelo de dominio (DDD)',
      'Módulos a medida: pedidos, stock, facturación, clientes…',
      'Migración de datos y de sistemas heredados por fases',
      'Integraciones con tu software actual y APIs',
      'Roles, permisos y flujos de aprobación',
      'Cuadros de mando e informes',
    ],
    ideal: [
      'Tu empresa funciona con hojas de cálculo que ya no escalan.',
      'Tienes un sistema antiguo que nadie se atreve a tocar.',
      'Un ERP estándar te obliga a cambiar cómo trabajas.',
    ],
    faqs: [
      {
        q: '¿Qué ventajas tiene un ERP a medida frente a uno estándar?',
        a: 'Se adapta a tus procesos reales, solo incluye lo que necesitas, no paga licencias por usuario y puede evolucionar contigo. Un ERP estándar es más rápido de implantar, pero te obliga a adaptarte a él.',
      },
      {
        q: '¿Puedes migrar los datos de mi sistema actual?',
        a: 'Sí. Migro los datos y los procesos por fases: cada módulo nuevo convive con el sistema antiguo hasta que está listo, sin interrumpir el trabajo diario.',
      },
      {
        q: '¿Se puede integrar con el software que ya uso?',
        a: 'Sí. Conecto el ERP con tu contabilidad, tienda online, CRM u otras herramientas mediante APIs e integraciones a medida.',
      },
      {
        q: '¿Cuánto se tarda en implantar un ERP a medida?',
        a: 'Se entrega por fases. El primer módulo útil llega pronto y el resto se construye sobre él, así obtienes valor desde el principio en lugar de esperar a un gran lanzamiento.',
      },
    ],
  },
};
