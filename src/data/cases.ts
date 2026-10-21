import { CaseStudy } from '../types';

// Every figure below is quoted from the linked official source. Cases whose
// client is not named by the vendor are flagged `anonymized`.
// QActions' own cases (vendor: 'qactions') have no third-party source: they
// used to cite the WordPress page this app replaces. The UI labels them as
// QActions' own and offers the reference on request.

export const CASE_STUDIES: CaseStudy[] = [
  // ───────────────────────────── QActions ─────────────────────────────
  {
    id: 'qactions-petrosea-sap',
    vendor: 'qactions',
    technology: 'tricentis',
    category: 'Software Testing',
    client: 'Petrosea',
    industry: 'Petróleo y Gas',
    title: 'Migración SAP S/4HANA sin retrasos',
    summary:
      'QActions automatizó el QA de una migración crítica a SAP S/4HANA con Tricentis Tosca y NeoLoad, validando los procesos end-to-end.',
    heroKpi: { value: '66%', label: 'menos tiempo de migración (de 3 años a 1)' },
    kpis: [
      { value: '0', label: 'retrasos en el Go-Live' },
      { value: '3 → 1', label: 'años de proyecto' },
    ],
    painPoints: [
      'Migración crítica a SAP S/4HANA con alta complejidad operativa.',
      'Riesgo de fallas en procesos de negocio durante la migración.',
    ],
    benefits: [
      'Validación end-to-end de procesos con Tricentis Tosca.',
      'Pruebas de performance con Tricentis NeoLoad.',
      'Go-Live en fecha y tiempo de migración reducido en dos tercios.',
    ],
    products: ['Tricentis Tosca', 'Tricentis NeoLoad', 'SAP S/4HANA'],
    sources: [],
    featured: true,
  },
  {
    id: 'qactions-vale-process-discovery',
    vendor: 'qactions',
    technology: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Vale',
    industry: 'Minería',
    title: 'Hiperautomatización minera con IA generativa',
    summary:
      'Process Discovery con IA generativa de Automation Anywhere analizó la operación de Vale y detectó cuellos de botella para automatizar.',
    heroKpi: { value: 'USD 5M', label: 'de ahorro anual en costos operativos' },
    kpis: [
      { value: '121K', label: 'horas liberadas' },
      { value: '370.000', label: 'acciones operativas analizadas' },
    ],
    painPoints: [
      'Cuellos de botella ocultos en un gran volumen de actividad operativa.',
      'Dificultad para priorizar qué procesos automatizar.',
    ],
    benefits: [
      'Process Discovery analizó 370.000 acciones operativas.',
      'Detección rápida de cuellos de botella con IA generativa.',
      'Hiperautomatización con RPA + IA que liberó 121K horas.',
    ],
    products: ['Automation Anywhere Process Discovery', 'IA generativa', 'RPA'],
    sources: [],
    featured: true,
  },
  {
    id: 'qactions-fintech-veracode-risk-manager',
    vendor: 'qactions',
    technology: 'veracode',
    category: 'Ciberseguridad',
    client: 'Firma financiera norteamericana',
    anonymized: true,
    industry: 'Fintech',
    title: 'De 600.000 alertas a los riesgos que importan',
    summary:
      'Veracode Risk Manager centralizó la gestión de seguridad del software y priorizó automáticamente los riesgos reales.',
    heroKpi: { value: '100:1', label: 'reducción del ruido operativo' },
    kpis: [
      { value: '600K → 6K', label: 'CVEs filtradas a issues prioritarios' },
      { value: '6.000', label: 'riesgos críticos evaluados automáticamente' },
    ],
    painPoints: [
      'Miles de alertas de seguridad (CVEs) sin poder distinguir los riesgos reales.',
      'Datos dispersos entre Qualys, Prisma y Defender, sin una vista unificada.',
      'Demoras, confusión y mayor exposición por falta de priorización.',
    ],
    benefits: [
      'Una única fuente de verdad del riesgo con Veracode Risk Manager.',
      'Priorización con inteligencia externa (EPSS, catálogo CISA KEV).',
      'Segmentación por equipo de aplicación y tickets sincronizados automáticamente.',
    ],
    products: ['Veracode Risk Manager'],
    sources: [
      {
        label: 'Veracode · Case study',
        url: 'https://www.veracode.com/resources/case-studies/veracode-risk-manager-case-study-reduce-vulnerabilities/',
      },
    ],
    featured: true,
  },
  {
    id: 'qactions-universidad-synthesized',
    vendor: 'qactions',
    technology: 'synthesized',
    category: 'Data Management',
    client: 'Universidad (sector público)',
    anonymized: true,
    industry: 'Educación',
    title: 'Datos de prueba con IA, en minutos',
    summary:
      'Test Data Management con IA de Synthesized: datos sintéticos y enmascaramiento automático para ciclos de desarrollo ágiles y seguros.',
    heroKpi: { value: '70%', label: 'menos costos en el ciclo de testing' },
    kpis: [{ value: 'Minutos', label: 'para provisionar datos (antes: meses)' }],
    painPoints: [
      'Proteger información sensible en los entornos de prueba.',
      'Cumplir regulaciones de privacidad de datos.',
      'Provisión de datos de prueba que tardaba meses.',
    ],
    benefits: [
      'Datos sintéticos generados con IA.',
      'Enmascaramiento automático de datos sensibles.',
      'Ciclos de desarrollo ágiles y seguros.',
    ],
    products: ['Synthesized'],
    sources: [],
  },
  {
    id: 'qactions-banco-argentina',
    vendor: 'qactions',
    category: 'Software Testing',
    client: 'Banco líder de Argentina',
    anonymized: true,
    industry: 'Banca',
    country: 'Argentina',
    title: 'De área de QA a fábrica de testing continuo',
    summary:
      'Consultoría estratégica de QA: assessment de madurez a nivel C-level y transformación de la calidad en una fábrica de testing continuo.',
    heroKpi: { value: '40%', label: 'mejor detección temprana de defectos' },
    kpis: [{ value: 'On-demand', label: 'área técnica escalable' }],
    painPoints: [
      'Estructura de calidad que necesitaba evaluarse y mejorarse.',
      'Calidad no alineada con los objetivos del negocio.',
    ],
    benefits: [
      'Assessment de madurez de QA a nivel C-level.',
      'Fábrica de testing continuo alineada al negocio.',
      'Capacidad técnica que escala según demanda.',
    ],
    products: ['Consultoría QA', 'Testing Factory'],
    sources: [],
  },
  {
    id: 'qactions-aseguradora-core',
    vendor: 'qactions',
    category: 'RPA + IA',
    client: 'Aseguradora en expansión',
    anonymized: true,
    industry: 'Seguros',
    title: 'Modernización del core asegurador',
    summary:
      'Migración del core y gestión de calidad automatizada con RPA, protegiendo la integridad de los datos de los asegurados.',
    heroKpi: { value: '40 h', label: 'ahorradas por cada lanzamiento' },
    kpis: [{ value: '0', label: 'impacto en el usuario final durante la migración' }],
    painPoints: [
      'Procesos manuales que no escalaban con el crecimiento.',
      'Necesidad de proteger la integridad de los datos de asegurados.',
      'Migración del core de negocio con riesgo operativo.',
    ],
    benefits: [
      'Gestión de calidad automatizada.',
      'Automatización de procesos con RPA.',
      'Migración del core sin impacto en el usuario final.',
    ],
    products: ['RPA', 'Automatización de pruebas'],
    sources: [],
  },
  {
    id: 'qactions-hipermercados-coe',
    vendor: 'qactions',
    category: 'Software Testing',
    client: 'Cadena de hipermercados',
    anonymized: true,
    industry: 'Retail',
    title: 'Centro de excelencia de QA para retail',
    summary:
      'QActions armó y capacitó el equipo de calidad e integró la Testing Factory para estandarizar la validación de software a escala.',
    heroKpi: { value: '80%', label: 'de reutilización de escenarios de prueba' },
    kpis: [{ value: '< 1 año', label: 'para ROI completo' }],
    painPoints: [
      'Equipo de calidad por construir y capacitar.',
      'Validación de software sin un estándar común.',
    ],
    benefits: [
      'Centro de excelencia de QA operativo.',
      'Integración con la Testing Factory de QActions.',
      'Validación estandarizada a escala.',
    ],
    products: ['QA CoE', 'Testing Factory'],
    sources: [],
  },
  {
    id: 'qactions-telco-sap-mm',
    vendor: 'qactions',
    category: 'Software Testing',
    client: 'Telco multinacional',
    anonymized: true,
    industry: 'Telecomunicaciones',
    title: 'Automatización continua de SAP MM',
    summary:
      'Fábrica de automatización para los módulos SAP MM con pruebas de performance integradas a los pipelines de CI/CD.',
    heroKpi: { value: '30%', label: 'menos incidentes' },
    kpis: [{ value: 'CI/CD', label: 'performance testing integrado' }],
    painPoints: [
      'Procesos logísticos críticos en SAP MM que debían mantenerse estables.',
      'Cambios frecuentes sin una red de pruebas automatizada.',
    ],
    benefits: [
      'Fábrica de automatización de pruebas SAP.',
      'Performance testing integrado en CI/CD.',
      'Reducción de incidentes del 30%.',
    ],
    products: ['SAP MM', 'Automatización de pruebas', 'Performance testing'],
    sources: [],
  },

  // ───────────────────────────── Tricentis ─────────────────────────────
  {
    id: 'tricentis-fiserv',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'Fiserv',
    industry: 'Fintech',
    country: 'EE.UU.',
    title: 'Calidad estandarizada para 3.500 aplicaciones',
    summary:
      'Fiserv unificó su estrategia de testing tras ~250 adquisiciones con Tosca, qTest y Data Integrity, y redujo drásticamente sus incidentes.',
    heroKpi: { value: '65%', label: 'menos incidentes mayores en un año' },
    kpis: [
      { value: '68%', label: 'reducción adicional en el año siguiente (YTD)' },
      { value: '3.500', label: 'aplicaciones en el portafolio' },
      { value: 'USD 30B', label: 'liquidados por día que requieren validación' },
    ],
    painPoints: [
      'Herramientas de testing fragmentadas y 63 instancias separadas de Jira.',
      '3.500 test engineers sin un enfoque de automatización común.',
      'Imposible validar la reconciliación de ~USD 30B diarios con herramientas transaccionales.',
      'Testing manual como cuello de botella para DevSecOps.',
    ],
    benefits: [
      'Testing Center of Excellence con Tricentis como estándar.',
      'qTest integrado a una única instancia enterprise de Jira.',
      'Tricentis Data Integrity para validar datos a escala.',
      'Piloto de IA para generar casos de prueba desde requerimientos.',
    ],
    products: ['Tricentis Tosca', 'Tricentis qTest', 'Tricentis Data Integrity'],
    quote: {
      text: 'Redujimos un 65% el año pasado y vamos camino a una reducción del 68% en lo que va del año.',
      author: 'Rob Larsen, VP of Quality Engineering, Fiserv',
    },
    sources: [
      { label: 'Tricentis · Case study', url: 'https://www.tricentis.com/case-studies/fiserv-testing-transformation-tricentis' },
    ],
    featured: true,
  },
  {
    id: 'tricentis-t-mobile',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'T-Mobile',
    industry: 'Telecomunicaciones',
    country: 'EE.UU.',
    title: 'De cero a 60% de automatización en meses',
    summary:
      'El mayor proveedor 5G de EE.UU. escaló la automatización en 52 aplicaciones con el portafolio Tricentis.',
    heroKpi: { value: '50%', label: 'menos tiempo en solicitudes de datos de prueba' },
    kpis: [
      { value: '0 → 60%', label: 'automatización en 8 a 10 meses' },
      { value: '300+', label: 'usuarios de Tosca en el primer año' },
      { value: '2 sem → 3 días', label: 'validación en la migración de billing' },
    ],
    painPoints: [
      '"Virtualmente cero" automatización al inicio.',
      '52 aplicaciones a testear para Retail, Digital, Care y Prepago.',
      'Migración del billing de 30 millones de usuarios de Sprint.',
    ],
    benefits: [
      'Automatización low-code basada en modelos con Tosca.',
      'Más de 300 procesos de negocio de clientes modelados.',
      'Reporte de defectos casi instantáneo con qTest + Jira.',
      'Data Integrity para validar datos en vuelo de la migración.',
    ],
    products: ['Tricentis Tosca', 'Tricentis qTest', 'Tricentis Data Integrity'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/t-mobile-achieves-automation-excellence-with-tricentis-portfolio',
      },
    ],
  },
  {
    id: 'tricentis-vodafoneziggo',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'VodafoneZiggo',
    industry: 'Telecomunicaciones',
    country: 'Países Bajos',
    title: 'Velocidad y calidad en 200 sistemas',
    summary:
      'VodafoneZiggo incorporó Tosca, qTest y NeoLoad para acelerar el time-to-market sin perder sus bajas tasas de defectos.',
    heroKpi: { value: '90%', label: 'menos tiempo de ejecución con DEX' },
    kpis: [
      { value: '75%', label: 'ahorro de costos con NeoLoad' },
      { value: '400+', label: 'escenarios end-to-end automatizados' },
      { value: '4.500', label: 'páginas con tests de accesibilidad en 2 h' },
    ],
    painPoints: [
      'Cuellos de botella por testing manual.',
      'Intentos fallidos con Selenium y Cypress por su complejidad.',
      'Gestión de pruebas en Excel con problemas de versiones.',
      'Performance testing tercerizado, caro y lento.',
    ],
    benefits: [
      'Automatización no-code con Tosca en 15+ aplicaciones.',
      'qTest reemplazó Excel como gestión centralizada.',
      'NeoLoad internalizó el performance testing.',
      'Modelo self-service: cada squad gestiona sus pruebas.',
    ],
    products: ['Tricentis Tosca', 'Tricentis qTest', 'Tricentis NeoLoad'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/vodafoneziggo-accelerates-time-to-market-tricentis-solutions',
      },
    ],
  },
  {
    id: 'tricentis-home-improvement-retailer',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'Retailer líder de mejoras para el hogar',
    anonymized: true,
    industry: 'Retail',
    country: 'EE.UU.',
    title: 'Temporada alta sin caídas',
    summary:
      'Con NeoLoad y LTIMindtree, un retailer con más de 2.000 tiendas preparó su plataforma omnicanal para los picos de tráfico.',
    heroKpi: { value: '70%', label: 'ahorro de costos vs. herramientas previas' },
    kpis: [
      { value: '75%', label: 'menos tiempo de ciclo de pruebas de release' },
      { value: '50%', label: 'diseño de pruebas más rápido' },
      { value: '0', label: 'incidentes de performance en temporada alta' },
    ],
    painPoints: [
      'El sitio se caía en las fiestas por picos de tráfico.',
      'Páginas lentas y caídas de servidores con impacto directo en ingresos.',
      'Migración de un monolito a microservicios omnicanal.',
    ],
    benefits: [
      'Generación de carga self-service sobre las APIs de NeoLoad.',
      'Pruebas de carga desde múltiples geografías.',
      'Migración del 70% de los escenarios en pocas semanas.',
    ],
    products: ['Tricentis NeoLoad'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/how-neoload-helped-home-improvement-retailer-cut-costs',
      },
    ],
  },
  {
    id: 'tricentis-energy-leader-sap',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'Líder energético de USD 300B+',
    anonymized: true,
    industry: 'Petróleo y Gas',
    title: 'Automatización SAP a escala global',
    summary:
      'Tras un intento fallido con HP UFT, una de las mayores energéticas del mundo adoptó Tosca en más de 5.000 aplicaciones.',
    heroKpi: { value: '25x', label: 'ciclos de prueba más rápidos' },
    kpis: [
      { value: '75%', label: 'menos costos de testing' },
      { value: '11% → 83%', label: 'automatización de pruebas' },
      { value: 'USD 140M', label: 'en costos evitados (~20K defectos en 3 años)' },
      { value: '32% → 89%', label: 'cobertura de riesgo' },
    ],
    painPoints: [
      '5.000 aplicaciones y entre 150 y 215 proyectos activos.',
      'Scripts de HP UFT difíciles de crear y mantener.',
      'Ciclos de prueba de 6 a 8 semanas que frenaban los releases SAP.',
      'Fuga de defectos inaceptable en una industria regulada.',
    ],
    benefits: [
      'Ciclos de 5 semanas reducidos a 1 día.',
      'Risk-based testing para priorizar lo que más valor aporta.',
      'Regresión 100% "lights out", sin intervención manual.',
      'Usuarios de negocio que automatizan sus propias pruebas.',
    ],
    products: ['Tricentis Tosca', 'SAP'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/energy-leader-turbocharges-sap-test-automation-reducing-risk-and-cost',
      },
    ],
    featured: true,
  },
  {
    id: 'tricentis-agl-energy',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'AGL Energy',
    industry: 'Energía',
    country: 'Australia',
    title: 'Testing SAP a velocidad Agile',
    summary:
      'AGL modernizó el testing de SAP IS-U y SAP CRM para sostener su iniciativa "de la idea a producción en 5 días".',
    heroKpi: { value: '1 día', label: 'de regresión SAP (antes, más de una semana)' },
    kpis: [{ value: '3,6M', label: 'cuentas de clientes atendidas' }],
    painPoints: [
      'El 50% del ciclo de desarrollo se iba en testing.',
      'El testing consumía el 30% del presupuesto de desarrollo y entrega.',
      'Suite de regresión de más de una semana por baja automatización.',
      'Preparación manual de datos de prueba que demoraba releases.',
    ],
    benefits: [
      'Automatización end-to-end basada en modelos con Tosca.',
      'Gestión de datos de prueba y generación sintética.',
      'Ejecución distribuida (DEX) y SAP Accelerator.',
    ],
    products: ['Tricentis Tosca', 'SAP IS-U', 'SAP CRM'],
    sources: [{ label: 'Tricentis · Case study', url: 'https://www.tricentis.com/case-studies/agl-energy' }],
  },
  {
    id: 'tricentis-baloise',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'Baloise Insurance',
    industry: 'Seguros',
    country: 'Bélgica',
    title: 'Testing continuo para portales de seguros',
    summary:
      'Baloise automatizó la regresión de su core Cleva y de los portales MyBaloise con Tosca, junto a Accenture.',
    heroKpi: { value: '45%', label: 'de los defectos críticos de regresión los detecta la automatización' },
    kpis: [{ value: '5', label: 'personas full-time extra que se hubieran necesitado para testear a mano' }],
    painPoints: [
      'Costo de regresión manual fuera de control.',
      'Imposible testear todo el core Cleva manualmente.',
      'Necesidad de testear UI y API con una sola herramienta.',
    ],
    benefits: [
      'Tosca aplicable a cualquier tecnología del portafolio.',
      'Equipo central de automatización bajo SAFe.',
      'Detección temprana de defectos con testing continuo.',
    ],
    products: ['Tricentis Tosca'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/baloise-insurance-ensures-customer-experience-tosca',
      },
    ],
  },
  {
    id: 'tricentis-experian-health',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'Experian Health',
    industry: 'Salud',
    country: 'Global',
    title: 'Miles de APIs automatizadas para salud',
    summary:
      'Experian Health migró de testing manual a Tosca y qTest para sus aplicaciones de ciclo de ingresos y atención al paciente.',
    heroKpi: { value: '20.000+', label: 'horas ahorradas en seis meses' },
    kpis: [
      { value: '~USD 1M', label: 'de ahorro en el año fiscal' },
      { value: '95%', label: 'del testing automatizado en su mayor migración' },
      { value: '1-2 sem → 30 min', label: 'regresión completa' },
    ],
    painPoints: [
      'Dependencia del testing manual, difícil de escalar.',
      'Onboarding y capacitación de testers complejos.',
      'Poco tiempo y recursos para migrar a automatización.',
    ],
    benefits: [
      'Curva de aprendizaje corta con el enfoque basado en modelos.',
      'Cero issues en producción al mes de automatizar una app adquirida.',
      'Servicios profesionales de Tricentis en sitio para la migración.',
    ],
    products: ['Tricentis Tosca', 'Tricentis qTest', 'Tricentis NeoLoad', 'Tricentis Data Integrity'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/experian-healthcare-test-automation-tricentis',
      },
    ],
  },
  {
    id: 'tricentis-biotech',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'Biotecnológica líder de EE.UU.',
    anonymized: true,
    industry: 'Life Sciences',
    country: 'EE.UU.',
    title: 'Cero defectos en producción en entorno GxP',
    summary:
      'Con Tosca y Cognizant, la compañía creó un Testing CoE para más de 35 aplicaciones enterprise reguladas.',
    heroKpi: { value: '0%', label: 'fuga de defectos a producción' },
    kpis: [
      { value: 'USD 600K+', label: 'de ahorro total' },
      { value: '40%+', label: 'de automation leverage' },
      { value: '0%', label: 'de desvío en cronograma y esfuerzo' },
    ],
    painPoints: [
      'Gobernar la calidad de más de 30 proyectos sin un TCoE centralizado.',
      'Sin framework escalable para parches de Workday, Oracle EBS y Veeva.',
      'Reportes y métricas poco confiables entre dominios.',
      'Riesgo de compliance en un entorno GxP.',
    ],
    benefits: [
      'Automatización codeless y reutilizable con Tosca.',
      'Reportes en tiempo real integrando Jira y Zephyr.',
      'El 20% del equipo se convirtió en automation engineers.',
    ],
    products: ['Tricentis Tosca'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/biotech-testing-transformation-tricentis-tosca',
      },
    ],
  },
  {
    id: 'tricentis-social-services-agency',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'Agencia gubernamental de servicios sociales',
    anonymized: true,
    industry: 'Sector Público',
    title: 'Releases quincenales para pagos a ciudadanos',
    summary:
      'Una agencia que paga miles de millones al año a ciudadanos pasó de releases trimestrales a quincenales con Tosca.',
    heroKpi: { value: '85%', label: 'de la suite de regresión automatizada' },
    kpis: [
      { value: '8 sem → horas', label: 'tiempo de testing' },
      { value: '< 2 años', label: 'para recuperar la inversión' },
      { value: '50%', label: 'menos tiempo de ejecución con DEX' },
    ],
    painPoints: [
      'Regresión core de hasta 3.000 horas en manual.',
      'Escenarios que cruzan más de 20 aplicaciones.',
      'Un defecto en producción podía significar pagos fallidos y titulares.',
    ],
    benefits: [
      'Testers de negocio automatizando con curva mínima.',
      'Releases de trimestrales a cada 2 semanas.',
      'Datos de prueba sintéticos vía API REST.',
    ],
    products: ['Tricentis Tosca'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/government-social-services-agency-democratizing-test-automation',
      },
    ],
  },
  {
    id: 'tricentis-data-storage-oracle',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'Líder global de almacenamiento de datos',
    anonymized: true,
    industry: 'Tecnología',
    country: 'EE.UU.',
    title: 'Consolidación de ERP en Oracle Cloud',
    summary:
      'Al unificar tres ERPs en Oracle Fusion Cloud, la compañía reemplazó Selenium por Tosca y qTest.',
    heroKpi: { value: '50%', label: 'menos tiempo de testing de Oracle ERP' },
    kpis: [
      { value: '465', label: 'casos de prueba Oracle automatizados' },
      { value: '1.750 h', label: 'de testing manual ahorradas por año' },
      { value: '70+', label: 'testers manuales que ya no hacen falta' },
    ],
    painPoints: [
      'Consolidación compleja de tres ERPs.',
      'Solo dos semanas para probar cada update trimestral de Oracle.',
      'Selenium inestable y dependiente de Java.',
    ],
    benefits: [
      'Self-healing que reduce el mantenimiento.',
      '300 casos ejecutados en el tiempo que antes llevaban 200.',
      'Pruebas end-to-end que cruzan Oracle Cloud, SAP y otras apps.',
    ],
    products: ['Tricentis Tosca', 'Tricentis qTest', 'Oracle Fusion Cloud'],
    sources: [
      { label: 'Tricentis · Case study', url: 'https://www.tricentis.com/case-studies/oracle-erp-testing-automation' },
    ],
  },
  {
    id: 'tricentis-leaseplan',
    vendor: 'tricentis',
    category: 'Software Testing',
    client: 'LeasePlan',
    industry: 'Automotriz',
    country: 'Países Bajos',
    title: 'Car-as-a-service con calidad end-to-end',
    summary:
      'LeasePlan validó su plataforma digital global (SAP, Salesforce y Pega) con una suite de regresión automatizada en Tosca.',
    heroKpi: { value: '90%', label: 'de cobertura de procesos críticos de LeasePlan Insurance' },
    kpis: [
      { value: '20 h', label: 'por mes ahorradas a usuarios de negocio' },
      { value: '22', label: 'escenarios end-to-end automatizados' },
    ],
    painPoints: [
      'Conectar 29 países a una única plataforma digital.',
      'Ecosistema mixto: SAP, Salesforce, Pega y desarrollos propios.',
      'Necesidad de una sola herramienta para API, GUI y end-to-end.',
    ],
    benefits: [
      'Tosca cubre más tecnologías que otras soluciones evaluadas.',
      'Infraestructura de pruebas en la nube operativa rápidamente.',
      'Regresión automatizada de los procesos más críticos.',
    ],
    products: ['Tricentis Tosca'],
    sources: [
      {
        label: 'Tricentis · Case study',
        url: 'https://www.tricentis.com/case-studies/leaseplan-using-tosca-to-drive-business-growth',
      },
    ],
  },

  // ───────────────────────────── Veracode ─────────────────────────────
  {
    id: 'veracode-zurich-seguros',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'Zurich Seguros',
    industry: 'Seguros',
    country: 'Brasil',
    title: 'SHIFT LEFT 360°: seguridad como ventaja competitiva',
    summary:
      'Zurich integró pruebas de seguridad automatizadas en Azure DevOps y una red de security champions en cada squad.',
    heroKpi: { value: '99%', label: 'de adopción por parte de los desarrolladores' },
    kpis: [
      { value: '70%', label: 'menos hallazgos de auditoría' },
      { value: 'R$ 2M', label: 'de costo evitado en los primeros 90 días' },
      { value: '20% → 99%', label: 'cobertura de escaneo de aplicaciones' },
      { value: '< 30 días', label: 'para corregir nuevas fallas' },
    ],
    painPoints: [
      'Vulnerabilidades detectadas cerca de producción: retrabajo y demoras.',
      'Revisiones de seguridad inconsistentes y difíciles de escalar.',
      'Baja cobertura y backlog creciente de fallas sin resolver.',
      'Priorización por severidad técnica y no por impacto de negocio.',
    ],
    benefits: [
      'Veracode integrado al ciclo de desarrollo en Azure DevOps.',
      'Capacitación on-demand para desarrolladores.',
      'Security champions, gamificación y reconocimiento ejecutivo.',
      '90% de mejora en el tiempo de cambio de releases críticos.',
    ],
    products: ['Veracode Software Security Platform', 'Veracode eLearning'],
    sources: [
      { label: 'Veracode · Customer story', url: 'https://www.veracode.com/customers/zurich-seguros-software-security/' },
    ],
    featured: true,
  },
  {
    id: 'veracode-sef-mg',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'SEF/MG (Secretaría de Hacienda de Minas Gerais)',
    industry: 'Sector Público',
    country: 'Brasil',
    title: 'DevSecOps para servicios digitales al ciudadano',
    summary:
      'La Secretaría de Hacienda de Minas Gerais embebió SAST y SCA en GitLab y Azure DevOps para pasar de reactiva a proactiva.',
    heroKpi: { value: '99,6%', label: 'de cobertura de escaneo (283 de 284 repositorios)' },
    kpis: [
      { value: '100%', label: 'de adopción de escaneo automatizado' },
      { value: '10,5% → 49,6%', label: 'cumplimiento de políticas' },
      { value: '~40 días', label: 'de tiempo medio de remediación' },
    ],
    painPoints: [
      'Sin visibilidad en tiempo real de fallas durante el desarrollo.',
      'Problemas de seguridad detectados justo antes de producción.',
      'Vulnerabilidades profundas en sistemas legacy.',
    ],
    benefits: [
      'Feedback de seguridad en el IDE y en los pipelines.',
      'Evidencia técnica para ISO 27001, LGPD y CIS.',
      'Capacitación con Veracode eLearning.',
    ],
    products: ['Veracode Static Analysis (SAST)', 'Veracode SCA', 'Veracode eLearning'],
    sources: [{ label: 'Veracode · Case study', url: 'https://www.veracode.com/case-studies/sef-mg-devsecops-veracode/' }],
  },
  {
    id: 'veracode-hdi-global',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'HDI Global SE',
    industry: 'Seguros',
    country: 'Alemania',
    title: 'Seguridad automatizada en CI/CD para un asegurador global',
    summary:
      'La división industrial de Talanx automatizó la seguridad dentro del ciclo de desarrollo para ganar agilidad.',
    heroKpi: { value: '+400%', label: 'aplicaciones escaneadas por mes' },
    kpis: [{ value: '+44%', label: 'hallazgos cerrados por mes' }],
    painPoints: [
      'Revisiones de seguridad como pasos separados que generaban cuellos de botella.',
      'Nuevas regulaciones que exigían controles medibles.',
      'Clientes que requieren prácticas de software seguro.',
    ],
    benefits: [
      'CI/CD totalmente automatizado con seguridad integrada.',
      'Mejora sostenida mes a mes del programa AppSec.',
      'Plan aprobado para remediar con IA (Veracode Fix).',
    ],
    products: ['Veracode Software Security Platform', 'Veracode Fix'],
    sources: [{ label: 'Veracode · Customer story', url: 'https://www.veracode.com/customers/hdi-global-se/' }],
  },
  {
    id: 'veracode-cox-automotive',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'Cox Automotive',
    industry: 'Automotriz',
    country: 'EE.UU.',
    title: 'Escaneos de minutos, no de días',
    summary:
      'Cox Automotive reemplazó a su proveedor AppSec anterior y aceleró su time-to-market con la suite completa de Veracode.',
    heroKpi: { value: '60%', label: 'de los escaneos terminan en menos de 5 minutos' },
    kpis: [
      { value: '75%', label: 'terminan en menos de 10 minutos' },
      { value: '400+', label: 'aplicaciones incorporadas a Veracode' },
    ],
    painPoints: [
      'Escaneos que tardaban días con el proveedor anterior.',
      'Integraciones complejas que frenaban a los desarrolladores.',
    ],
    benefits: [
      'Análisis estático, dinámico y de composición de software.',
      'Integración con Artifactory y AWS CodeBuild.',
      'Mayor adopción de AppSec en los equipos de desarrollo.',
    ],
    products: ['Veracode SAST', 'Veracode DAST', 'Veracode SCA'],
    sources: [{ label: 'Veracode · Customer story', url: 'https://www.veracode.com/customers/cox-automotive/' }],
  },
  {
    id: 'veracode-manhattan-associates',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'Manhattan Associates',
    industry: 'SaaS',
    title: 'AppSec cloud-native para supply chain',
    summary:
      'El proveedor SaaS de supply chain y comercio omnicanal automatizó la seguridad en todo su desarrollo cloud-native.',
    heroKpi: { value: '20.000+', label: 'escaneos de código al año' },
    kpis: [
      { value: '0', label: 'brechas de seguridad: objetivo sostenido' },
      { value: '180+', label: 'clientes en la solución cloud-native' },
    ],
    painPoints: [
      'La reputación del producto depende de su seguridad.',
      'Programa de security champions sin suficiente tracción.',
      'Transición de software on-premise a SaaS.',
    ],
    benefits: [
      'Escaneando a los 5 días de firmar, corrigiendo bugs al mes.',
      'Código escaneado varias veces al día, todos los días.',
      'Release a producción solo si cumple la política de seguridad.',
    ],
    products: ['Veracode Software Security Platform'],
    sources: [{ label: 'Veracode · Customer story', url: 'https://www.veracode.com/customers/manhattan-associates/' }],
  },
  {
    id: 'veracode-crypto-exchange',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'Exchange de criptomonedas',
    anonymized: true,
    industry: 'Crypto Exchange',
    title: 'Ataque a la cadena de suministro bloqueado',
    summary:
      'Un falso "job scanner" en PyPI buscaba robar credenciales y wallets. Veracode lo bloqueó antes de que pudiera descargarse.',
    heroKpi: { value: '0', label: 'descargas del paquete malicioso' },
    kpis: [{ value: '3', label: 'capas de defensa: Package Firewall, protección y SCA' }],
    painPoints: [
      'Paquete malicioso dirigido a robar credenciales y wallets.',
      'Ataque vinculado a indicadores de amenazas persistentes avanzadas (APT).',
      'Procesos de contratación expuestos a herramientas falsas.',
    ],
    benefits: [
      'Bloqueo a nivel de registro con Veracode Package Firewall.',
      'Cuarentena automática y alternativas seguras para desarrolladores.',
      'SCA mapeó dependencias transitivas y aplicó guardrails.',
    ],
    products: ['Veracode Package Firewall', 'Veracode SCA'],
    sources: [
      {
        label: 'Veracode · Case study',
        url: 'https://www.veracode.com/resources/case-studies/how-crypto-exchange-prevented-software-supply-chain-attack/',
      },
    ],
  },
  {
    id: 'veracode-fintech-startup',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'Startup fintech',
    anonymized: true,
    industry: 'Fintech',
    title: 'Pipeline CI/CD protegido ante un troyano en npm',
    summary:
      'Durante una ola de spam en npm, una utilidad de logging troyanizada casi compromete el pipeline. Veracode la bloqueó antes de la descarga.',
    heroKpi: { value: '1 sprint', label: 'para recuperar la velocidad de desarrollo' },
    kpis: [{ value: '0', label: 'brechas: el paquete nunca entró al pipeline' }],
    painPoints: [
      'Dependencia troyanizada a punto de entrar en CI/CD.',
      'Exposición transitiva oculta en el árbol de dependencias.',
    ],
    benefits: [
      'Bloqueo pre-descarga con Veracode Package Firewall.',
      'Cuarentena automática con inteligencia de amenazas.',
      'SBOM completo y version pinning a releases seguros.',
    ],
    products: ['Veracode Package Firewall', 'Veracode SCA'],
    sources: [
      {
        label: 'Veracode · Case study',
        url: 'https://www.veracode.com/resources/case-studies/fintech-startup-secured-ci-cd-pipeline/',
      },
    ],
  },
  {
    id: 'veracode-ecommerce-giant',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'Gigante del e-commerce',
    anonymized: true,
    industry: 'E-commerce',
    title: 'Typosquatting detenido antes de empezar',
    summary:
      'Una dependencia troyanizada con nombre falso fue bloqueada a nivel de registro, con rollback guiado y SBOM para auditoría.',
    heroKpi: { value: '0', label: 'descargas del paquete troyanizado' },
    kpis: [{ value: 'SBOM', label: 'exportado para auditoría y socios comerciales' }],
    painPoints: [
      'Paquete con typosquatting que imitaba una dependencia legítima.',
      'Binario embebido vinculado a familias de malware conocidas.',
    ],
    benefits: [
      'Package Firewall con chequeos de integridad y reputación.',
      'Denegación automática y guía hacia versiones limpias.',
      'SCA ubicó cada referencia y aceleró el rollback.',
    ],
    products: ['Veracode Package Firewall', 'Veracode SCA'],
    sources: [
      {
        label: 'Veracode · Case study',
        url: 'https://www.veracode.com/resources/case-studies/ecommerce-giant-avoided-typosquatting-attack/',
      },
    ],
  },
  {
    id: 'veracode-saas-ransomware',
    vendor: 'veracode',
    category: 'Ciberseguridad',
    client: 'Empresa SaaS',
    anonymized: true,
    industry: 'SaaS',
    title: 'Ransomware novedoso neutralizado en origen',
    summary:
      'Un paquete npm que se hacía pasar por una herramienta de AWS ocultaba instrucciones C2 en una imagen. Veracode lo frenó en la fuente.',
    heroKpi: { value: '0', label: 'datos cifrados ni servicios interrumpidos' },
    kpis: [{ value: 'PRs', label: 'automáticos hacia versiones endurecidas' }],
    painPoints: [
      'Paquete malicioso disfrazado de herramienta oficial de AWS.',
      'Instrucciones de comando y control ocultas en un archivo de imagen.',
      'Riesgo de cifrado masivo de datos.',
    ],
    benefits: [
      'Bloqueo por indicadores maliciosos (dominios y payloads).',
      'Cuarentena con score de riesgo y pasos de remediación.',
      'Pull requests automáticos para alinear dependencias a la política.',
    ],
    products: ['Veracode Package Firewall', 'Veracode SCA'],
    sources: [
      {
        label: 'Veracode · Case study',
        url: 'https://www.veracode.com/resources/case-studies/saas-firm-prevented-ransomware-attack/',
      },
    ],
  },

  // ───────────────────────────── hCaptcha ─────────────────────────────
  {
    id: 'hcaptcha-game-company',
    vendor: 'hcaptcha',
    category: 'Ciberseguridad',
    client: 'Top 10 de compañías de videojuegos',
    anonymized: true,
    industry: 'Gaming',
    title: 'Bots de registros falsos bajo control',
    summary:
      'Tras reemplazar a su proveedor anterior, el líder de seguridad reportó una caída drástica del tráfico de bots de registro falso.',
    heroKpi: { value: '96%', label: 'menos throughput de bots vs. el año anterior' },
    kpis: [{ value: '1 año', label: 'de comparación contra el competidor anterior' }],
    painPoints: [
      'Bots creando registros falsos a escala.',
      'Proveedor anterior sin efectividad suficiente.',
    ],
    benefits: [
      'Defensa anti-bots multicapa de hCaptcha Enterprise.',
      'Reducción del 96% del throughput de bots.',
    ],
    products: ['hCaptcha Enterprise'],
    quote: {
      text: 'Comparado con el año pasado [con un competidor], tuvimos una reducción del 96% en el throughput de bots.',
      author: 'Security Lead, compañía Top 10 de videojuegos',
    },
    sources: [{ label: 'hCaptcha · Start a pilot', url: 'https://www.hcaptcha.com/start-a-pilot' }],
  },
  {
    id: 'hcaptcha-shopify',
    vendor: 'hcaptcha',
    category: 'Ciberseguridad',
    client: 'Shopify',
    industry: 'E-commerce',
    country: 'Global',
    title: 'Ventas flash protegidas de bots acaparadores',
    summary:
      'Shopify usa hCaptcha desde el login hasta los lanzamientos limitados, para que los bots no acaparen inventario.',
    heroKpi: { value: '1,7M', label: 'negocios en 175 países sobre la plataforma' },
    kpis: [
      { value: '110+', label: 'idiomas de localización' },
      { value: '135%', label: 'aumento de ataques bot en e-commerce (2021 vs 2020)' },
    ],
    painPoints: [
      'Bots que acaparan inventario en ventas flash y lanzamientos limitados.',
      'Fuerte crecimiento de ataques bot en el sector.',
      'Necesidad de escalar en ventas extremadamente populares.',
    ],
    benefits: [
      'Desafíos 100% personalizables según la marca.',
      'Modelos de amenaza propios para adaptarse rápido.',
      'Integración rápida con control fino y métricas.',
    ],
    products: ['hCaptcha Enterprise'],
    quote: {
      text: '¿Por qué elegimos hCaptcha? Nadie más podía darnos las funciones y el rendimiento que necesitábamos.',
      author: 'Alex M., Product Manager, Shopify',
    },
    sources: [
      { label: 'hCaptcha · Blog', url: 'https://www.hcaptcha.com/blog/why-ecommerce-leader-shopify-uses-hcaptcha' },
    ],
  },
  {
    id: 'hcaptcha-fastmail',
    vendor: 'hcaptcha',
    category: 'Ciberseguridad',
    client: 'Fastmail',
    industry: 'SaaS',
    title: 'Anti-bots sin sacrificar la privacidad',
    summary:
      'Fastmail dejó Google reCAPTCHA porque recolectaba datos personales. hCaptcha Enterprise fue el único que cumplió todos sus requisitos.',
    heroKpi: { value: '0 PII', label: 'datos personales retenidos (Zero PII)' },
    kpis: [{ value: '5/5', label: 'requisitos de evaluación cumplidos' }],
    painPoints: [
      'reCAPTCHA almacenaba y compartía historial personal de los usuarios.',
      'Clientes de un servicio privacy-first insatisfechos.',
      'Necesidad de frenar bots sin afectar performance.',
    ],
    benefits: [
      'Detección efectiva de bots y fraude.',
      'Implementación simple y sin impacto en performance.',
      'Experiencia positiva para usuarios legítimos.',
    ],
    products: ['hCaptcha Enterprise'],
    sources: [{ label: 'hCaptcha · Blog', url: 'https://hcaptcha.com/post/fastmail-puts-privacy-first-with-hcaptcha' }],
  },

  // ───────────────────────────── Automation Anywhere ─────────────────────────────
  {
    id: 'aa-petrobras',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Petrobras',
    industry: 'Petróleo y Gas',
    country: 'Brasil',
    title: 'IA generativa que encontró USD 120M en impuestos',
    summary:
      'Petrobras aplicó IA generativa y automatización a 150 páginas de normativa tributaria brasileña y tres meses de datos fiscales.',
    heroKpi: { value: 'USD 120M', label: 'de ahorro en 3 semanas' },
    kpis: [
      { value: 'USD 1B+', label: 'de ahorro proyectado' },
      { value: '40%', label: 'más eficiencia' },
      { value: '3 días', label: 'para presentar impuestos' },
    ],
    painPoints: [
      '150 páginas de reglas tributarias complejas.',
      'USD 54B en pagos de impuestos al año.',
      'Adopción desigual de IA entre áreas corporativas.',
    ],
    benefits: [
      'Cálculo automatizado de ICMS, IPI, ISS, COFINS y PIS.',
      'Primera temporada fiscal en 15 años sin trabajar el fin de semana.',
      'Expansión de la IA a RR.HH., finanzas y compras.',
    ],
    products: ['Automation Anywhere', 'IA generativa'],
    sources: [
      { label: 'Automation Anywhere · Customer story', url: 'https://www.automationanywhere.com/resources/customer-stories/petrobras' },
    ],
    featured: true,
  },
  {
    id: 'aa-bancolombia',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Bancolombia',
    industry: 'Banca',
    country: 'Colombia',
    title: 'Automatización inteligente con ROI de 1300%',
    summary:
      'Bancolombia procesa datos estructurados y no estructurados de 14 millones de clientes con cientos de bots en front y back office.',
    heroKpi: { value: '1300%', label: 'de ROI en el primer año' },
    kpis: [
      { value: '127K', label: 'horas liberadas en sucursales por año' },
      { value: 'USD 19M', label: 'menos en costos de aprovisionamiento' },
      { value: 'USD 7M', label: 'en nuevas fuentes de ingresos' },
    ],
    painPoints: [
      'Alto volumen diario de datos de clientes.',
      'Procesos de front y back office lentos y manuales.',
      'Necesidad de gobernanza compartida entre negocio e IT.',
    ],
    benefits: [
      '50% más eficiencia en atención en sucursales automatizadas.',
      'Cientos de bots desplegados en el primer año.',
      'Mayor satisfacción del cliente (CSAT).',
    ],
    products: ['Automation Anywhere', 'Intelligent Document Processing'],
    sources: [
      { label: 'Automation Anywhere · Customer story', url: 'https://www.automationanywhere.com/resources/customer-stories/bancolombia' },
    ],
    featured: true,
  },
  {
    id: 'aa-softbank',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'SoftBank Corp.',
    industry: 'Telecomunicaciones',
    country: 'Japón',
    title: 'Digital Worker 4,000: RPA + IA a escala',
    summary:
      'SoftBank pasó de automatizar tareas a automatizar procesos completos, con la meta de ahorrar 7,7 millones de horas por año.',
    heroKpi: { value: '4,5K', label: 'FTEs ahorrados' },
    kpis: [
      { value: '85%', label: 'menos horas de reclutamiento' },
      { value: '50%', label: 'menos tiempo de registro de servicio móvil' },
      { value: '52K', label: 'propuestas de IA generativa de empleados' },
    ],
    painPoints: [
      'Cuello de botella para expandir RPA tras su despliegue inicial.',
      'Empleados dedicados a tareas rutinarias.',
    ],
    benefits: [
      'Reingeniería de procesos para priorizar qué automatizar.',
      'Orquestación de procesos entre múltiples aplicaciones.',
      'Fuerte inversión en formación digital del personal.',
    ],
    products: ['Automation Anywhere', 'IA generativa'],
    sources: [
      { label: 'Automation Anywhere · Customer story', url: 'https://www.automationanywhere.com/resources/customer-stories/softbank' },
    ],
  },
  {
    id: 'aa-osaic',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Osaic',
    industry: 'Servicios Financieros',
    country: 'EE.UU.',
    title: 'Back office de un broker-dealer, automatizado',
    summary:
      'Osaic creó un CoE de automatización inteligente y automatizó 59 procesos en 15 meses para liberar a sus asesores.',
    heroKpi: { value: '186%', label: 'de ROI en el primer año' },
    kpis: [
      { value: '93%', label: 'de precisión en onboarding con Document Automation' },
      { value: '88K', label: 'transacciones de clientes automatizadas por año' },
      { value: '25K+', label: 'horas ahorradas por año' },
    ],
    painPoints: [
      'Asesores ocupados en tareas administrativas y tickets.',
      'Ciclos de solicitudes de clientes lentos.',
    ],
    benefits: [
      'CoE centralizado con disciplina y control.',
      '66% de los casos cerrados al menos un día antes.',
      '127 horas semanales liberadas para tareas de mayor valor.',
    ],
    products: ['Automation Anywhere', 'Document Automation'],
    sources: [
      { label: 'Automation Anywhere · Customer story', url: 'https://www.automationanywhere.com/resources/customer-stories/osaic' },
    ],
  },
  {
    id: 'aa-kotak-international',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Kotak International',
    industry: 'Servicios Financieros',
    title: 'Operaciones de fondos sin coordinación manual',
    summary:
      'Kotak automatizó con IA sus flujos de cierre diario y valuación de fondos internacionales, con auditoría integrada.',
    heroKpi: { value: '67%', label: 'menos tiempo de procesamiento de fondos críticos' },
    kpis: [{ value: '90 → 30 min', label: 'flujos financieros clave' }],
    painPoints: [
      'Flujos críticos dependientes de la disponibilidad del personal.',
      'Riesgo de liquidación por ejecución manual inconsistente.',
      'Brechas de auditoría y control con más volumen.',
    ],
    benefits: [
      'Ejecución desacoplada de la coordinación manual.',
      'Trazabilidad de auditoría en cada flujo.',
      'Crecimiento de volumen absorbido sin sumar personal.',
    ],
    products: ['Automation Anywhere'],
    sources: [
      {
        label: 'Automation Anywhere · Customer story',
        url: 'https://www.automationanywhere.com/resources/customer-stories/kotak-international',
      },
    ],
  },
  {
    id: 'aa-merck',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Merck Life Science',
    industry: 'Life Sciences',
    country: '14 países',
    title: 'Compliance regulatorio automatizado',
    summary:
      'Merck Life Science embebió 17 automatizaciones en el procesamiento documental y de compliance en 14 países.',
    heroKpi: { value: '150K', label: 'horas ahorradas' },
    kpis: [
      { value: '17', label: 'automatizaciones embebidas' },
      { value: '64', label: 'procesos en 14 países' },
    ],
    painPoints: [
      'Restricciones de compliance distintas en cada país.',
      'Sin permisos o licencias vigentes, no se puede operar.',
      'Científicos absorbidos por tareas manuales.',
    ],
    benefits: [
      'Mejor seguimiento y tiempos de respuesta.',
      'Errores prácticamente eliminados.',
      'Reconocimiento Global Regulatory Management & Trade Compliance 2021.',
    ],
    products: ['Automation Anywhere'],
    sources: [
      { label: 'Automation Anywhere · Customer story', url: 'https://www.automationanywhere.com/resources/customer-stories/merck' },
    ],
  },
  {
    id: 'aa-nhs-northampton',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Northampton General Hospital (NHS)',
    industry: 'Salud',
    country: 'Reino Unido',
    title: 'Bot 24/7 para el suministro de oxígeno',
    summary:
      'Durante la pandemia, un bot pasó a monitorear las reservas de oxígeno del hospital sin intervención humana.',
    heroKpi: { value: '1.500 h', label: 'de capacidad redirigida a tareas de valor' },
    kpis: [
      { value: '100%', label: 'de precisión en la carga de datos' },
      { value: '12 h', label: 'para construir el bot' },
    ],
    painPoints: [
      'Monitoreo manual de tanques de oxígeno, lento y propenso a errores.',
      'Riesgo clínico ante lecturas incorrectas.',
    ],
    benefits: [
      'Monitoreo 24/7 sin intervención humana.',
      'Riesgo clínico eliminado.',
      'Equipos del hospital capacitados en automatización.',
    ],
    products: ['Automation Anywhere'],
    sources: [
      {
        label: 'Automation Anywhere · Customer story',
        url: 'https://www.automationanywhere.com/resources/customer-stories/rpa-deployed-by-nhs-monitors-oxygen',
      },
    ],
  },
  {
    id: 'aa-cargill',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Cargill',
    industry: 'Agroindustria',
    country: '70 países',
    title: 'Cinco años de automatización wall-to-wall',
    summary:
      'El CoE de Cargill desplegó 236 automatizaciones en Source-to-Pay, carga de órdenes y más, en 70 países.',
    heroKpi: { value: 'USD 19M', label: 'ahorrados en 5 años' },
    kpis: [
      { value: '236', label: 'automatizaciones acumuladas' },
      { value: '50.000', label: 'órdenes procesadas por año con RPA + OCR' },
      { value: '268.000', label: 'registros de proveedores inactivos depurados' },
    ],
    painPoints: [
      'Procesos inconsistentes entre regiones.',
      'Alto volumen de trabajo manual repetitivo.',
    ],
    benefits: [
      'Procesos touchless en carga de órdenes.',
      'Estandarización entre funciones.',
      '700 oportunidades capturadas de idea a proyecto.',
    ],
    products: ['Automation Anywhere', 'OCR'],
    sources: [
      { label: 'Automation Anywhere · Customer story', url: 'https://www.automationanywhere.com/resources/customer-stories/cargill' },
    ],
  },
  {
    id: 'aa-ricoh',
    vendor: 'automation-anywhere',
    category: 'RPA + IA',
    client: 'Ricoh',
    industry: 'Tecnología',
    country: 'Global',
    title: 'Automatización para un trabajo con propósito',
    summary:
      'Ricoh centralizó su equipo de automatización y opera 60 bots desatendidos en facturas, atención al cliente y RR.HH.',
    heroKpi: { value: '€1,09M', label: 'ahorrados desde 2019' },
    kpis: [
      { value: '5,73K', label: 'días de trabajo ahorrados' },
      { value: '€100K', label: 'de ahorro promedio por mes' },
      { value: '60', label: 'automatizaciones desatendidas' },
    ],
    painPoints: [
      'Presencia en 200 países con requisitos distintos.',
      'Formatos de factura variados y carga manual de datos.',
      'Gestión del cambio en una gran organización.',
    ],
    benefits: [
      'Equipo central de automatización con mejores prácticas.',
      'Integración con su sistema Oracle existente.',
      'Empleados enfocados en tareas de mayor valor.',
    ],
    products: ['Automation Anywhere'],
    sources: [
      { label: 'Automation Anywhere · Customer story', url: 'https://www.automationanywhere.com/resources/customer-stories/ricoh' },
    ],
  },

  // ───────────────────────────── Synthesized ─────────────────────────────
  {
    id: 'synthesized-deutsche-bank',
    vendor: 'synthesized',
    category: 'Data Management',
    client: 'Deutsche Bank',
    industry: 'Banca',
    country: 'Alemania',
    title: 'Datos de prueba compliant para riesgo crediticio',
    summary:
      'El equipo de Credit Risk Technology generó datos sintéticos de alta fidelidad vía API para un proyecto ESG con plazos ajustados.',
    heroKpi: { value: '80%', label: 'menos tiempo de aprovisionamiento de datos' },
    kpis: [{ value: 'CI/CD', label: 'datos de prueba integrados a los pipelines' }],
    painPoints: [
      'Proyecto ESG bloqueado por falta de datos tipo producción.',
      'Enfoques estadísticos tradicionales demasiado lentos.',
      'Intentos internos (GAN propio) sin recursos suficientes.',
    ],
    benefits: [
      'Datos sintéticos sin PII que imitan producción.',
      'UI propia sobre la API para usuarios no técnicos.',
      'Reglas de negocio complejas de onboarding ESG simuladas.',
    ],
    products: ['Synthesized'],
    sources: [
      {
        label: 'Synthesized · Case study',
        url: 'https://www.synthesized.io/case-studies/modernizing-qa-with-compliant-scalable-test-data-infrastructure',
      },
    ],
  },
  {
    id: 'synthesized-european-commission',
    vendor: 'synthesized',
    category: 'Data Management',
    client: 'Comisión Europea',
    industry: 'Sector Público',
    country: 'Unión Europea',
    title: 'Innovación fintech sin exponer datos sensibles',
    summary:
      'Seleccionado por licitación pública y probado por el Joint Research Centre para compartir datos de supervisores financieros.',
    heroKpi: { value: '< 10%', label: 'de registros re-identificables en pruebas de seguridad' },
    kpis: [{ value: '3', label: 'datasets financieros evaluados' }],
    painPoints: [
      'Datos confidenciales de reguladores imposibles de compartir.',
      'Técnicas de anonimización tradicionales reversibles.',
      'Cumplimiento estricto de GDPR.',
    ],
    benefits: [
      'Datasets nuevos que replican la estadística sin datos reales.',
      'Simulaciones de pérdidas bancarias con resultados equivalentes.',
      'Datos reales siempre dentro de las instalaciones del supervisor.',
    ],
    products: ['Synthesized'],
    sources: [
      {
        label: 'Synthesized · Case study',
        url: 'https://www.synthesized.io/case-studies/how-the-european-commission-unlocked-fintech-innovation-across-europe-while-protecting-sensitive-data',
      },
    ],
  },
  {
    id: 'synthesized-uk-university',
    vendor: 'synthesized',
    category: 'Data Management',
    client: 'Universidad líder del Reino Unido',
    anonymized: true,
    industry: 'Educación',
    country: 'Reino Unido',
    title: 'Adiós al TDM legacy',
    summary:
      'La universidad reemplazó Delphix por la infraestructura de datos de prueba con IA de Synthesized.',
    heroKpi: { value: '10x', label: 'aprovisionamiento de datos de prueba más rápido' },
    kpis: [{ value: '80%', label: 'menos tiempo de aprovisionamiento' }],
    painPoints: [
      'Provisión de datos lenta y manual para miles de casos de prueba.',
      'Sin pipelines automatizados de datos de prueba.',
      'Riesgos de compliance con datos sensibles.',
    ],
    benefits: [
      'Pipelines de datos de prueba automatizados.',
      'Descubrimiento y clasificación automática de PII.',
      'Integración con DevOps y CI/CD.',
    ],
    products: ['Synthesized'],
    sources: [
      {
        label: 'Synthesized · Case study',
        url: 'https://www.synthesized.io/case-studies/how-a-leading-uk-university-modernized-test-data-management-with-ai-driven-automation',
      },
    ],
  },
  {
    id: 'synthesized-healthtech',
    vendor: 'synthesized',
    category: 'Data Management',
    client: 'HealthTech líder en terapia online',
    anonymized: true,
    industry: 'Salud',
    title: 'Datos de prueba a escala de producción',
    summary:
      'Una plataforma de salud mental usada por millones dejó atrás su TDM anterior y escaló el masking y subsetting.',
    heroKpi: { value: '20bn+', label: 'filas enmascaradas y subconjuntadas en horas' },
    kpis: [{ value: '100%', label: 'configuración manual eliminada' }],
    painPoints: [
      'Configuración manual lenta y frágil.',
      'Masking y subsetting que no escalaban a volumen de producción.',
      'Equipos no técnicos excluidos del flujo.',
    ],
    benefits: [
      'Plataforma única de entrega de datos repetible y automatizada.',
      'Data-as-code para ingeniería y vista UI para negocio.',
      'Subsetting contra el esquema productivo a escala enterprise.',
    ],
    products: ['Synthesized'],
    sources: [
      {
        label: 'Synthesized · Case study',
        url: 'https://www.synthesized.io/case-studies/healthtech-test-data-bottlenecks-eliminated',
      },
    ],
  },
  {
    id: 'synthesized-digital-pathology',
    vendor: 'synthesized',
    category: 'Data Management',
    client: 'Proveedor de software de patología digital',
    anonymized: true,
    industry: 'Salud',
    title: 'Debugging seguro sobre datos de laboratorio',
    summary:
      'Bases completas de su Laboratory Information System fueron anonimizadas para testing de performance y soporte offshore.',
    heroKpi: { value: '200 GB', label: 'bases de clientes anonimizadas por entorno (30-200 GB)' },
    kpis: [{ value: 'Minutos', label: 'para generar datos realistas y enmascarados' }],
    painPoints: [
      'Problemas de performance imposibles de reproducir sin datos reales.',
      'Soporte sin acceso a datos de clientes por regulación.',
      'Escenarios de prueba armados a mano, lentos e inconsistentes.',
    ],
    benefits: [
      'Descubrimiento automático de PII, incluso en JSON y blobs.',
      'Integridad referencial preservada en esquemas complejos.',
      'Cuellos de botella de performance detectados y corregidos.',
    ],
    products: ['Synthesized'],
    sources: [
      {
        label: 'Synthesized · Case study',
        url: 'https://www.synthesized.io/case-studies/test-data-for-a-digital-pathology-solution',
      },
    ],
  },
  {
    id: 'synthesized-global-insurer',
    vendor: 'synthesized',
    category: 'Data Management',
    client: 'Asegurador y reasegurador global',
    anonymized: true,
    industry: 'Seguros',
    country: '80+ países',
    title: 'Project Quest: TDM enterprise para seguros',
    summary:
      'Junto a QualityAI, Synthesized estandarizó la gestión de datos de prueba en más de 40 aplicaciones core.',
    heroKpi: { value: '60%', label: 'producción de datos de prueba más rápida' },
    kpis: [
      { value: '28M+', label: 'filas de producción protegidas' },
      { value: '100%', label: 'de integridad referencial' },
      { value: '14', label: 'apps prioritarias incorporadas' },
    ],
    painPoints: [
      'Semanas de preparación manual de datos por ciclo.',
      'Cada equipo gestionaba sus datos sin estándar.',
      'Requisitos de auditoría 2025 más exigentes.',
    ],
    benefits: [
      'Masking, generación, subsetting y provisión en una plataforma.',
      'Descubrimiento de PII automatizado con IA.',
      'Despliegue en entorno air-gapped e híbrido.',
    ],
    products: ['Synthesized'],
    sources: [
      {
        label: 'Synthesized · Case study',
        url: 'https://www.synthesized.io/case-studies/qualitest-synthesized-global-insurer-test-data',
      },
    ],
  },
];

export const QACTIONS_TESTIMONIALS = [
  {
    text: 'Gracias a QActions, logramos reducir los costos operativos hasta en un 80%.',
    author: 'Carlos Crespo',
    role: 'Gerente de IT, AySA',
  },
  {
    text: 'Nuestra observabilidad cambió rotundamente en la gestión de todos los proyectos de nuestra empresa.',
    author: 'Sergio Oviedo',
    role: 'COO, Santander',
  },
  {
    text: 'Elegimos trabajar con QActions por su experiencia y conocimiento en todas sus implementaciones.',
    author: 'Leandro González',
    role: 'Gerente de PMO y Control de Gestión, Grupo Petersen',
  },
];
