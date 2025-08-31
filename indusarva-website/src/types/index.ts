// Navigation Types
export interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

// Hero Section Types
export interface HeroSectionProps {
  headline: string;
  subheading: string;
  ctaButton: {
    text: string;
    action: () => void;
  };
}

// Problem Statement Types
export interface ProblemStatementProps {
  statistics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  problemDescription: string;
}

// Solution Overview Types
export interface SolutionOverviewProps {
  pillars: Array<{
    title: string;
    description: string;
    icon: string;
    details: string[];
  }>;
}

// Interactive Demo Types
export interface InteractiveDemoProps {
  questions: Array<{
    id: string;
    type: 'slider' | 'multiple_choice' | 'rating';
    question: string;
    options?: string[];
    min?: number;
    max?: number;
  }>;
  onComplete: (responses: DemoResponse[]) => void;
}

export interface DemoResponse {
  questionId: string;
  value: number | string;
}

export interface ScoreResult {
  overallScore: number;
  breakdown: {
    financial_discipline: number;
    forward_thinking: number;
    reliability: number;
    character: number;
  };
  explanation: string;
}

// Assessment Question Types
export interface AssessmentQuestion {
  id: string;
  category: 'financial_discipline' | 'forward_thinking' | 'reliability' | 'character';
  type: 'slider' | 'multiple_choice' | 'rating';
  question: string;
  weight: number;
  options?: string[];
  min?: number;
  max?: number;
  scoring: {
    [key: string]: number;
  };
}

// Technology Stack Types
export interface TechnologyStackProps {
  technologies: Array<{
    category: string;
    items: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  }>;
}

// Team Profiles Types
export interface TeamProfilesProps {
  members: Array<{
    name: string;
    role: string;
    bio: string;
    experience: string[];
    image: string;
    linkedin?: string;
  }>;
}

// Contact Section Types
export interface ContactSectionProps {
  contactTypes: Array<{
    type: 'investor' | 'partner' | 'career';
    title: string;
    description: string;
    ctaText: string;
    action: () => void;
  }>;
}

// Contact Lead Types
export interface ContactLead {
  id: string;
  type: 'investor' | 'partner' | 'career' | 'general';
  name: string;
  email: string;
  company?: string;
  message: string;
  source: string;
  timestamp: Date;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

// Contact Information
export const CONTACT_INFO = {
  email: 'info@indusarva.co',
  phone: '+918851454169',
  company: 'IndusArva Innovations'
};