import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { TechnologyStackProps } from '../../types';

const TechnologySection: React.FC<TechnologyStackProps> = ({ technologies }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section id="technology" className="section-padding bg-gray-50">
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
              Built for the <span className="gradient-text">Future</span>, Designed for Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our cutting-edge technology stack ensures scalability, security, and privacy-by-design 
              while delivering lightning-fast credit assessments that work anywhere in the world.
            </p>
          </motion.div>

          {/* Technology Categories */}
          <div className="space-y-12">
            {technologies.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-8 text-center">
                  {category.category}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.2 + techIndex * 0.1 }}
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setHoveredTech(`${category.category}-${tech.name}`)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 h-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                        <div className="text-4xl mb-4 text-center">{tech.icon}</div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                          {tech.name}
                        </h4>
                        <p className="text-sm text-gray-600 text-center leading-relaxed">
                          {tech.description}
                        </p>
                        
                        {/* Hover Details */}
                        {hoveredTech === `${category.category}-${tech.name}` && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-0 bg-primary-600 rounded-xl p-6 text-white flex items-center justify-center"
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-2">{tech.icon}</div>
                              <div className="font-semibold mb-2">{tech.name}</div>
                              <div className="text-sm opacity-90">{tech.description}</div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Architecture Flow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <h3 className="text-2xl font-heading font-semibold text-center text-gray-900 mb-12">
              FIN-GENIE Architecture Flow
            </h3>

            <div className="grid md:grid-cols-5 gap-4 items-center">
              {[
                { icon: '📱', label: 'Mobile App', desc: 'User Interface' },
                { icon: '🔄', label: 'API Gateway', desc: 'Request Processing' },
                { icon: '🧠', label: 'AI Engine', desc: 'Behavioral Analysis' },
                { icon: '🔒', label: 'Secure Storage', desc: 'Data Protection' },
                { icon: '📊', label: 'Score Output', desc: 'Results Delivery' }
              ].map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      {step.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{step.label}</h4>
                    <p className="text-xs text-gray-600">{step.desc}</p>
                  </motion.div>
                  
                  {index < 4 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      className="hidden md:block h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 origin-left"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-heading font-semibold text-center text-gray-900 mb-8">
              Why Our Technology Matters
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🌐',
                  title: 'Cloud-Agnostic',
                  description: 'Deploy anywhere - AWS, Azure, Google Cloud, or on-premises',
                  features: ['Multi-cloud support', 'Easy migration', 'Vendor independence']
                },
                {
                  icon: '🔒',
                  title: 'Privacy-by-Design',
                  description: 'Built-in privacy protection with zero-knowledge architecture',
                  features: ['Data encryption', 'Minimal data collection', 'GDPR compliant']
                },
                {
                  icon: '⚡',
                  title: 'Lightning Fast',
                  description: 'Real-time processing with sub-second response times',
                  features: ['Edge computing', 'Optimized algorithms', 'Cached results']
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 mb-4 text-center">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-heading font-semibold mb-8">
              Performance That Scales
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { metric: '<500ms', label: 'Response Time' },
                { metric: '99.9%', label: 'Uptime SLA' },
                { metric: '10M+', label: 'Assessments/Day' },
                { metric: '256-bit', label: 'Encryption' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold mb-2">{stat.metric}</div>
                  <div className="text-primary-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;