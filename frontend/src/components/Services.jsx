import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles, Check, X } from 'lucide-react';
import { services, philosophy, values } from '../data/mock';

const iconComponents = {
  TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles
};

// Finance-themed Unsplash images – one per service (loops if more services than images)
const slideImages = [
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1800&q=80', // trading screen
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&q=80', // calculator/finance
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=80', // financial planning
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1800&q=80', // business agreement
];

const DURATION = 4500; // ms per slide

/* ─────────────────────────────────────────────
   Full-Width Services Carousel
───────────────────────────────────────────── */
const ServicesCarousel = ({ services, iconComponents }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animDir, setAnimDir] = useState(1); // 1 = forward, -1 = backward
  const [transitioning, setTransitioning] = useState(false);
  const progRef = useRef(null);
  const timerRef = useRef(null);
  const startRef = useRef(Date.now());

  const goTo = (n, dir = 1) => {
    if (transitioning) return;
    setAnimDir(dir);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent((n + services.length) % services.length);
      setProgress(0);
      startRef.current = Date.now();
      setTransitioning(false);
    }, 500);
  };

  // Auto-advance progress bar
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
        timerRef.current = setTimeout(() => goTo(current + 1, 1), 80);
      }
    };

    progRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(progRef.current);
      clearTimeout(timerRef.current);
    };
  }, [current]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '520px' }}>

      {/* ── Slides ── */}
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
            {/* Background image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Multi-layer overlay: teal tint + dark gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(13,148,136,0.72) 0%, rgba(15,118,110,0.55) 40%, rgba(30,41,59,0.75) 100%)',
              }}
            />
            {/* Extra soft vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(15,23,42,0.45) 100%)',
              }}
            />

            {/* ── Slide content ── */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto w-full px-8 sm:px-12 lg:px-20 flex items-center justify-center">

                {/* Text – centred */}
                <div className="w-full flex flex-col items-center text-center">

                  {/* Title with inline icon */}
                  <div className="flex items-center justify-center gap-4 mb-5 whitespace-nowrap">
                    <div
                      className="flex-none w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
                    >
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3
                      className="font-bold text-white leading-none whitespace-nowrap"
                      style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="leading-relaxed mb-8 font-light max-w-xl"
                    style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', color: 'rgba(226,232,240,0.92)' }}
                  >
                    {service.description}
                  </p>

                  {/* CTA */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      border: '1.5px solid rgba(255,255,255,0.5)',
                      color: '#fff',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.28)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                    }}
                  >
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          </div>
        );
      })}

      {/* ── Progress bar (top) ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20" style={{ background: 'rgba(255,255,255,0.15)' }}>
        <div
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #34d399, #14b8a6)',
          }}
        />
      </div>

      {/* ── Slide counter ── */}
      <span
        className="absolute top-5 right-6 z-20 text-xs tracking-widest font-medium"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {String(current + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
      </span>

      {/* ── Arrow Buttons ── */}
      <button
        onClick={() => goTo(current - 1, -1)}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
      >
        ‹
      </button>
      <button
        onClick={() => goTo(current + 1, 1)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
      >
        ›
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className="rounded-full border-none transition-all duration-300"
            style={{
              height: '8px',
              width: i === current ? '28px' : '8px',
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
    <section id="services" className="py-24 bg-white">

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our <span className="text-teal-600">Services</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive wealth management solutions tailored to your goals
          </p>
        </div>
      </div>

      {/* ── Full-width Carousel (bleeds edge-to-edge) ── */}
      <div className="mb-24">
        <ServicesCarousel services={services} iconComponents={iconComponents} />
      </div>

      {/* ── What We Do & Don't Do ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Where Our Value <span className="text-yellow-600">Meets Your Vision</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What We Do */}
            <div className="space-y-6">
              {values.filter(v => v.type === 'do').map((value) => (
                <div key={value.id}
                  className="group bg-teal-50/50 rounded-xl p-6 border border-teal-200 hover:bg-teal-50 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-600 rounded-full p-2 mt-1">
                      <Check className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                      <p className="text-slate-700 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* What We Don't Do */}
            <div className="space-y-6">
              {values.filter(v => v.type === 'dont').map((value) => (
                <div key={value.id}
                  className="group bg-slate-50 rounded-xl p-6 border border-slate-200 hover:bg-slate-100 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-600 rounded-full p-2 mt-1">
                      <X className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                      <p className="text-slate-700 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Philosophy ── */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-teal-600">Philosophy</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              At the heart of everything we do is a deep commitment to trust, transparency, and long-term partnership
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophy.map((item) => {
              const Icon = iconComponents[item.icon];
              return (
                <div key={item.id}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-yellow-300 hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-yellow-50 to-teal-50 rounded-xl w-16 h-16 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-yellow-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
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