import React, { useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const Testimonials = ({ openBookingModal, dynamicData }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Fallback Data
  const defaultTestimonials = [
    { id: 1, name: 'Rajesh Kumar', role: 'Business Owner, Mumbai', quote: 'With AssetKraft, I found the right partner for my family\'s financial future.' },
    { id: 2, name: 'Priya Sharma', role: 'IT Professional, Bangalore', quote: 'AssetKraft brought simplicity and clarity to my investments.' }
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
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Trusted by <span className="text-teal-600">wealth creators</span> like you
          </h2>
          <p className="text-slate-600 text-lg">Join 5000+ investors who trust AssetKraft</p>
        </div>

        {/* Carousel Viewport */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="embla__slide flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0">
                {/* Clean Card without Image */}
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

        {/* Arrows and Controls - Now in the Middle-Bottom */}
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