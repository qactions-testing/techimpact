import { Category, Vendor, VendorId } from '../types';

// Brand registry: single source of truth for logos. Replace a file in
// /public/logos (same name) and every card, detail and partner tile updates.
export const VENDORS: Record<VendorId, Vendor> = {
  qactions: {
    id: 'qactions',
    name: 'QActions',
    logo: '/logos/qactions-white.png',
    logoIsLight: true,
    website: 'https://qactions.com',
    tagline: 'QA, testing, ciberseguridad y RPA + IA para LATAM',
    categories: ['Software Testing', 'Ciberseguridad', 'RPA + IA', 'Data Management'],
  },
  tricentis: {
    id: 'tricentis',
    name: 'Tricentis',
    logo: '/logos/tricentis.png',
    logoIsLight: false,
    website: 'https://www.tricentis.com',
    tagline: 'Plataforma de calidad y testing continuo con IA',
    categories: ['Software Testing'],
  },
  veracode: {
    id: 'veracode',
    name: 'Veracode',
    logo: '/logos/veracode.png',
    logoIsLight: false,
    website: 'https://www.veracode.com',
    tagline: 'Gestión de riesgo y seguridad de aplicaciones',
    categories: ['Ciberseguridad'],
  },
  hcaptcha: {
    id: 'hcaptcha',
    name: 'hCaptcha',
    logo: '/logos/hcaptcha.png',
    logoIsLight: false,
    website: 'https://www.hcaptcha.com',
    tagline: 'Protección anti-bots y anti-fraude con privacidad',
    categories: ['Ciberseguridad'],
  },
  'automation-anywhere': {
    id: 'automation-anywhere',
    name: 'Automation Anywhere',
    logo: '/logos/automation-anywhere.webp',
    logoIsLight: false,
    logoTall: true,
    website: 'https://www.automationanywhere.com',
    tagline: 'Automatización agéntica de procesos (RPA + IA)',
    categories: ['RPA + IA'],
  },
  synthesized: {
    id: 'synthesized',
    name: 'Synthesized',
    logo: '/logos/synthesized.png',
    logoIsLight: false,
    website: 'https://www.synthesized.io',
    tagline: 'Datos de prueba sintéticos y enmascarados con IA',
    categories: ['Data Management'],
  },
};

export const VENDOR_ORDER: VendorId[] = [
  'qactions',
  'tricentis',
  'veracode',
  'hcaptcha',
  'automation-anywhere',
  'synthesized',
];

export const CATEGORIES: Category[] = ['Software Testing', 'Ciberseguridad', 'RPA + IA', 'Data Management'];

export const QACTIONS_LOGO_ON_LIGHT = '/logos/qactions-blue.png';

// QActions is the only vendor clients are routed to for demos and contact.
export const QACTIONS_LINKS = {
  demo:
    'https://api.whatsapp.com/send?phone=5491164235643&text=Hola%20QActions%2C%20quiero%20acceder%20a%20una%20DEMO.%20%C2%BFD%C3%A9%20qu%C3%A9%20productos%20o%20servicios%20me%20puedes%20ofrecer%3F%20Gracias',
  meeting:
    'https://api.whatsapp.com/send?phone=5491164235643&text=Hola%20QActions%2C%20quiero%20acceder%20a%20una%20reuni%C3%B3n%20con%20ustedes%20para%20charlar%20de%20las%20necesidades%20de%20mi%20empresa.%20%C2%BFPodemos%20agendar%3F%20Gracias',
  contact: 'https://qactions.com/contacto/',
  email: 'mailto:info@qactions.com',
  blog: 'https://qactions.com/blog/',
  cases: 'https://qactions.com/casos-de-exito/',
  products: 'https://qactions.com/productos/',
  video: 'https://youtu.be/jIMHDngd8Tk',
};
