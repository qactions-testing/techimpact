export type VendorId =
  | 'qactions'
  | 'tricentis'
  | 'veracode'
  | 'hcaptcha'
  | 'automation-anywhere'
  | 'synthesized';

export type Category = 'Software Testing' | 'Ciberseguridad' | 'RPA + IA' | 'Data Management';

export type Industry =
  | 'Banca'
  | 'Fintech'
  | 'Servicios Financieros'
  | 'Crypto Exchange'
  | 'Seguros'
  | 'Telecomunicaciones'
  | 'Retail'
  | 'E-commerce'
  | 'SaaS'
  | 'Tecnología'
  | 'Salud'
  | 'Life Sciences'
  | 'Minería'
  | 'Petróleo y Gas'
  | 'Energía'
  | 'Sector Público'
  | 'Educación'
  | 'Automotriz'
  | 'Agroindustria'
  | 'Gaming';

export interface Vendor {
  id: VendorId;
  name: string;
  /** Path under /public. Swap the file to update the logo everywhere. */
  logo: string;
  /** True when the logo artwork is light and must sit on a dark plate. */
  logoIsLight: boolean;
  /** Stacked (two-line) artwork that needs extra height to stay legible. */
  logoTall?: boolean;
  website: string;
  tagline: string;
  categories: Category[];
}

export interface Kpi {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  /** Who publishes the success story. */
  vendor: VendorId;
  /** Technology partner used in a QActions implementation, if any. */
  technology?: VendorId;
  category: Category;
  client: string;
  /** True when the source does not disclose the client's name. */
  anonymized?: boolean;
  industry: Industry;
  country?: string;
  title: string;
  summary: string;
  heroKpi: Kpi;
  kpis: Kpi[];
  painPoints: string[];
  benefits: string[];
  products: string[];
  quote?: { text: string; author: string };
  sources: { label: string; url: string }[];
  featured?: boolean;
  /**
   * QActions' own reading of the case (2-4 sentences): what it means for a
   * LATAM company and what QActions would do. Original content: this is what
   * makes the page worth ranking over the vendor's original.
   */
  qactionsTake?: string;
}

export interface UserProfile {
  name: string;
  company: string;
  country: string;
  industries: Industry[];
  categories: Category[];
}
