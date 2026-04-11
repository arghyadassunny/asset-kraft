import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles, Check, X } from 'lucide-react';
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
  const [transitioning, setTransitioning] = useState(false);
  const progRef = useRef(null);
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  const goTo = (n) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent((n + services.length) % services.length);
      setProgress(0);
      startRef.current = Date.now();
      setTransitioning(false);
    }, 500);
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
    // Height adjusted for mobile to look cleaner: h-[460px] on mobile, 520px on desktop
    <div className="relative w-full overflow-hidden h-[460px] lg:h-[520px]">

      {services.map((service, i) => {
        const Icon = iconComponents[service.icon];
        const img = slideImages[i % slideImages.length];
        const isActive = i === current;

        return (
          <div
            key={service.id}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.7s ease',
              zIndex: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(13,148,136,0.72) 0%, rgba(15,118,110,0.55) 40%, rgba(30,41,59,0.75) 100%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(15,23,42,0.45) 100%)',
              }}
            />

            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-20 flex items-center justify-center">

                <div className="w-full flex flex-col items-center text-center">

                  {/* Icon & Title: Scaled down for mobile */}
                  <div className="flex items-center justify-center gap-3 lg:gap-4 mb-4 lg:mb-5">
                    <div
                      className="flex-none w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
                    >
                      <Icon className="text-white w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <h3
                      className="font-bold text-white leading-tight"
                      style={{ 
                        // Mobile uses a smaller fixed size, Desktop uses your original clamp
                        fontSize: window.innerWidth < 1024 ? '1.5rem' : 'clamp(2rem, 4.5vw, 3.2rem)', 
                        textShadow: '0 2px 20px rgba(0,0,0,0.3)' 
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Description: Smaller on mobile */}
                  <p
                    className="leading-relaxed mb-6 lg:mb-8 font-light max-w-xl px-2"
                    style={{ 
                      fontSize: window.innerWidth < 1024 ? '0.875rem' : 'clamp(1rem, 1.6vw, 1.15rem)', 
                      color: 'rgba(226,232,240,0.92)' 
                    }}
                  >
                    {service.description}
                  </p>

                  {/* CTA: Smaller padding on mobile */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 lg:px-7 py-2.5 lg:py-3 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1.5px solid rgba(255,255,255,0.5)',
                      color: '#fff',
                    }}
                  >
                    Start Your Journey
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="lg:w-4 lg:h-4">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute top-0 left-0 right-0 h-[3px] z-20" style={{ background: 'rgba(255,255,255,0.15)' }}>
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #34d399, #14b8a6)',
          }}
        />
      </div>

      <span
        className="absolute top-4 lg:top-5 right-5 lg:right-6 z-20 text-[10px] lg:text-xs tracking-widest font-medium"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
      </span>

      {/* Arrows: Hidden or smaller on very small mobile screens for cleaner UI */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-lg lg:text-xl transition-all"
        style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
      >
        ‹
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-lg lg:text-xl transition-all"
        style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full border-none transition-all duration-300"
            style={{
              height: '6px',
              width: i === current ? '24px' : '6px',
              background: i === current ? '#34d399' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>

    </div>
  );
};

/* ─────────────────────────────────────────────
    Main Services Section
───────────────────────────────────────────── */
const Services = () => {
  return (
    <section id="services" className="py-16 lg:py-24 bg-white">

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 px-2">
            Our <span className="text-teal-600">Services</span>
          </h2>
          {/* Subheading: text-sm on mobile, text-lg on desktop */}
          <p className="text-sm lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Comprehensive wealth management solutions tailored to your goals
          </p>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div className="mb-16 lg:mb-24">
        <ServicesCarousel services={services} iconComponents={iconComponents} />
      </div>

      {/* ── Value Vision ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
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
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-stretch">
                    {/* What We Do */}
                    {doValues[i] && (
                      <div className="group bg-teal-50/50 rounded-xl p-5 lg:p-6 border border-teal-200 hover:bg-teal-50 transition-all duration-300 flex flex-col">
                        <div className="flex items-start gap-4">
                          <div className="bg-teal-600 rounded-full p-2 mt-1 flex-shrink-0">
                            <Check className="text-white" size={18} />
                          </div>
                          <div>
                            <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-1 lg:mb-2">{doValues[i].title}</h3>
                            <p className="text-sm lg:text-base text-slate-700 leading-relaxed">{doValues[i].description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* What We Don't Do */}
                    {dontValues[i] && (
                      <div className="group bg-slate-50 rounded-xl p-5 lg:p-6 border border-slate-200 hover:bg-slate-100 transition-all duration-300 flex flex-col">
                        <div className="flex items-start gap-4">
                          <div className="bg-slate-600 rounded-full p-2 mt-1 flex-shrink-0">
                            <X className="text-white" size={18} />
                          </div>
                          <div>
                            <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-1 lg:mb-2">{dontValues[i].title}</h3>
                            <p className="text-sm lg:text-base text-slate-700 leading-relaxed">{dontValues[i].description}</p>
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

        {/* ── Philosophy ── */}
        <div>
          <div className="text-center mb-12 lg:mb-16">
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
                <div key={item.id}
                  className="group bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-yellow-300 lg:hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-yellow-50 to-teal-50 rounded-xl w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
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