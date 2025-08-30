import type { AssessmentQuestion } from '../types';

export const demoQuestions: AssessmentQuestion[] = [
  {
    id: 'financial_planning',
    category: 'financial_discipline',
    type: 'slider',
    question: 'How often do you create and follow a monthly budget?',
    weight: 0.8,
    min: 0,
    max: 10,
    scoring: {
      '0-3': 2,
      '4-6': 5,
      '7-8': 8,
      '9-10': 10
    }
  },
  {
    id: 'saving_habits',
    category: 'financial_discipline',
    type: 'multiple-choice',
    question: 'What percentage of your income do you typically save each month?',
    weight: 0.9,
    options: [
      'Less than 5%',
      '5-10%',
      '10-20%',
      'More than 20%'
    ],
    scoring: {
      'Less than 5%': 3,
      '5-10%': 6,
      '10-20%': 8,
      'More than 20%': 10
    }
  },
  {
    id: 'business_vision',
    category: 'forward_thinking',
    type: 'rating',
    question: 'How clearly can you articulate your business goals for the next 5 years?',
    weight: 0.7,
    min: 1,
    max: 5,
    scoring: {
      '1': 2,
      '2': 4,
      '3': 6,
      '4': 8,
      '5': 10
    }
  },
  {
    id: 'innovation_adoption',
    category: 'forward_thinking',
    type: 'multiple-choice',
    question: 'How do you typically approach new technology in your business?',
    weight: 0.6,
    options: [
      'I avoid new technology',
      'I wait for others to try it first',
      'I adopt proven technologies',
      'I\'m an early adopter of new tech'
    ],
    scoring: {
      'I avoid new technology': 2,
      'I wait for others to try it first': 4,
      'I adopt proven technologies': 7,
      'I\'m an early adopter of new tech': 10
    }
  },
  {
    id: 'payment_reliability',
    category: 'reliability',
    type: 'slider',
    question: 'How often do you pay your bills on time?',
    weight: 1.0,
    min: 0,
    max: 10,
    scoring: {
      '0-5': 1,
      '6-7': 4,
      '8-9': 7,
      '10': 10
    }
  },
  {
    id: 'commitment_keeping',
    category: 'reliability',
    type: 'rating',
    question: 'When you make a commitment, how likely are you to follow through?',
    weight: 0.8,
    min: 1,
    max: 5,
    scoring: {
      '1': 2,
      '2': 4,
      '3': 6,
      '4': 8,
      '5': 10
    }
  },
  {
    id: 'ethical_decisions',
    category: 'character',
    type: 'multiple-choice',
    question: 'When faced with a difficult ethical decision in business, you:',
    weight: 0.9,
    options: [
      'Choose what\'s most profitable',
      'Consider multiple perspectives',
      'Always choose the ethical path',
      'Seek advice from mentors'
    ],
    scoring: {
      'Choose what\'s most profitable': 3,
      'Consider multiple perspectives': 7,
      'Always choose the ethical path': 10,
      'Seek advice from mentors': 8
    }
  },
  {
    id: 'community_impact',
    category: 'character',
    type: 'rating',
    question: 'How important is it for your business to have a positive impact on your community?',
    weight: 0.6,
    min: 1,
    max: 5,
    scoring: {
      '1': 3,
      '2': 5,
      '3': 6,
      '4': 8,
      '5': 10
    }
  }
];