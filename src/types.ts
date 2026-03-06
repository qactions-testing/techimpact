export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  industry: Industry;
  category: string;
  impactValue: string;
  impactLabel: string;
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string[];
  solution: {
    title: string;
    description: string;
  }[];
  icon: string;
  color: string;
  bgImage?: string;
  logo?: string;
  brandLogo?: string;
  links?: {
    blog?: string;
    demo?: string;
    contact?: string;
  };
  gallery?: string[];
}

export type Industry = 
  | 'All' 
  | 'Banking' 
  | 'Fintech' 
  | 'Healthcare' 
  | 'Retail' 
  | 'Manufacturing' 
  | 'Technology' 
  | 'Mining, Oil & Energy';

export interface UserProfile {
  name: string;
  location: string;
  interests: Industry[];
}
