import React from 'react';
import { motion } from 'framer-motion';
import type { ScoreResult } from '../../types';
import { getScoreColor, getScoreGrade } from '../../utils/scoringAlgorithm';
import RadarChart from '../ui/RadarChart';

interface ScoreResultsProps {
  scoreResult: ScoreResult;
  onRestart: () => void;
}

const ScoreResults: React.FC<ScoreResultsProps> = ({ scoreResult, onRestart }) => {
  const { overallScore, breakdown, explanation } = scoreResult;
  const scoreColor = getScoreColor(overallScore);
  const scoreGrade = getScoreGrade(overallScore);

  const categoryLabels = {
    financial_discipline: 'Financial Discipline',
    forward_thinking: 'Forward Thinking',
    reliability: 'Reliability',
    character: 'Character'
  };

  const getInsights = () => {
    const insights = [];
    
    Object.entries(breakdown).forEach(([category, score]) => {
      const label = categoryLabels[category as keyof typeof categoryLabels];
      
      if (score >= 80) {
        insights.push({
          type: 'strength',
          category: label,
          message: `Excellent ${label.toLowerCase()} demonstrates strong creditworthiness`
        });
      } else if (score < 60) {
        insights.push({
          type: 'improvement',
          category: label,
          message: `Improving ${label.toLowerCase()} could enhance your credit profile`
        });
      }
    });

    return insights;
  };

  const insights = getInsights();

  return (
    <section id="demo" className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Your FIN-GENIE Credit Assessment
            </h2>
            <p className="text-lg text-gray-600">
              Here's how our AI evaluates your creditworthiness based on behavioral intelligence
            </p>
          </motion.div>

          {/* Main Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Score Display */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  className="relative inline-block"
                >
                  <div 
                    className="w-48 h-48 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                    style={{ backgroundColor: `${scoreColor}20` }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(${scoreColor} ${overallScore * 3.6}deg, #E5E7EB ${overallScore * 3.6}deg)`
                      }}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <div className="relative z-10 text-center bg-white rounded-full w-36 h-36 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold" style={{ color: scoreColor }}>
                        {overallScore}
                      </div>
                      <div className="text-lg font-semibold text-gray-600">/ 100</div>
                      <div className="text-sm font-medium text-gray-500">Grade {scoreGrade}</div>
                    </div>
                  </div>
                </motion.div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Credit Score
                </h3>
                <p className="text-gray-600">
                  Based on behavioral intelligence analysis
                </p>
              </div>

              {/* Radar Chart */}
              <div className="flex justify-center">
                <RadarChart data={breakdown} size={280} />
              </div>
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Score Breakdown
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(breakdown).map(([category, score], index) => {
                const label = categoryLabels[category as keyof typeof categoryLabels];
                const color = getScoreColor(score);
                
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{label}</span>
                      <span className="font-bold" style={{ color }}>{score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Explanation and Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              AI Explanation
            </h3>
            
            <div className="bg-primary-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">{explanation}</p>
            </div>

            {insights.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Key Insights</h4>
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={`flex items-start space-x-3 p-4 rounded-lg ${
                      insight.type === 'strength' ? 'bg-green-50' : 'bg-yellow-50'
                    }`}
                  >
                    <div className="text-xl">
                      {insight.type === 'strength' ? '✅' : '💡'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{insight.category}</div>
                      <div className="text-sm text-gray-600">{insight.message}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center space-y-4"
          >
            <button
              onClick={onRestart}
              className="btn-secondary mr-4"
            >
              Take Assessment Again
            </button>
            
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              Learn More About FIN-GENIE
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              This demonstration shows how FIN-GENIE's AI analyzes behavioral patterns 
              to assess creditworthiness beyond traditional financial metrics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScoreResults;