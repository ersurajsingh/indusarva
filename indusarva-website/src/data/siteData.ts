import { 
  ProblemStatementProps, 
  SolutionOverviewProps, 
  TechnologyStackProps, 
  TeamProfilesProps, 
  ContactSectionProps 
} from '../types';

export const problemData: ProblemStatementProps = {
  statistics: [
    {
      value: '1B+',
      label: 'Credit Invisible SMEs',
      description: 'Entrepreneurs worldwide lack access to traditional credit'
    },
    {
      value: '70%',
      label: 'Loan Rejections',
      description: 'Of SME loan applications are rejected by traditional banks'
    },
    {
      value: '$5T',
      label: 'Credit Gap',
      description: 'Annual global SME financing gap according to IFC'
    },
    {
      value: '200M',
      label: 'Jobs at Risk',
      description: 'Potential jobs that could be created with better access to credit'
    }
  ],
  problemDescription: `Traditional credit scoring systems rely heavily on historical financial data, credit history, and collateral - resources that many small and medium enterprises (SMEs) simply don't have. This creates a vicious cycle where creditworthy entrepreneurs are denied funding not because they lack the ability to repay, but because they lack the traditional markers that banks look for. The result is a massive global credit gap that stifles innovation, limits economic growth, and perpetuates inequality.`
};

export const solutionData: SolutionOverviewProps = {
  pillars: [
    {
      title: 'Gamified Psychometric Assessment',
      description: 'Interactive mobile experience that captures character traits, financial discipline, and decision-making patterns through engaging game-like assessments.',
      icon: '🎮',
      details: [
        'Behavioral pattern recognition through interactive scenarios',
        'Financial discipline assessment via decision-making games',
        'Character trait evaluation through ethical dilemmas',
        'Forward-thinking measurement via planning exercises',
        'Mobile-first design for accessibility and engagement'
      ]
    },
    {
      title: 'Behavioral Intelligence',
      description: 'Privacy-preserving analysis of device metadata and digital footprints to provide real-time, objective insights into reliability and consistency.',
      icon: '🧠',
      details: [
        'Device usage patterns indicating reliability',
        'App interaction data showing financial behavior',
        'Communication patterns reflecting business acumen',
        'Location data for business verification',
        'Privacy-by-design with encrypted data processing'
      ]
    },
    {
      title: 'Explainable AI',
      description: 'Transparent AI system that provides clear, understandable explanations for every credit decision, building trust with both lenders and borrowers.',
      icon: '🔍',
      details: [
        'Clear breakdown of score components',
        'Visual representations of decision factors',
        'Plain-language explanations of AI reasoning',
        'Bias detection and mitigation systems',
        'Regulatory compliance and audit trails'
      ]
    }
  ]
};

export const technologyData: TechnologyStackProps = {
  technologies: [
    {
      category: 'AI & Machine Learning',
      items: [
        {
          name: 'TensorFlow',
          description: 'Advanced neural networks for behavioral pattern recognition',
          icon: '🧠'
        },
        {
          name: 'PyTorch',
          description: 'Deep learning models for credit risk assessment',
          icon: '🔥'
        },
        {
          name: 'Scikit-learn',
          description: 'Traditional ML algorithms for baseline comparisons',
          icon: '📊'
        }
      ]
    },
    {
      category: 'Backend Infrastructure',
      items: [
        {
          name: 'Node.js',
          description: 'High-performance server-side JavaScript runtime',
          icon: '🟢'
        },
        {
          name: 'Python',
          description: 'AI/ML processing and data analysis',
          icon: '🐍'
        },
        {
          name: 'GraphQL',
          description: 'Efficient API queries and real-time updates',
          icon: '📡'
        }
      ]
    },
    {
      category: 'Security & Privacy',
      items: [
        {
          name: 'Zero-Knowledge Architecture',
          description: 'Process data without storing sensitive information',
          icon: '🔒'
        },
        {
          name: 'End-to-End Encryption',
          description: '256-bit encryption for all data transmission',
          icon: '🛡️'
        },
        {
          name: 'GDPR Compliance',
          description: 'Full compliance with global privacy regulations',
          icon: '⚖️'
        }
      ]
    },
    {
      category: 'Cloud & DevOps',
      items: [
        {
          name: 'Kubernetes',
          description: 'Container orchestration for scalable deployments',
          icon: '☸️'
        },
        {
          name: 'Docker',
          description: 'Containerized applications for consistency',
          icon: '🐳'
        },
        {
          name: 'Multi-Cloud',
          description: 'AWS, Azure, GCP support for global reach',
          icon: '☁️'
        }
      ]
    }
  ]
};

export const teamData: TeamProfilesProps = {
  members: [
    {
      name: 'Suraj Kumar Singh',
      role: 'Co-Founder & CEO',
      bio: 'Visionary leader with extensive experience in fintech innovation and AI-driven financial solutions. Former senior executive at Paytm, where he led initiatives serving millions of users.',
      experience: [
        'Senior Vice President at Paytm - Led digital lending and credit assessment initiatives',
        'Scaled financial products serving 100M+ users across India',
        'Expert in regulatory compliance and fintech product development',
        'Pioneer in mobile-first financial services and digital payments',
        'MBA in Finance with specialization in emerging markets'
      ],
      image: '',
      linkedin: 'https://linkedin.com/in/surajkumarsingh'
    },
    {
      name: 'Rahul Pandey',
      role: 'Co-Founder & CTO',
      bio: 'Technology architect and AI specialist with deep expertise in machine learning and financial systems. Former technology leader at Maybank, one of Southeast Asia\'s largest banks.',
      experience: [
        'Chief Technology Officer at Maybank Digital - Architected next-gen banking platforms',
        'Led AI/ML initiatives for credit risk assessment and fraud detection',
        'Built scalable systems processing millions of transactions daily',
        'Expert in cloud architecture, security, and regulatory technology',
        'MS in Computer Science with focus on Machine Learning and AI'
      ],
      image: '',
      linkedin: 'https://linkedin.com/in/rahulpandey'
    }
  ]
};

export const contactData: ContactSectionProps = {
  contactTypes: [
    {
      type: 'investor',
      title: 'Investment Opportunities',
      description: 'Join us in revolutionizing credit assessment and building the future of inclusive finance.',
      ctaText: 'Explore Investment',
      action: () => {}
    },
    {
      type: 'partner',
      title: 'Banking Partnerships',
      description: 'Partner with us to expand your lending capabilities and serve previously underbanked populations.',
      ctaText: 'Discuss Partnership',
      action: () => {}
    },
    {
      type: 'career',
      title: 'Career Opportunities',
      description: 'Join our mission-driven team and help build technology that creates financial inclusion worldwide.',
      ctaText: 'View Opportunities',
      action: () => {}
    }
  ]
};