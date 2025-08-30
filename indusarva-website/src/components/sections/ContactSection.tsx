import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContactSectionProps, CONTACT_INFO } from '../../types';

const ContactSection: React.FC<ContactSectionProps> = ({ contactTypes }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [selectedContactType, setSelectedContactType] = useState<string>('investor');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    type: 'investor'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '', type: 'investor' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactTypeIcons = {
    investor: '💰',
    partner: '🤝',
    career: '🚀'
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
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
              Join Us on the <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to revolutionize credit assessment? Whether you're an investor, potential partner, 
              or talented individual looking to make an impact, we'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Types */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-8">
                How Can We Help You?
              </h3>
              
              <div className="space-y-4 mb-8">
                {contactTypes.map((contactType, index) => (
                  <motion.div
                    key={contactType.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedContactType === contactType.type
                        ? 'bg-white shadow-lg ring-2 ring-primary-500'
                        : 'bg-white/70 hover:bg-white hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedContactType(contactType.type);
                      setFormData(prev => ({ ...prev, type: contactType.type }));
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">
                        {contactTypeIcons[contactType.type as keyof typeof contactTypeIcons]}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {contactType.title}
                        </h4>
                        <p className="text-gray-600 mb-3">
                          {contactType.description}
                        </p>
                        <button
                          className={`text-sm font-medium transition-colors ${
                            selectedContactType === contactType.type
                              ? 'text-primary-600'
                              : 'text-gray-500 hover:text-primary-600'
                          }`}
                        >
                          {contactType.ctaText} →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Direct Contact Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Direct Contact</h4>
                <div className="space-y-3">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-xl">📧</span>
                    <span>{CONTACT_INFO.email}</span>
                  </a>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-xl">📞</span>
                    <span>{CONTACT_INFO.phone}</span>
                  </a>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <span className="text-xl">🏢</span>
                    <span>{CONTACT_INFO.company}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                Get in Touch
              </h3>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-green-800">
                    <span className="text-xl">✅</span>
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-red-800">
                    <span className="text-xl">❌</span>
                    <span className="font-medium">Something went wrong</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    Please try again or contact us directly.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="investor">Investment Opportunity</option>
                    <option value="partner">Partnership</option>
                    <option value="career">Career Opportunity</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    placeholder="Tell us about your interest in FIN-GENIE..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By submitting this form, you agree to our privacy policy. 
                We'll never share your information with third parties.
              </p>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                Ready to Transform Credit Assessment?
              </h3>
              <p className="text-gray-600 mb-6">
                Join us in building a more inclusive financial future where everyone has access to credit.
              </p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('demo');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                >
                  Try the Demo
                </motion.button>
                <motion.a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                >
                  Contact Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;