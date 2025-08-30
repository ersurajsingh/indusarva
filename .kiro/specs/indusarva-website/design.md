# Design Document

## Overview

The IndusArva Innovations website is a single-page application (SPA) designed as a strategic digital prospectus. It combines compelling storytelling with interactive demonstrations to showcase FIN-GENIE's capabilities. The design emphasizes a futuristic, clean aesthetic that reflects our position as a next-generation AI and fintech startup while maintaining professional credibility for sophisticated audiences.

## Architecture

### Frontend Architecture
- **Framework**: React.js with TypeScript for type safety and maintainability
- **Styling**: Tailwind CSS for rapid, consistent styling with custom design system
- **Animations**: Framer Motion for smooth, professional animations and transitions
- **Charts/Visualizations**: D3.js or Chart.js for the interactive radar chart and score visualizations
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop

### Backend Architecture
- **API Layer**: Node.js with Express.js for lightweight backend services
- **Demo Logic**: Serverless functions (Vercel/Netlify) for processing demo interactions
- **Contact Forms**: Integration with email service (SendGrid/Mailgun) and CRM
- **Analytics**: Google Analytics 4 and custom event tracking for user engagement

### Hosting & Deployment
- **Static Hosting**: Vercel or Netlify for optimal performance and CDN distribution
- **Domain**: Custom domain with SSL certificate
- **Performance**: Lighthouse score targets of 90+ for all metrics

## Components and Interfaces

### 1. Navigation Component
```typescript
interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}
```
- Fixed header with logo and section navigation
- Smooth scroll to sections with active state indicators
- Mobile hamburger menu with slide-out navigation

### 2. Hero Section Component
```typescript
interface HeroSectionProps {
  headline: string;
  subheading: string;
  ctaButton: {
    text: string;
    action: () => void;
  };
}
```
- Full viewport height with gradient background
- Animated headline with typewriter effect
- Floating geometric elements for visual interest
- Call-to-action button leading to demo section

### 3. Problem Statement Component
```typescript
interface ProblemStatementProps {
  statistics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  problemDescription: string;
}
```
- Split layout with statistics on left, narrative on right
- Animated counters for key statistics
- Visual icons representing SME challenges

### 4. Solution Overview Component
```typescript
interface SolutionOverviewProps {
  pillars: Array<{
    title: string;
    description: string;
    icon: string;
    details: string[];
  }>;
}
```
- Three-column layout for the core pillars
- Interactive cards with hover effects
- Progressive disclosure of technical details
- Visual icons for each pillar (gamification, AI, transparency)

### 5. Interactive Demo Component
```typescript
interface InteractiveDemoProps {
  questions: Array<{
    id: string;
    type: 'slider' | 'multiple-choice' | 'rating';
    question: string;
    options?: string[];
    min?: number;
    max?: number;
  }>;
  onComplete: (responses: DemoResponse[]) => void;
}

interface DemoResponse {
  questionId: string;
  value: number | string;
}

interface ScoreResult {
  overallScore: number;
  breakdown: {
    financial_discipline: number;
    forward_thinking: number;
    reliability: number;
    character: number;
  };
  explanation: string;
}
```
- Multi-step form with progress indicator
- Various input types (sliders, buttons, rating scales)
- Real-time validation and smooth transitions
- Score calculation and radar chart visualization
- Explainable AI breakdown with clear explanations

### 6. Technology Stack Component
```typescript
interface TechnologyStackProps {
  technologies: Array<{
    category: string;
    items: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  }>;
}
```
- Grid layout showcasing key technologies
- Hover effects revealing additional details
- Visual representation of architecture flow

### 7. Team Profiles Component
```typescript
interface TeamProfilesProps {
  members: Array<{
    name: string;
    role: string;
    bio: string;
    experience: string[];
    image: string;
    linkedin?: string;
  }>;
}
```
- Card-based layout with professional photos
- Expandable experience details
- Social media links
- Emphasis on relevant fintech/AI experience

### 8. Contact Section Component
```typescript
interface ContactSectionProps {
  contactTypes: Array<{
    type: 'investor' | 'partner' | 'career';
    title: string;
    description: string;
    ctaText: string;
    action: () => void;
  }>;
}
```
- Multiple contact pathways for different audiences
- Contact form with validation
- Direct email/phone options
- Integration with CRM for lead tracking

## Data Models

