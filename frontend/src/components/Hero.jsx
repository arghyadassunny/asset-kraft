import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative bg-white pt-20 pb-32 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-2 text-teal-700 font-medium animate-fade-in">
              <Sparkles size={16} className="text-yellow-500" />
              <span>AMFI Registered Mutual Fund Distributor</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Your Ambitions,{' '}
              <span className="text-teal-600">Our Blueprint</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-slate-600 leading-relaxed">
              We create <span className="font-semibold text-yellow-600">Endless Possibilities</span> for your Financial Future.
            </p>

            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed">
              Unlock your business's full potential with a guidance partner dedicated to your future financial growth. 
              At Asset Kraft Investments, we combine insight-driven strategies, innovation, and industry expertise 
              to help you turn ambitious goals into measurable success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-600/30 hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50 text-lg px-8 py-6 transition-all duration-300 hover:shadow-lg"
              >
                Try Calculator
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-teal-600">700+</div>
                <div className="text-sm text-slate-600">Crores AUM</div>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div>
                <div className="text-3xl font-bold text-yellow-600">5000+</div>
                <div className="text-sm text-slate-600">Happy Investors</div>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div>
                <div className="text-3xl font-bold text-teal-600">20+</div>
                <div className="text-sm text-slate-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Video - Larger and Seamless */}
          <div className="w-full">
            <video 
              src="https://customer-assets.emergentagent.com/job_craft-wealth/artifacts/soswflym_Hero%20section%20video%20asset%20kraft.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain"
              style={{ maxHeight: '600px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
