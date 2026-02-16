import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  // Empty testimonials array - ready for content to be added
  const testimonials = [];

  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            What Our <span className="text-teal-600">Clients Say</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hear from the families and individuals who trust us with their financial future
          </p>
        </div>

        {/* Content Area */}
        {testimonials.length === 0 ? (
          // Placeholder for when testimonials are empty
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-300">
              <div className="bg-teal-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Quote className="text-teal-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Client Testimonials Coming Soon
              </h3>
              <p className="text-slate-600 text-lg mb-8">
                We're collecting feedback from our 5000+ happy investors to share their success stories with you. 
                Check back soon!
              </p>
              <div className="flex items-center justify-center gap-8 pt-6 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-bold text-teal-600">5000+</div>
                  <div className="text-sm text-slate-600">Happy Clients</div>
                </div>
                <div className="h-12 w-px bg-slate-300"></div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600">20+</div>
                  <div className="text-sm text-slate-600">Years Trust</div>
                </div>
                <div className="h-12 w-px bg-slate-300"></div>
                <div>
                  <div className="text-3xl font-bold text-teal-600">700+</div>
                  <div className="text-sm text-slate-600">Crores AUM</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Testimonials Grid (when testimonials are added)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-2"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                    />
                  ))}
                </div>

                {/* Quote */}
                <Quote className="text-teal-200 mb-4" size={32} />
                
                {/* Testimonial Text */}
                <p className="text-slate-700 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-100 to-yellow-100 flex items-center justify-center">
                      <span className="text-teal-700 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-6">
            Ready to start your success story with AssetKraft?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105"
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
