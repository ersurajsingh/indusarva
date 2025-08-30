import { DemoResponse, ScoreResult, AssessmentQuestion } from '../types';

export const calculateScore = (
  responses: DemoResponse[],
  questions: AssessmentQuestion[]
): ScoreResult => {
  const categoryScores = {
    financial_discipline: 0,
    forward_thinking: 0,
    reliability: 0,
    character: 0
  };

  const categoryCounts = {
    financial_discipline: 0,
    forward_thinking: 0,
    reliability: 0,
    character: 0
  };

  // Calculate weighted scores for each category
  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId);
    if (!question) return;

    let score = 0;
    
    if (question.type === 'slider' || question.type === 'rating') {
      const value = Number(response.value);
      // Find the appropriate scoring range
      for (const [range, points] of Object.entries(question.scoring)) {
        if (range.includes('-')) {
          const [min, max] = range.split('-').map(Number);
          if (value >= min && value <= max) {
            score = points;
            break;
          }
        } else if (Number(range) === value) {
          score = points;
          break;
        }
      }
    } else if (question.type === 'multiple_choice') {
      score = question.scoring[String(response.value)] || 0;
    }

    // Apply weight and add to category
    const weightedScore = score * question.weight;
    categoryScores[question.category] += weightedScore;
    categoryCounts[question.category] += question.weight;
  });

  // Normalize scores to 0-100 scale
  Object.keys(categoryScores).forEach(category => {
    const cat = category as keyof typeof categoryScores;
    if (categoryCounts[cat] > 0) {
      categoryScores[cat] = Math.round((categoryScores[cat] / categoryCounts[cat]) * 10);
    }
  });

  // Calculate overall score (weighted average)
  const weights = {
    financial_discipline: 0.3,
    forward_thinking: 0.25,
    reliability: 0.3,
    character: 0.15
  };

  const overallScore = Math.round(
    Object.entries(categoryScores).reduce((total, [category, score]) => {
      const weight = weights[category as keyof typeof weights];
      return total + (score * weight);
    }, 0) * 10
  );

  // Generate explanation
  const explanation = generateExplanation(categoryScores, overallScore);

  return {
    overallScore,
    breakdown: categoryScores,
    explanation
  };
};

const generateExplanation = (
  categoryScores: { [key: string]: number },
  overallScore: number
): string => {
  const strengths: string[] = [];
  const improvements: string[] = [];

  Object.entries(categoryScores).forEach(([category, score]) => {
    const categoryName = category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    if (score >= 80) {
      strengths.push(categoryName);
    } else if (score < 60) {
      improvements.push(categoryName);
    }
  });

  let explanation = `Your creditworthiness score of ${overallScore}/100 indicates `;
  
  if (overallScore >= 80) {
    explanation += "excellent credit potential. ";
  } else if (overallScore >= 70) {
    explanation += "good credit potential. ";
  } else if (overallScore >= 60) {
    explanation += "moderate credit potential. ";
  } else {
    explanation += "developing credit potential. ";
  }

  if (strengths.length > 0) {
    explanation += `Your strongest areas are ${strengths.join(' and ')}.`;
  }

  if (improvements.length > 0) {
    explanation += ` Areas for improvement include ${improvements.join(' and ')}.`;
  }

  return explanation;
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10B981'; // Green
  if (score >= 70) return '#F59E0B'; // Yellow
  if (score >= 60) return '#F97316'; // Orange
  return '#EF4444'; // Red
};

export const getScoreGrade = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};