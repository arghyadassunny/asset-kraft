import React, { useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const Testimonials = ({ openBookingModal, dynamicData, isLoading }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // 1. Loading State (Skeleton UI updated for mobile spacing)
  if (isLoading) {
    return (
      <section className="pt-12 pb-24 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-12 w-3/4 md:w-1/2 bg-slate-200 rounded-lg mx-auto mb-4"></div>
            <div className="h-4 w-1/3 bg-slate-100 rounded-lg mx-auto"></div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0">
                <div className="bg-slate-50 rounded-3xl p-10 h-64 border border-slate-100 animate-pulse">
                  <div className="w-12 h-12 bg-slate-200 rounded-full mb-6"></div>
                  <div className="h-4 w-full bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Data Logic
  const defaultTestimonials = [
    { id: 1, name: 'Rajesh Kumar', role: 'Business Owner, Mumbai', quote: 'With AssetKraft, I found the right partner for my family\'s financial future. Their personalized approach made all the difference.' },
    { id: 2, name: 'Priya Sharma', role: 'IT Professional, Bangalore', quote: 'AssetKraft brought simplicity and clarity to my investments. I finally understand where my money is going and why.' },
    { id: 3, name: 'Amit Patel', role: 'Entrepreneur, Delhi', quote: 'I am sure AssetKraft will help me achieve my financial goals better than I could alone. Their expertise is unmatched.' }
  ];

  let displayTestimonials = defaultTestimonials;
  if (dynamicData?.testimonials_data) {
    try {
      const parsed = JSON.parse(dynamicData.testimonials_data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        displayTestimonials = parsed;
      }
    } catch (e) {
      displayTestimonials = defaultTestimonials;
    }
  }

  return (
    /* MOBILE: pt-12 (Decreased padding above heading) | pb-24
       DESKTOP: lg:py-24 (Unchanged)
    */
    <section id="testimonials" className="pt-12 pb-24 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 px-2">
            Trusted by <span className="text-teal-600">wealth creators</span> like you
          </h2>
          {/* Subheading: text-sm on mobile, lg:text-lg on desktop */}
          <p className="text-sm lg:text-lg text-slate-600 max-w-3xl mx-auto px-4">
            Join 5000+ investors who trust AssetKraft
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="embla" ref={emblaRef}>
          <div className="pt-2 lg:pt-1 embla__container flex gap-6">
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="embla__slide flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0">
                <div className="bg-slate-50 rounded-3xl p-10 shadow-sm border border-slate-100 h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                  <div>
                    <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                      <Quote className="text-teal-600" size={24} />
                    </div>
                    <p className="text-slate-800 text-lg leading-relaxed font-medium italic mb-8">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200">
                    <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                    <div className="text-teal-600 text-sm font-semibold">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows and Controls */}
        <div className="flex flex-col items-center gap-8 mt-12">
          <div className="flex gap-4">
            <button 
              onClick={scrollPrev} 
              className="p-4 rounded-full bg-white border border-slate-200 hover:bg-teal-600 hover:text-white transition shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext} 
              className="p-4 rounded-full bg-white border border-slate-200 hover:bg-teal-600 hover:text-white transition shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <button
            onClick={openBookingModal}
            className="bg-slate-900 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-teal-600 transition-all duration-300 shadow-lg hover:scale-105"
          >
            📞 Book a free call
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;