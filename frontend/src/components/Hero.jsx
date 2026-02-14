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

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80" 
                alt="Financial Growth" 
                className="w-full h-auto object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-100 rounded-full p-3">
                    <Sparkles className="text-teal-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Wealth Growth</div>
                    <div className="text-2xl font-bold text-slate-900">Compounding Magic</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 shadow-lg animate-bounce-slow">
              <Sparkles className="text-white" size={32} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
