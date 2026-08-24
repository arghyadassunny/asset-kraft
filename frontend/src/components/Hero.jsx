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

  const HeroVideo = () => {
    const videoRef = useRef(null);
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }, []);

return (
      <img
        src="https://res.cloudinary.com/djm5rsjwl/image/upload/v1787602336/Hero_image_1_sshheu.png"
        alt="Hero asset"
        className="w-full h-auto object-contain"
        style={{ maxHeight: '600px' }}
      />
    );
  };

  return (
    <section id="home" className="relative bg-teal-600 pt-20 lg:pt-32 pb-12 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-8">
            
            {/* Tighter Sub-container for Badge and Heading */}
            <div className="flex flex-col items-center lg:items-start space-y-1 lg:space-y-2">
              {/* AMFI Badge - White box container */}
              <div className="inline-flex items-center gap-1 bg-white border border-white rounded-full px-2 py-0.5 lg:px-2.5 text-teal-700 font-medium shadow-sm animate-fade-in">
                <Sparkles className="text-teal-600 w-2 h-2 lg:w-3.5 lg:h-3.5" />
                <span className="text-[7px] sm:text-xs lg:text-sm uppercase tracking-tighter lg:normal-case lg:tracking-normal">
                  AMFI Registered Mutual Fund Distributor
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-[34px] leading-[1.1] sm:text-4xl lg:text-6xl font-bold text-white text-center lg:text-left tracking-tight">
                <span className="block">Invest In Your Future</span>
                <span className="block text-white">Live Your Present</span>
              </h1>
            </div>

            {/* Mobile Video */}
            <div className="w-full lg:hidden">
              <HeroVideo />
            </div>

            {/* Subheading & Description */}
            <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
              <p className="text-sm lg:text-xl text-white leading-relaxed">
                And Leave Your <span className="font-semibold text-white">Financial Decision</span> To Us.
              </p>
              <p className="text-xs lg:text-lg text-white/90 leading-relaxed max-w-md lg:max-w-none mx-auto lg:mx-0">
                Your business has the spark; we provide the fuel. At Asset Kraft, we navigate the noise of the markets to find the signal of your success.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row justify-center lg:justify-start gap-3 w-full pt-2 lg:pt-4">
              <Button 
                onClick={openBookingModal}
                className="w-1/2 lg:w-auto bg-white hover:bg-slate-100 text-teal-700 font-semibold text-[10px] lg:text-lg px-2 lg:px-8 py-3 lg:py-6 transition-all"
              >
                Get Started
                <ArrowRight className="ml-1 lg:ml-2" size={12} />
              </Button>
              <Button 
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="w-1/2 lg:w-auto border-2 border-white text-white hover:bg-white/10 text-[10px] lg:text-lg px-2 lg:px-8 py-3 lg:py-6 transition-all"
              >
                Try Calculator
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-8 border-t border-teal-500/50 w-full">
              <div ref={aum.ref} className="text-center lg:text-left">
                <div className="text-xl lg:text-3xl font-bold text-white">{aum.count}+</div>
                <div className="text-[8px] lg:text-sm text-white/80 uppercase">Crores AUM</div>
              </div>
              <div className="h-8 lg:h-12 w-px bg-teal-500/50"></div>
              <div ref={investors.ref} className="text-center lg:text-left">
                <div className="text-xl lg:text-3xl font-bold text-white">{investors.count}+</div>
                <div className="text-[8px] lg:text-sm text-white/80 uppercase">Happy Investors</div>
              </div>
              <div className="h-8 lg:h-12 w-px bg-teal-500/50"></div>
              <div ref={years.ref} className="text-center lg:text-left">
                <div className="text-xl lg:text-3xl font-bold text-white">{years.count}+</div>
                <div className="text-[8px] lg:text-sm text-white/80 uppercase">Years Experience</div>
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