### Demo Assessment Model
```typescript
interface AssessmentQuestion {
  id: string;
  category: 'financial_discipline' | 'forward_thinking' | 'reliability' | 'character';
  type: 'slider' | 'multiple_choice' | 'rating';
  question: string;
  weight: number;
  options?: string[];
  scoring: {
    [key: string]: number;
  };
}

interface UserResponse {
  sessionId: string;
  responses: DemoResponse[];
  timestamp: Date;
  userAgent: string;
}

interface CreditScore {
  sessionId: string;
  overallScore: number;
  categoryScores: {
    financial_discipline: number;
    forward_thinking: number;
    reliability: number;
    character: number;
  };
  explanation: {
    strengths: string[];
    improvements: string[];
    reasoning: string;
  };
}
```

### Contact Lead Model
```typescript
interface ContactLead {
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
```

### Contact Information
```typescript
const CONTACT_INFO = {
  email: 'info@indusarva.co',
  phone: '+918851454169',
  company: 'IndusArva Innovations'
};
```

## Error Handling

### Frontend Error Handling
- **Network Errors**: Graceful fallbacks with retry mechanisms
- **Form Validation**: Real-time validation with clear error messages
- **Demo Failures**: Fallback to static demo or contact form
- **Loading States**: Skeleton screens and progress indicators

### Backend Error Handling
- **API Errors**: Structured error responses with appropriate HTTP status codes
- **Rate Limiting**: Protection against spam and abuse
- **Data Validation**: Server-side validation for all inputs
- **Monitoring**: Error tracking with Sentry or similar service

### Error Recovery Strategies
```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  errorCode?: string;
}

// Fallback UI for critical failures
const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => (
  <div className="error-fallback">
    <h2>Something went wrong</h2>
    <p>We're working to fix this issue. Please try again.</p>
    <button onClick={resetError}>Try Again</button>
    <a href="mailto:info@indusarva.co">Contact Support</a>
  </div>
);
```

## Testing Strategy

### Unit Testing
- **Component Testing**: Jest + React Testing Library for all React components
- **Utility Functions**: Unit tests for scoring algorithms and data processing
- **API Endpoints**: Supertest for backend API testing
- **Coverage Target**: 80%+ code coverage

### Integration Testing
- **Demo Flow**: End-to-end testing of complete assessment process
- **Form Submissions**: Testing contact form integration with email services
- **Cross-browser**: Testing on Chrome, Firefox, Safari, Edge
- **Device Testing**: Responsive design testing on various screen sizes

### Performance Testing
- **Lighthouse Audits**: Automated performance, accessibility, and SEO testing
- **Load Testing**: API endpoint performance under load
- **Bundle Analysis**: Monitoring JavaScript bundle size and optimization

### User Experience Testing
- **Accessibility**: WCAG 2.1 AA compliance testing
- **Usability**: Task completion rates for key user flows
- **A/B Testing**: Different versions of key sections (hero, demo, contact)

### Testing Tools
```json
{
  "unit": ["Jest", "React Testing Library"],
  "integration": ["Cypress", "Playwright"],
  "performance": ["Lighthouse CI", "WebPageTest"],
  "accessibility": ["axe-core", "WAVE"],
  "monitoring": ["Sentry", "Google Analytics"]
}
```

## Design System

### Color Palette
- **Primary**: Deep blue (#1E40AF) - Trust and professionalism
- **Secondary**: Electric blue (#3B82F6) - Innovation and technology
- **Accent**: Emerald green (#10B981) - Growth and success
- **Neutral**: Gray scale (#F8FAFC to #1F2937)
- **Gradients**: Blue to purple for hero sections, subtle gradients for cards

### Typography
- **Headings**: Inter or Poppins - Modern, clean sans-serif
- **Body**: Inter - Excellent readability across devices
- **Code/Technical**: JetBrains Mono - For technical specifications

### Spacing & Layout
- **Grid System**: 12-column responsive grid
- **Spacing Scale**: 4px base unit (4, 8, 16, 24, 32, 48, 64, 96px)
- **Container**: Max-width 1200px with responsive padding
- **Section Spacing**: Consistent vertical rhythm between sections

### Animation Principles
- **Duration**: 200-300ms for micro-interactions, 500-800ms for section transitions
- **Easing**: Custom cubic-bezier curves for natural motion
- **Scroll Animations**: Intersection Observer for performance-optimized reveals
- **Loading States**: Skeleton screens and progressive loading

This design provides a solid foundation for building a professional, engaging website that effectively communicates IndusArva's value proposition while providing an interactive demonstration of FIN-GENIE's capabilities.