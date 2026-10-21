import { Category, Vendor, VendorId } from '../types';
import { BASE_PATH } from '../lib/site';

// Brand registry: single source of truth for logos. Replace a file in
// /public/logos (same name) and every card, detail and partner tile updates.
export const VENDORS: Record<VendorId, Vendor> = {
  qactions: {
    id: 'qactions',
    name: 'QActions',
    logo: `${BASE_PATH}/logos/qactions-white.png`,
    logoIsLight: true,
    website: 'https://qactions.com',
    tagline: 'QA, testing, ciberseguridad y RPA + IA para LATAM',
    categories: ['Software Testing', 'Ciberseguridad', 'RPA + IA', 'Data Management'],
  },
  tricentis: {
    id: 'tricentis',
    name: 'Tricentis',
    logo: `${BASE_PATH}/logos/tricentis.png`,
    logoIsLight: false,
    website: 'https://www.tricentis.com',
    tagline: 'Plataforma de calidad y testing continuo con IA',
    categories: ['Software Testing'],
  },
  veracode: {
    id: 'veracode',
    name: 'Veracode',
    logo: `${BASE_PATH}/logos/veracode.png`,
    logoIsLight: false,
    website: 'https://www.veracode.com',
    tagline: 'Gestión de riesgo y seguridad de aplicaciones',
    categories: ['Ciberseguridad'],
  },
  hcaptcha: {
    id: 'hcaptcha',
    name: 'hCaptcha',
    logo: `${BASE_PATH}/logos/hcaptcha.png`,
    logoIsLight: false,
    website: 'https://www.hcaptcha.com',
    tagline: 'Protección anti-bots y anti-fraude con privacidad',
    categories: ['Ciberseguridad'],
  },
  'automation-anywhere': {
    id: 'automation-anywhere',
    name: 'Automation Anywhere',
    logo: `${BASE_PATH}/logos/automation-anywhere.webp`,
    logoIsLight: false,
    logoTall: true,
    website: 'https://www.automationanywhere.com',
    tagline: 'Automatización agéntica de procesos (RPA + IA)',
    categories: ['RPA + IA'],
  },
  synthesized: {
    id: 'synthesized',
    name: 'Synthesized',
    logo: `${BASE_PATH}/logos/synthesized.png`,
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

export const QACTIONS_LOGO_ON_LIGHT = `${BASE_PATH}/logos/qactions-blue.png`;
