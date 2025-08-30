import React from 'react';
import { motion } from 'framer-motion';

interface SliderQuestionProps {
  question: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const SliderQuestion: React.FC<SliderQuestionProps> = ({
  question,
  value,
  onChange,
  min = 0,
  max = 10
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 text-center">{question}</h3>
      
      <div className="px-4">
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(value / max) * 100}%, #E5E7EB ${(value / max) * 100}%, #E5E7EB 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Never ({min})</span>
            <span>Always ({max})</span>
          </div>
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center mt-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
            <span className="text-2xl font-bold text-primary-600">{value}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  onChange: (option: string) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  selectedOption,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 text-center">{question}</h3>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onChange(option)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedOption === option
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedOption === option
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              }`}>
                {selectedOption === option && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">{option}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

interface RatingQuestionProps {
  question: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const RatingQuestion: React.FC<RatingQuestionProps> = ({
  question,
  value,
  onChange,
  min = 1,
  max = 5
}) => {
  const stars = Array.from({ length: max }, (_, i) => i + min);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 text-center">{question}</h3>
      
      <div className="flex justify-center space-x-2">
        {stars.map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(star)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-colors duration-200 ${
              star <= value
                ? 'bg-yellow-400 text-white'
                : 'bg-gray-200 text-gray-400 hover:bg-yellow-200'
            }`}
          >
            ⭐
          </motion.button>
        ))}
      </div>
      
      <div className="text-center">
        <div className="flex justify-between text-sm text-gray-500 max-w-xs mx-auto">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
        {value > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-lg font-semibold text-primary-600"
          >
            {value} / {max}
          </motion.div>
        )}
      </div>
    </div>
  );
};