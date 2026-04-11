import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { services, philosophy, values } from '../data/mock';

const iconComponents = {
  TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles
};

const slideImages = [
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941268/mutual_funds_pic_qb9mr4.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941241/insurance_ejewjz.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941241/finance_kvn7zh.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941242/legacy_planning_qwasl4.png',
];

const DURATION = 4500;

/* ─────────────────────────────────────────────
    Full-Width Services Carousel
───────────────────────────────────────────── */
const ServicesCarousel = ({ services, iconComponents }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progRef = useRef(null);
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  const goTo = (n) => {
    setCurrent((n + services.length) % services.length);
    setProgress(0);
    startRef.current = Date.now();
  };

  useEffect(() => {
    startRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progRef.current = requestAnimationFrame(tick);
      } else {
        timerRef.current = setTimeout(() => goTo(current + 1), 80);
      }
    };

    progRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(progRef.current);
      clearTimeout(timerRef.current);
    };
  }, [current]);

  return (
    /* MOBILE: h-[380px] (Decreased from 480px)
       DESKTOP: lg:h-[520px] (Remains same)
    */
    <div className="relative w-full overflow-hidden h-[380px] lg:h-[520px]">
      {services.map((service, i) => {
        const Icon = iconComponents[service.icon];
        const img = slideImages[i % slideImages.length];
        const isActive = i === current;

        return (
          <div
            key={service.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${img})` }} />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-teal-800/60 to-slate-900/80" />
            
            <div className="relative z-10 h-full flex items-center justify-center px-4">
              <div className="max-w-xl w-full flex flex-col items-center text-center">
                
                {/* Icon & Title Group: mb-2 for mobile to save space */}
                <div className="flex flex-col items-center gap-2 mb-2 lg:flex-row lg:gap-5 lg:mb-6">
                  <div className="bg-white/15 backdrop-blur-md border border-white/25 w-10 h-10 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center shadow-xl">
                    <Icon className="text-white w-5 h-5 lg:w-7 lg:h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Description: mb-5 for mobile to keep button visible in shorter height */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 font-light leading-relaxed mb-5 lg:mb-8 max-w-[260px] sm:max-w-md lg:max-w-xl">
                  {service.description}
                </p>

                {/* CTA */}
                <a href="#" className="bg-white/10 backdrop-blur-md border border-white/40 hover:bg-white/20 text-white px-6 py-2 rounded-full text-[11px] lg:text-sm font-semibold transition-all">
                  Start Your Journey
                </a>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div 
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-none" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <button 
        onClick={() => goTo(current - 1)}
        className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-1.5 lg:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
      >
        <ChevronLeft size={18} className="lg:w-6 lg:h-6" />
      </button>
      <button 
        onClick={() => goTo(current + 1)}
        className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-1.5 lg:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
      >
        <ChevronRight size={18} className="lg:w-6 lg:h-6" />
      </button>

      <div className="absolute top-4 right-6 z-20 text-[9px] lg:text-xs text-white/50 font-mono">
        {String(current + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
    Main Services Section
───────────────────────────────────────────── */
const Services = () => {
  return (
    <section id="services" className="pt-6 pb-20 lg:py-24 bg-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            Our <span className="text-teal-600">Services</span>
          </h2>
          <p className="text-sm lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Comprehensive wealth management solutions tailored to your goals
          </p>
        </div>
      </div>

      <div className="mb-16 lg:mb-24">
        <ServicesCarousel services={services} iconComponents={iconComponents} />
      </div>

      {/* Philosophy and Values parts remain same for desktop stability */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 px-2">
              Where Our Value <span className="text-yellow-600">Meets Your Vision</span>
            </h2>
          </div>
          {(() => {
            const doValues = values.filter(v => v.type === 'do');
            const dontValues = values.filter(v => v.type === 'dont');
            const rows = Math.max(doValues.length, dontValues.length);
            return (
              <div className="space-y-4 lg:space-y-6">
                {Array.from({ length: rows }).map((_, i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                    {doValues[i] && (
                      <div className="bg-teal-50/50 rounded-xl p-5 border border-teal-200">
                        <div className="flex items-start gap-4">
                          <Check className="text-teal-600 mt-1 flex-shrink-0" size={18} />
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{doValues[i].title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{doValues[i].description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {dontValues[i] && (
                      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <div className="flex items-start gap-4">
                          <X className="text-slate-600 mt-1 flex-shrink-0" size={18} />
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{dontValues[i].title}</h3>
                            <p className="text-sm text-slate-700 leading-relaxed">{dontValues[i].description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-teal-600">Philosophy</span>
            </h2>
            <p className="text-sm lg:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              At the heart of everything we do is a deep commitment to trust, transparency, and long-term partnership
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophy.map((item) => {
              const Icon = iconComponents[item.icon];
              return (
                <div key={item.id} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-100">
                  <div className="bg-gradient-to-br from-yellow-50 to-teal-50 rounded-xl w-14 h-14 flex items-center justify-center mb-5">
                    <Icon className="text-yellow-600" size={28} />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;