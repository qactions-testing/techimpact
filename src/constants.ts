import { CaseStudy } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'qactions-1',
    title: 'Cognitive QA Transformation',
    subtitle: '98% Risk Reduction',
    description: 'How a leading global bank secured their entire CI/CD pipeline using QActions autonomous testing engine.',
    industry: 'Banking',
    category: 'Autonomous Testing',
    impactValue: '98%',
    impactLabel: 'Risk Reduction',
    metrics: [
      { label: 'Security Coverage', value: '100%' },
      { label: 'ROI in 6 Months', value: '4.2x' }
    ],
    challenge: [
      'Fragile legacy scripts breaking with every UI update.',
      'Manual regression cycles taking 3 weeks per release.',
      'Lack of real-time visibility into test data integrity.'
    ],
    solution: [
      { title: 'Self-Healing AI', description: 'Implemented QActions proprietary engine to auto-update locators.' },
      { title: 'Synthetic Data Gen', description: 'Automated creation of compliant test data on-demand.' },
      { title: 'Predictive Analytics', description: 'Identified high-risk code areas before deployment.' }
    ],
    icon: 'Zap',
    color: 'teal',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bbdac8626ad1?auto=format&fit=crop&q=80&w=1200',
    logo: 'https://ais-dev-4fztccsjzzkyoqnug6s3uj-81252055133-input-file-0.run.app',
    brandLogo: 'https://logo.clearbit.com/qactions.com',
    links: {
      blog: 'https://qactions.com/blog/autonomous-banking',
      demo: 'https://qactions.com/request-demo',
      contact: 'https://qactions.com/contact'
    },
    gallery: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'tricentis-banking-1',
    title: 'Financial Release Velocity',
    subtitle: '75% Faster Delivery',
    description: 'How a leading financial institution revolutionized their release cycle with AI-driven continuous testing.',
    industry: 'Banking',
    category: 'Test Automation',
    impactValue: '75%',
    impactLabel: 'Faster Delivery',
    metrics: [
      { label: 'Release Cycle', value: '-75%' },
      { label: 'Test Coverage', value: '95%' }
    ],
    challenge: [
      'Manual testing bottlenecks delaying monthly releases.',
      'High cost of regression testing for core banking apps.',
      'Inconsistent test data across global environments.'
    ],
    solution: [
      { title: 'AI-Driven Testing', description: 'Automated complex end-to-end banking workflows.' },
      { title: 'Continuous QA', description: 'Integrated automated testing into the CI/CD pipeline.' }
    ],
    icon: 'Zap',
    color: 'blue',
    bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    brandLogo: 'https://logo.clearbit.com/tricentis.com',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'hcaptcha-1',
    title: 'Global Bot Mitigation',
    subtitle: '99% Bot Detection',
    description: 'hCaptcha Enterprise protected a global e-commerce platform from massive credential stuffing attacks while maintaining a seamless user experience.',
    industry: 'Technology',
    category: 'Cybersecurity',
    impactValue: '99%',
    impactLabel: 'Bot Detection',
    metrics: [
      { label: 'False Positives', value: '<0.1%' },
      { label: 'Cost Savings', value: '$1.2M/mo' }
    ],
    challenge: [
      'Sophisticated bot networks bypassing traditional CAPTCHAs.',
      'High user friction leading to cart abandonment.',
      'Privacy concerns with data harvesting by other providers.'
    ],
    solution: [
      { title: 'Privacy-First AI', description: 'Advanced bot detection without tracking users.' },
      { title: 'Adaptive Challenges', description: 'Dynamic difficulty scaling based on risk scores.' }
    ],
    icon: 'ShieldCheck',
    color: 'indigo',
    bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    brandLogo: 'https://logo.clearbit.com/hcaptcha.com',
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1510511459019-5dee99c48db8?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'synthesized-1',
    title: 'Data Privacy at Scale',
    subtitle: '100% Compliant Data',
    description: 'Synthesized enabled a major healthcare provider to generate high-fidelity synthetic patient data for research, reducing data access time from months to minutes.',
    industry: 'Healthcare',
    category: 'Data Engineering',
    impactValue: '100%',
    impactLabel: 'Compliance',
    metrics: [
      { label: 'Data Access Time', value: '-95%' },
      { label: 'Research Velocity', value: '3x' }
    ],
    challenge: [
      'Strict HIPAA regulations delaying access to real patient data.',
      'Risk of data leaks when sharing sensitive information with researchers.',
      'Incomplete datasets hindering medical AI development.'
    ],
    solution: [
      { title: 'Generative AI Data', description: 'Created statistically accurate synthetic datasets.' },
      { title: 'Auto-Anonymization', description: 'Automated removal of PII from production data streams.' }
    ],
    icon: 'Zap',
    color: 'emerald',
    bgImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    brandLogo: 'https://logo.clearbit.com/synthesized.io',
    gallery: [
      'https://images.unsplash.com/photo-1532187863486-abf51ad990de?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1504868584819-f8eec0b6d730?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'tricentis-1',
    title: 'SAP S/4HANA Migration',
    subtitle: '10x Faster Testing',
    description: 'A global manufacturing giant accelerated their SAP migration by 10x using Tricentis Tosca\'s model-based test automation.',
    industry: 'Manufacturing',
    category: 'Enterprise Automation',
    impactValue: '10x',
    impactLabel: 'Faster Delivery',
    metrics: [
      { label: 'Risk Coverage', value: '90%+' },
      { label: 'Cost Savings', value: '$2.4M' }
    ],
    challenge: [
      'Complex SAP customizations requiring extensive manual validation.',
      'High risk of business process disruption during migration.',
      'Lack of integration between dev and QA teams.'
    ],
    solution: [
      { title: 'Model-Based QA', description: 'Created reusable test components without writing code.' },
      { title: 'Risk-Based Analysis', description: 'Prioritized tests based on business impact.' }
    ],
    icon: 'Zap',
    color: 'blue',
    bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    brandLogo: 'https://logo.clearbit.com/tricentis.com',
    gallery: [
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'veracode-1',
    title: 'DevSecOps at Scale',
    subtitle: '60% Faster Fixes',
    description: 'Veracode helped a major software provider integrate security into their IDE, reducing time-to-fix by 60% and preventing 1.2M vulnerabilities.',
    industry: 'Technology',
    category: 'Application Security',
    impactValue: '60%',
    impactLabel: 'Faster Remediation',
    metrics: [
      { label: 'Vulnerabilities Blocked', value: '1.2M' },
      { label: 'Dev Adoption', value: '95%' }
    ],
    challenge: [
      'Security being a bottleneck at the end of the SDLC.',
      'Developers lacking security expertise for complex fixes.',
      'High volume of open-source library vulnerabilities.'
    ],
    solution: [
      { title: 'Static Analysis (SAST)', description: 'Real-time feedback directly in the developer IDE.' },
      { title: 'Software Composition', description: 'Automated scanning of third-party libraries.' }
    ],
    icon: 'ShieldCheck',
    color: 'emerald',
    bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    brandLogo: 'https://logo.clearbit.com/veracode.com',
    gallery: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'automation-anywhere-1',
    title: 'Healthcare Claims RPA',
    subtitle: '85% Process Speedup',
    description: 'Automation Anywhere deployed digital workers to process healthcare claims, reducing processing time from 12 minutes to 45 seconds.',
    industry: 'Healthcare',
    category: 'Intelligent RPA',
    impactValue: '85%',
    impactLabel: 'Efficiency Gain',
    metrics: [
      { label: 'Accuracy', value: '99.9%' },
      { label: 'Manual Hours Saved', value: '40k/yr' }
    ],
    challenge: [
      'Massive backlog of manual insurance claims.',
      'High error rates in data entry leading to rejections.',
      'Strict HIPAA compliance requirements for data handling.'
    ],
    solution: [
      { title: 'IQ Bot', description: 'Extracted data from unstructured medical forms using AI.' },
      { title: 'Digital Workers', description: '24/7 automated processing of claims across systems.' }
    ],
    icon: 'Bot',
    color: 'purple',
    bgImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    brandLogo: 'https://logo.clearbit.com/automationanywhere.com',
    gallery: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=600'
    ]
  }
];
