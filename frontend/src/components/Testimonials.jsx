import React, { useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const Testimonials = ({ openBookingModal, dynamicData }) => {
  // 1. Set up Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // 2. Parse Data from Database or use fallback
  const defaultTestimonials = [
    { id: 1, name: 'Rajesh Kumar', role: 'Business Owner, Mumbai', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', quote: 'With AssetKraft, I found the right partner for my family\'s financial future.' },
    { id: 2, name: 'Priya Sharma', role: 'IT Professional, Bangalore', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', quote: 'AssetKraft brought simplicity and clarity to my investments.' }
  ];

  let displayTestimonials = defaultTestimonials;
  if (dynamicData?.testimonials_data) {
    try {
      displayTestimonials = JSON.parse(dynamicData.testimonials_data);
    } catch (e) {
      displayTestimonials = defaultTestimonials;
    }
  }

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Carousel Controls */}
        <div className="flex justify-between items-end mb-16 flex-wrap gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Trusted by <span className="text-teal-600">wealth creators</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 transition"><ChevronLeft /></button>
            <button onClick={scrollNext} className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 transition"><ChevronRight /></button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-8">
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="embla__slide flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={testimonial.image} alt={name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                  </div>
                  <div className="p-8 bg-slate-50 flex-grow">
                    <Quote className="text-teal-200 mb-4" size={32} />
                    <p className="text-slate-800 text-lg leading-relaxed font-medium mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div className="pt-6 border-t border-slate-200">
                      <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                      <div className="text-slate-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button onClick={openBookingModal} className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-full font-semibold transition-all hover:scale-105">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;