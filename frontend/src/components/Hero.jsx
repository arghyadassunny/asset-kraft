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
  const aum = useCountUp(700, 1200);
  const investors = useCountUp(5000, 1400);
  const years = useCountUp(20, 1000);

  const HeroVideo = () => (
    <video 
      src="https://customer-assets.emergentagent.com/job_craft-wealth/artifacts/soswflym_Hero%20section%20video%20asset%20kraft.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-auto object-contain"
      style={{ maxHeight: '600px' }}
    />
  );

  return (
    // Tightened mobile gap from pt-32 to pt-28
    <section id="home" className="relative bg-white pt-28 lg:pt-32 pb-24 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-8">
            
            {/* AMFI Badge - even smaller text-[7px] on mobile */}
            <div className="inline-flex items-center gap-1 bg-teal-50 border border-teal-200 rounded-full px-2 py-0.5 text-teal-700 font-medium animate-fade-in">
              <Sparkles size={8} className="text-yellow-500 lg:w-4 lg:h-4" />
              <span className="text-[7px] sm:text-xs lg:text-base uppercase tracking-tighter lg:normal-case lg:tracking-normal">
                AMFI Registered Mutual Fund Distributor
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight text-center lg:text-left">
              Invest In Your Future{' '}
              <span className="text-teal-600">Live Your Present</span>
            </h1>

            <div className="w-full lg:hidden">
              <HeroVideo />
            </div>

            <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
              <p className="text-sm lg:text-xl text-slate-600 leading-relaxed">
                And Leave Your <span className="font-semibold text-yellow-600">Financial Decision</span> To Us.
              </p>
              <p className="text-xs lg:text-lg text-slate-600 leading-relaxed max-w-md lg:max-w-none mx-auto lg:mx-0">
                Your business has the spark; we provide the fuel. At Asset Kraft, we navigate the noise of the markets to find the signal of your success.
              </p>
            </div>

            <div className="flex flex-row justify-center lg:justify-start gap-3 w-full pt-2 lg:pt-4">
              <Button 
                onClick={openBookingModal}
                className="w-1/2 lg:w-auto bg-teal-600 hover:bg-teal-700 text-white text-[10px] lg:text-lg px-2 lg:px-8 py-3 lg:py-6 transition-all"
              >
                Get Started
                <ArrowRight className="ml-1 lg:ml-2" size={12} />
              </Button>
              <Button 
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="w-1/2 lg:w-auto border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-50 text-[10px] lg:text-lg px-2 lg:px-8 py-3 lg:py-6 transition-all"
              >
                Try Calculator
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-8 border-t border-slate-200 w-full">
              <div ref={aum.ref} className="text-center lg:text-left">
                <div className="text-xl lg:text-3xl font-bold text-teal-600">{aum.count}+</div>
                <div className="text-[8px] lg:text-sm text-slate-600 uppercase">Crores AUM</div>
              </div>
              <div className="h-8 lg:h-12 w-px bg-slate-300"></div>
              <div ref={investors.ref} className="text-center lg:text-left">
                <div className="text-xl lg:text-3xl font-bold text-yellow-600">{investors.count}+</div>
                <div className="text-[8px] lg:text-sm text-slate-600 uppercase">Happy Investors</div>
              </div>
              <div className="h-8 lg:h-12 w-px bg-slate-300"></div>
              <div ref={years.ref} className="text-center lg:text-left">
                <div className="text-xl lg:text-3xl font-bold text-teal-600">{years.count}+</div>
                <div className="text-[8px] lg:text-sm text-slate-600 uppercase">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-full">
            <HeroVideo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;