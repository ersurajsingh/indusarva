import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { SolutionOverviewProps } from '../../types';

const SolutionSection: React.FC<SolutionOverviewProps> = ({ pillars }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  const togglePillar = (index: number) => {
    setExpandedPillar(expandedPillar === index ? null : index);
  };

  const pillarIcons = {
    'Gamified Psychometric Assessment': '🎮',
    'Behavioral Intelligence': '🧠',
    'Explainable AI': '🔍'
  };

  return (
    <section id="solution" className="section-padding bg-white">
      <div className="container-custom">
        <div ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              FIN-GENIE: <span className="gradient-text">Beyond the Balance Sheet</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our revolutionary AI-powered platform transforms credit assessment by analyzing 
              behavioral patterns, character traits, and forward-thinking capabilities that 
              traditional scoring models completely miss.
            </p>
          </motion.div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    expandedPillar === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                  onClick={() => togglePillar(index)}
                >
                  {/* Card Header */}
                  <div className="p-8">
                    <div className="text-6xl mb-4 text-center">
                      {pillarIcons[pillar.title as keyof typeof pillarIcons] || '⚡'}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4 text-center">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Expandable Details */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedPillar === index ? 'auto' : 0,
                      opacity: expandedPillar === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 border-t border-gray-100">
                      <div className="pt-6 space-y-3">
                        {pillar.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detailIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={expandedPillar === index ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{detail}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Expand/Collapse Indicator */}
                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      animate={{ rotate: expandedPillar === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 text-primary-500"
                    >
                      ↓
                    </motion.div>
                  </div>

                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* How It Works Flow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-semibold text-center text-gray-900 mb-12">
              How FIN-GENIE Works
            </h3>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Engage',
                  description: 'User completes our gamified assessment on their mobile device',
                  icon: '📱'
                },
                {
                  step: '02',
                  title: 'Analyze',
                  description: 'AI processes behavioral patterns and device metadata',
                  icon: '🔄'
                },
                {
                  step: '03',
                  title: 'Score',
                  description: 'Generate comprehensive creditworthiness score',
                  icon: '📊'
                },
                {
                  step: '04',
                  title: 'Explain',
                  description: 'Provide transparent, understandable score breakdown',
                  icon: '💡'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  className="text-center relative"
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-sm font-bold text-primary-600 mb-2">STEP {step.step}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-8">
              Why FIN-GENIE is Revolutionary
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Inclusive', description: 'Serves credit-invisible populations', icon: '🌍' },
                { title: 'Fast', description: 'Real-time assessment and scoring', icon: '⚡' },
                { title: 'Transparent', description: 'Explainable AI builds trust', icon: '🔍' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;