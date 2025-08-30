import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveDemoProps, DemoResponse } from '../../types';
import { SliderQuestion, MultipleChoiceQuestion, RatingQuestion } from '../ui/QuestionComponents';

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<DemoResponse[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleResponse = (value: number | string) => {
    const newResponse: DemoResponse = {
      questionId: currentQuestion.id,
      value
    };

    const updatedResponses = responses.filter(r => r.questionId !== currentQuestion.id);
    updatedResponses.push(newResponse);
    setResponses(updatedResponses);
  };

  const getCurrentResponse = () => {
    return responses.find(r => r.questionId === currentQuestion.id)?.value;
  };

  const canProceed = () => {
    const currentResponse = getCurrentResponse();
    return currentResponse !== undefined && currentResponse !== null;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <section id="demo" className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Experience <span className="gradient-text">FIN-GENIE</span> Yourself
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Take our interactive assessment to see how FIN-GENIE evaluates creditworthiness 
              through behavioral intelligence and character analysis.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⏱️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">5 Minutes</h3>
                  <p className="text-sm text-gray-600">Quick and engaging assessment</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">8 Questions</h3>
                  <p className="text-sm text-gray-600">Covering key behavioral traits</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
                  <p className="text-sm text-gray-600">See your score breakdown immediately</p>
                </div>
              </div>

              <motion.button
                onClick={handleStart}
                className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Assessment
                <span className="ml-2">🚀</span>
              </motion.button>
            </div>

            <p className="text-sm text-gray-500">
              This is a demonstration. No personal data is collected or stored.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo" className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="bg-white rounded-t-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-semibold text-gray-900">
                FIN-GENIE Assessment
              </h2>
              <button
                onClick={handleRestart}
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                Restart
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white shadow-lg">
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentQuestion.type === 'slider' && (
                    <SliderQuestion
                      question={currentQuestion.question}
                      value={Number(getCurrentResponse()) || 0}
                      onChange={handleResponse}
                      min={currentQuestion.min}
                      max={currentQuestion.max}
                    />
                  )}
                  
                  {currentQuestion.type === 'multiple-choice' && (
                    <MultipleChoiceQuestion
                      question={currentQuestion.question}
                      options={currentQuestion.options || []}
                      selectedOption={String(getCurrentResponse()) || null}
                      onChange={handleResponse}
                    />
                  )}
                  
                  {currentQuestion.type === 'rating' && (
                    <RatingQuestion
                      question={currentQuestion.question}
                      value={Number(getCurrentResponse()) || 0}
                      onChange={handleResponse}
                      min={currentQuestion.min}
                      max={currentQuestion.max}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white rounded-b-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>

              <motion.button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={canProceed() ? { scale: 1.05 } : {}}
                whileTap={canProceed() ? { scale: 0.95 } : {}}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Get Results' : 'Next'} →
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;