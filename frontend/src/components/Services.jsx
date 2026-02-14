import React from 'react';
import { TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles, Check, X } from 'lucide-react';
import { services, philosophy, values } from '../data/mock';

const iconComponents = {
  TrendingUp, Shield, Target, FileText, Handshake, CheckCircle, BookOpen, Lock, Sparkles
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-teal-600">Services</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive wealth management solutions tailored to your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = iconComponents[service.icon];
              return (
                <div 
                  key={service.id}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-teal-300 hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-teal-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* What We Do & Don't Do */}
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
                <div 
                  key={value.id}
                  className="group bg-teal-50/50 rounded-xl p-6 border border-teal-200 hover:bg-teal-50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-600 rounded-full p-2 mt-1">
                      <Check className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* What We Don't Do */}
            <div className="space-y-6">
              {values.filter(v => v.type === 'dont').map((value) => (
                <div 
                  key={value.id}
                  className="group bg-slate-50 rounded-xl p-6 border border-slate-200 hover:bg-slate-100 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-600 rounded-full p-2 mt-1">
                      <X className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
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
                <div 
                  key={item.id}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-yellow-300 hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-yellow-50 to-teal-50 rounded-xl w-16 h-16 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-yellow-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
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
