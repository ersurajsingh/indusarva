import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { TeamProfilesProps } from '../../types';

const TeamSection: React.FC<TeamProfilesProps> = ({ members }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const toggleMember = (index: number) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

  return (
    <section id="team" className="section-padding bg-white">
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
              Meet the <span className="gradient-text">Minds Behind the Magic</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our founding team brings together decades of experience from leading fintech companies 
              and financial institutions, with the vision to revolutionize credit assessment globally.
            </p>
          </motion.div>

          {/* Team Members */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Profile Header */}
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                      <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-4xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="pt-20 pb-8 px-8 text-center">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* LinkedIn Link */}
                    {member.linkedin && (
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors mb-6"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>Connect on LinkedIn</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                        </svg>
                      </motion.a>
                    )}

                    {/* Experience Toggle */}
                    <button
                      onClick={() => toggleMember(index)}
                      className="btn-secondary text-sm"
                    >
                      {expandedMember === index ? 'Hide Experience' : 'View Experience'}
                    </button>
                  </div>

                  {/* Expandable Experience */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedMember === index ? 'auto' : 0,
                      opacity: expandedMember === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 border-t border-gray-100">
                      <div className="pt-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Professional Experience</h4>
                        <div className="space-y-3">
                          {member.experience.map((exp, expIndex) => (
                            <motion.div
                              key={expIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={expandedMember === index ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.3, delay: expIndex * 0.1 }}
                              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-sm text-gray-700">{exp}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-heading font-semibold text-center text-gray-900 mb-8">
              Collective Expertise
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '15+', label: 'Years Combined Experience' },
                { number: '2', label: 'Major Fintech Companies' },
                { number: '100M+', label: 'Users Served Previously' },
                { number: '5', label: 'Countries Operated In' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-heading font-semibold text-center text-gray-900 mb-8">
              Our Core Values
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Innovation First',
                  description: 'We constantly push the boundaries of what\'s possible in credit assessment'
                },
                {
                  icon: '🤝',
                  title: 'Inclusive Finance',
                  description: 'Making credit accessible to everyone, regardless of their financial history'
                },
                {
                  icon: '🔍',
                  title: 'Transparency',
                  description: 'Building trust through explainable AI and clear communication'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advisory Board Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
              Backed by Industry Leaders
            </h3>
            <p className="text-gray-600 mb-6">
              Our advisory board includes former executives from major banks, fintech pioneers, 
              and AI researchers who guide our strategic vision.
            </p>
            <div className="flex justify-center space-x-8 opacity-60">
              {['🏦', '🚀', '🧠', '🌍'].map((icon, index) => (
                <div key={index} className="text-4xl">{icon}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;