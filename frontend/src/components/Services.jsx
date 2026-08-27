import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { 
  TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, 
  BookOpen, Lock, Sparkles, Check, X, ChevronLeft, ChevronRight, Sun 
} from 'lucide-react';
import { services as mockServices, philosophy, values } from '../data/mock';

const iconComponents = {
  TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles, Sun
};

const defaultSlideImages = [
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941268/mutual_funds_pic_qb9mr4.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941241/insurance_ejewjz.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941241/finance_kvn7zh.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941242/legacy_planning_qwasl4.png',
  'https://res.cloudinary.com/djm5rsjwl/image/upload/v1775941241/finance_kvn7zh.png'
];

const AUTOPLAY_DELAY = 3000;

const RotatingCardCarousel = ({ services, iconComponents }) => {
  const [current, setCurrent] = useState(0);
  const total = services.length;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx) => {
    setCurrent((idx + total) % total);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, nextSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (diff > minSwipeDistance) {
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!services || services.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-[480px] sm:h-[500px] flex items-center justify-center [perspective:1200px] overflow-hidden sm:overflow-visible">
        {services.map((service, i) => {
          const Icon = iconComponents[service.icon] || Sparkles;
          // Use the uploaded custom image, or fallback to the standard slideImages
          const img = service.image || defaultSlideImages[i % defaultSlideImages.length];

          let offset = (i - current) % total;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;
          const isImmediate = Math.abs(offset) === 1;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          return (
            <div
              key={service.id || i}
              onClick={() => goToSlide(i)}
              className={`group absolute top-0 w-[290px] sm:w-[350px] lg:w-[380px] h-[450px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer ${
                isCenter 
                  ? 'ring-2 ring-teal-400/50 shadow-teal-950/40 lg:hover:scale-[1.04]' 
                  : 'hover:brightness-110'
              }`}
              style={{
                transform: `translateX(${offset * 58}%) scale(${isCenter ? 1 : isImmediate ? 0.85 : 0.7}) rotateY(${offset * -18}deg)`,
                zIndex: 30 - Math.abs(offset) * 10,
                opacity: isCenter ? 1 : isImmediate ? 0.65 : 0.25,
                filter: isCenter ? 'none' : 'blur(1px)',
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" 
                style={{ backgroundImage: `url(${img})` }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-teal-950/80 to-slate-900/40" />

              <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:rotate-6">
                    <Icon className="w-6 h-6 text-teal-300" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight text-white line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-4 mb-6">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => !isCenter && e.preventDefault()}
                    className={`inline-flex items-center justify-center w-full py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isCenter
                        ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/30'
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white pointer-events-none'
                    }`}
                  >
                    Start Your Journey
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-6 mt-6 z-40">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-600 active:scale-95 transition shadow-md border border-slate-200"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'w-8 bg-teal-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-600 active:scale-95 transition shadow-md border border-slate-200"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const [activeServices, setActiveServices] = useState(mockServices);

  useEffect(() => {
    axios.get('/api/content')
      .then(res => {
        const servicesRow = res.data.find(i => i.content_key === 'services_data');
        if (servicesRow && servicesRow.content_value) {
          const parsed = JSON.parse(servicesRow.content_value);
          if (parsed.length > 0) {
            setActiveServices(parsed);
          }
        }
      })
      .catch(err => console.error("Failed to fetch services from DB, falling back to mock", err));
  }, []);

  return (
    <section id="services" className="pt-6 pb-20 lg:py-24 bg-white lg:-mt-10 overflow-hidden">
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

      {/* Rotating 3D Card Carousel */}
      <div className="mb-16 lg:mb-24">
        <RotatingCardCarousel services={activeServices} iconComponents={iconComponents} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 px-2">
              Where Our Value <span className="text-teal-600">Meets Your Vision</span>
            </h2>
          </div>

          {(() => {
            const doValues = values.filter((v) => v.type === 'do');
            const dontValues = values.filter((v) => v.type === 'dont');
            const rows = Math.max(doValues.length, dontValues.length);

            return (
              <div className="flex flex-col gap-4 lg:gap-8">
                {Array.from({ length: rows }).map((_, i) => (
                  <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-stretch">
                    {doValues[i] && (
                      <div className="bg-teal-50 rounded-xl p-4 lg:p-5 border border-teal-200 w-full max-w-[300px] lg:max-w-none mx-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
                        <div className="flex items-start gap-3 lg:gap-4 h-full">
                          <Check className="text-teal-600 mt-1 flex-shrink-0" size={16} />
                          <div className="flex flex-col h-full">
                            <h3 className="text-base lg:text-lg font-bold text-slate-900 mb-1 leading-tight">
                              {doValues[i].title}
                            </h3>
                            <p className="text-[13px] lg:text-sm text-slate-700 leading-relaxed flex-grow">
                              {doValues[i].description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {dontValues[i] && (
                      <div className="bg-slate-50 rounded-xl p-4 lg:p-5 border border-slate-200 w-full max-w-[300px] lg:max-w-none mx-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
                        <div className="flex items-start gap-3 lg:gap-4 h-full">
                          <X className="text-slate-600 mt-1 flex-shrink-0" size={16} />
                          <div className="flex flex-col h-full">
                            <h3 className="text-base lg:text-lg font-bold text-red-600 mb-1 leading-tight">
                              {dontValues[i].title}
                            </h3>
                            <p className="text-[13px] lg:text-sm text-slate-700 leading-relaxed flex-grow">
                              {dontValues[i].description}
                            </p>
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

        {/* Philosophy boxes */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-teal-600">Philosophy</span>
            </h2>
            <p className="text-sm lg:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              At the heart of everything we do is a deep commitment to trust, transparency, and long-term partnership
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {philosophy.map((item) => {
              const Icon = iconComponents[item.icon] || Sparkles;
              return (
                <div
                  key={item.id}
                  className="group bg-teal-600 rounded-2xl p-6 lg:p-8 border border-teal-700 transition-all duration-500 flex flex-col items-center text-center w-full max-w-[280px] lg:max-w-[340px] shadow-lg hover:shadow-[0_20px_50px_rgba(13,148,136,0.35)] hover:-translate-y-2 hover:border-white/50"
                >
                  <div className="bg-white rounded-xl w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center mb-4 lg:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                    <Icon className="text-yellow-600" size={24} />
                  </div>

                  <h3 className="text-base lg:text-lg font-bold text-white mb-2 lg:mb-3 leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
                    {item.title}
                  </h3>

                  <p className="text-[13px] lg:text-base text-white/90 leading-relaxed">
                    {item.description}
                  </p>
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