import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles, Check, X } from 'lucide-react';
import { services, philosophy, values } from '../data/mock';

const iconComponents = {
  TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles
};

const slideImages = [
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=80',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80',
];

const ServicesCarousel = ({ services, iconComponents }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progRef = useRef(null);
  const DURATION = 5000;

  const goTo = (n) => {
    setCurrent((n + services.length) % services.length);
    setProgress(0);
  };

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) progRef.current = requestAnimationFrame(tick);
      else timerRef.current = setTimeout(() => goTo(current + 1), 50);
    };
    progRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(progRef.current);
      clearTimeout(timerRef.current);
    };
  }, [current]);

 // const isReversed = current % 2 !== 0; // even = text left, odd = text right

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: '480px' }}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-[3px] bg-teal-500 z-10 transition-none"
        style={{ width: `${progress}%` }} />

      {/* Slide counter */}
      <span className="absolute top-4 right-5 z-10 text-xs tracking-widest text-slate-400">
        {current + 1} / {services.length}
      </span>

      {services.map((service, i) => {
        const Icon = iconComponents[service.icon];
        const reversed = i % 2 !== 0;
        return (
          <div
            key={service.id}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            {/* Background */}
            <div className="absolute inset-0"
              style={{ backgroundImage: `url(${slideImages[i % slideImages.length]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.83)' }} />
            </div>

            {/* Content */}
            <div className={`relative z-10 flex items-center gap-14 max-w-4xl w-full px-8 ${reversed ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-1 min-w-0 ${reversed ? 'text-right' : 'text-left'}`}>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 bg-teal-50 ${reversed ? 'ml-auto' : 'mr-auto'}`}>
                  <Icon className="text-teal-600" size={28} />
                </div>
                <p className="text-xs font-medium tracking-widest uppercase text-teal-600 mb-2">
                  {service.tag || 'Our Service'}
                </p>
                <h3 className="font-bold text-slate-900 mb-4" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', lineHeight: 1.2 }}>
                  {service.title}
                </h3>
                <p className={`text-slate-600 leading-relaxed mb-6 max-w-md font-light ${reversed ? 'ml-auto' : 'mr-auto'}`}>
                  {service.description}
                </p>
                <a href="#"
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-teal-600 text-teal-700 text-sm font-medium hover:bg-teal-600 hover:text-white transition-all ${reversed ? 'ml-auto flex' : ''}`}>
                  Learn More ›
                </a>
              </div>
              <div className="flex-none w-52">
                <img src={slideImages[i % slideImages.length]} alt={service.title}
                  className="w-52 h-52 object-cover rounded-2xl shadow-xl border-4 border-white" />
              </div>
            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button onClick={() => goTo(current - 1)}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-teal-100 text-teal-600 flex items-center justify-center text-2xl shadow hover:bg-teal-600 hover:text-white transition-all">
        ‹
      </button>
      <button onClick={() => goTo(current + 1)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-teal-100 text-teal-600 flex items-center justify-center text-2xl shadow hover:bg-teal-600 hover:text-white transition-all">
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {services.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="h-2 rounded-full border-none transition-all"
            style={{ width: i === current ? '26px' : '8px', background: i === current ? '#1d9e75' : '#b0cfc5' }} />
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* ── Services Carousel ── */}
    <div className="mb-24">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Our <span className="text-teal-600">Services</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Comprehensive wealth management solutions tailored to your goals
        </p>
      </div>
      <ServicesCarousel services={services} iconComponents={iconComponents} />
    </div>

    {/* ── What We Do & Don't Do ── */}
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
