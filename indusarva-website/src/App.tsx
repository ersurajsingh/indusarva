import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Components
import Navigation from './components/ui/Navigation';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import InteractiveDemo from './components/sections/InteractiveDemo';
import ScoreResults from './components/sections/ScoreResults';
import TechnologySection from './components/sections/TechnologySection';
import TeamSection from './components/sections/TeamSection';
import ContactSection from './components/sections/ContactSection';

// Hooks and Utils
import { useScrollSpy } from './hooks/useScrollSpy';
import { calculateScore } from './utils/scoringAlgorithm';

// Data
import { problemData, solutionData, technologyData, teamData, contactData } from './data/siteData';
import { demoQuestions } from './data/demoQuestions';

// Types
import type { DemoResponse, ScoreResult } from './types';

function App() {
  const sectionIds = ['hero', 'problem', 'solution', 'demo', 'technology', 'team', 'contact'];
  const currentSection = useScrollSpy(sectionIds);
  
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  const handleSectionChange = (sectionId: string) => {
    // This is handled by the scroll spy, but we can add additional logic here if needed
  };

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDemoComplete = (responses: DemoResponse[]) => {
    const result = calculateScore(responses, demoQuestions);
    setScoreResult(result);
    setDemoCompleted(true);
  };

  const handleDemoRestart = () => {
    setDemoCompleted(false);
    setScoreResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={handleSectionChange} 
      />

      {/* Hero Section */}
      <HeroSection
        headline="Unlocking Credit for a Billion Entrepreneurs"
        subheading="FIN-GENIE revolutionizes credit assessment through AI-powered behavioral intelligence, making financial inclusion a reality for SMEs worldwide."
        ctaButton={{
          text: "Experience FIN-GENIE",
          action: scrollToDemo
        }}
      />

      {/* Problem Section */}
      <ProblemSection {...problemData} />

      {/* Solution Section */}
      <SolutionSection {...solutionData} />

      {/* Interactive Demo Section */}
      {!demoCompleted ? (
        <InteractiveDemo
          questions={demoQuestions}
          onComplete={handleDemoComplete}
        />
      ) : (
        scoreResult && (
          <ScoreResults
            scoreResult={scoreResult}
            onRestart={handleDemoRestart}
          />
        )
      )}

      {/* Technology Section */}
      <TechnologySection {...technologyData} />

      {/* Team Section */}
      <TeamSection {...teamData} />

      {/* Contact Section */}
      <ContactSection {...contactData} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IA</span>
                </div>
                <span className="font-heading font-semibold text-xl">IndusArva Innovations</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing credit assessment through AI-powered behavioral intelligence, 
                making financial inclusion a reality for entrepreneurs worldwide.
              </p>
              <div className="text-sm text-gray-500">
                © 2024 IndusArva Innovations. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#solution" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#technology" className="hover:text-white transition-colors">Technology</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>Built with ❤️ for financial inclusion</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;