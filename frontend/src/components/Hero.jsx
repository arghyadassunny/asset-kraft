
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

import React, { useEffect, useRef, useState } from 'react';

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const Hero = ({ openBookingModal }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const aum = useCountUp(700, 1200);
  const investors = useCountUp(5000, 1400);
  const years = useCountUp(20, 1000);

  return (
    <section id="home" className="relative bg-white pt-32 pb-32 overflow-hidden">
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
              Invest In Your Future{' '}
              <span className="text-teal-600">Live Your Present</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-slate-600 leading-relaxed">
              And Leave Your <span className="font-semibold text-yellow-600">Financial Decision</span> To Us.
            </p>

            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed">
              Your business has the spark; we provide the fuel.  
              At Asset Kraft, we navigate the noise of the markets to find the signal of your success. 
              Stop guessing and start growing with a guidance partner that treats your financial future like the mission-critical objective it is.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={openBookingModal}
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
  <div ref={aum.ref}>
    <div className="text-3xl font-bold text-teal-600">{aum.count}+</div>
    <div className="text-sm text-slate-600">Crores AUM</div>
  </div>
  <div className="h-12 w-px bg-slate-300"></div>
  <div ref={investors.ref}>
    <div className="text-3xl font-bold text-yellow-600">{investors.count}+</div>
    <div className="text-sm text-slate-600">Happy Investors</div>
  </div>
  <div className="h-12 w-px bg-slate-300"></div>
  <div ref={years.ref}>
    <div className="text-3xl font-bold text-teal-600">{years.count}+</div>
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
