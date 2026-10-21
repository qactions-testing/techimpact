import { Category } from '@/types';

// What QActions delivers per discipline. Wording taken from QActions' own
// briefs (Quality 2026, RPA + IA 2026). This is the original layer each case
// page adds on top of the vendor's figures: keep it factual.
export const QACTIONS_OFFER: Record<
  Category,
  { services: string[]; steps: { title: string; text: string }[] }
> = {
  'Software Testing': {
    services: [
      'Consultoría QA y fábrica de pruebas',
      'Automatización de pruebas con Tricentis (Tosca, NeoLoad, qTest)',
      'Testing SAP y Salesforce',
      'Pruebas técnicas y de performance',
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Relevamos sus procesos críticos, la cobertura actual y el costo de cada regresión manual.' },
      { title: 'Piloto medible', text: 'Automatizamos un flujo de negocio end-to-end y medimos tiempo, defectos y esfuerzo contra la línea base.' },
      { title: 'Escalado', text: 'Extendemos la automatización a su CI/CD junto a su equipo, con metodologías ágiles probadas.' },
    ],
  },
  Ciberseguridad: {
    services: [
      'Seguridad de aplicaciones con Veracode',
      'Gestión y priorización de vulnerabilidades',
      'Protección anti-bots y anti-fraude con hCaptcha',
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Analizamos un conjunto de aplicaciones y dimensionamos el riesgo real frente al ruido de alertas.' },
      { title: 'Piloto medible', text: 'Integramos el análisis en el pipeline de un equipo y medimos el tiempo de remediación.' },
      { title: 'Escalado', text: 'Llevamos la política de seguridad a todo el portafolio, con reportes listos para auditoría.' },
    ],
  },
  'RPA + IA': {
    services: [
      'Automatización Robótica de Procesos (RPA) + IA con Automation Anywhere',
      'Process Discovery y priorización de casos de uso',
      'IA generativa y agéntica aplicada a procesos',
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Identificamos las tareas repetitivas y los cuellos de botella con mayor retorno para automatizar.' },
      { title: 'Piloto medible', text: 'Ponemos en producción un primer bot y medimos horas liberadas y errores evitados.' },
      { title: 'Escalado', text: 'Armamos el centro de excelencia de automatización para crecer de forma gobernada.' },
    ],
  },
  'Data Management': {
    services: [
      'Test Data Management + IA con Synthesized',
      'Datos sintéticos y enmascarados para pruebas',
      'Descubrimiento de datos sensibles (PII)',
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Mapeamos de dónde salen hoy sus datos de prueba y qué riesgo de exposición tienen.' },
      { title: 'Piloto medible', text: 'Generamos datos sintéticos para un sistema y medimos el tiempo de aprovisionamiento.' },
      { title: 'Escalado', text: 'Automatizamos la entrega de datos de prueba en todos los entornos.' },
    ],
  },
};

export const QACTIONS_FACTS = [
  { value: '+15', label: 'años en software testing y RPA + IA' },
  { value: '+7', label: 'países con proyectos' },
  { value: '2020 · 2022', label: 'Tricentis Best Partner LATAM' },
];
