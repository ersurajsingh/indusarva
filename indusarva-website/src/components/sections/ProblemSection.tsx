import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProblemStatementProps } from '../../types';

const ProblemSection: React.FC<ProblemStatementProps> = ({ statistics, problemDescription }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const AnimatedCounter: React.FC<{ value: string; label: string; description: string; delay: number }> = ({
    value,
    label,
    description,
    delay
  }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => {
          let start = 0;
          const increment = numericValue / 50;
          const counter = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
              setCount(numericValue);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 30);
        }, delay);

        return () => clearTimeout(timer);
      }
    }, [isInView, numericValue, delay]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay / 1000 }}
        className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
          {count}{suffix}
        </div>
        <div className="text-lg font-semibold text-gray-800 mb-2">{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </motion.div>
    );
  };

  const problemPoints = [
    {
      icon: "🏦",
      title: "Traditional Credit Barriers",
      description: "Banks rely on outdated credit scoring models that exclude millions of entrepreneurs"
    },
    {
      icon: "📊",
      title: "Limited Financial History",
      description: "SMEs often lack the extensive financial records required by conventional lenders"
    },
    {
      icon: "⏰",
      title: "Slow Decision Making",
      description: "Lengthy approval processes that can take weeks or months, hindering business growth"
    },
    {
      icon: "🌍",
      title: "Global Economic Impact",
      description: "Credit invisibility affects economic growth and job creation worldwide"
    }
  ];

  return (
    <section id="problem" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Statistics Side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                The Credit Invisibility Crisis
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Millions of entrepreneurs worldwide are trapped in a cycle of credit invisibility, 
                unable to access the funding they need to grow their businesses and contribute to economic development.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {statistics.map((stat, index) => (
                <AnimatedCounter
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>

          {/* Problem Description Side */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                Why Traditional Credit Scoring Fails
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {problemDescription}
              </p>

              <div className="space-y-4">
                {problemPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                  >
                    <div className="text-2xl">{point.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{point.title}</h4>
                      <p className="text-sm text-gray-600">{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center p-6 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-xl text-white"
            >
              <h4 className="text-xl font-semibold mb-2">The Solution is Here</h4>
              <p className="text-primary-100">
                FIN-GENIE revolutionizes credit assessment with AI-powered behavioral analysis
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;