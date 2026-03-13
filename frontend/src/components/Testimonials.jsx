import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = ({ openBookingModal }) => {
  // Sample testimonials - ready to be replaced with real client testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Business Owner, Mumbai',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      quote: 'With AssetKraft, I found the right partner for my family\'s financial future. Their personalized approach made all the difference.',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'IT Professional, Bangalore',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      quote: 'AssetKraft brought simplicity and clarity to my investments. I finally understand where my money is going and why.',
      rating: 5
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Entrepreneur, Delhi',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      quote: 'I am sure AssetKraft will help me achieve my financial goals better than I could alone. Their expertise is unmatched.',
      rating: 5
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-start mb-16 flex-wrap gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Trusted by <span className="text-teal-600">wealth creators</span> like you
            </h2>
          </div>
          <button
            onClick={openBookingModal}
            className="bg-white text-slate-900 border-2 border-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            📞 Book a free call
          </button>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          // Placeholder when no testimonials
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-12 text-center border-2 border-dashed border-slate-300">
              <div className="bg-teal-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Quote className="text-teal-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Client Testimonials Coming Soon
              </h3>
              <p className="text-slate-600 text-lg mb-8">
                We're collecting feedback from our 5000+ happy investors to share their success stories with you.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-teal-300 hover:-translate-y-2"
              >
                {/* Image/Video Thumbnail */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8 bg-slate-50">
                  {/* Quote */}
                  <div className="mb-6">
                    <Quote className="text-teal-200 mb-3" size={32} />
                    <p className="text-slate-800 text-lg leading-relaxed font-medium">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-6 border-t border-slate-200">
                    <div className="font-bold text-slate-900 text-lg mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {testimonials.length > 0 && (
          <div className="mt-16 text-center">
            <p className="text-slate-600 text-lg mb-6">
              Join 5000+ investors who trust AssetKraft with their wealth
            </p>
            <button
              onClick={openBookingModal}
              className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-teal-600/30 hover:scale-105"
            >
              Start Your Journey Today
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
