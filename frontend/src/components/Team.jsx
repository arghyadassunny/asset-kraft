import React from 'react';
import { Linkedin } from 'lucide-react';
import { team } from '../data/mock';

const Team = () => {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Meet the Experts <span className="text-teal-600">Behind Your Wealth</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Backed by 20+ years of experience and a passionate team of 30+ professionals
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {team.map((member) => (
            <div 
              key={member.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-teal-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-slate-100">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 bg-gradient-to-br from-teal-50 to-yellow-50">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-teal-600 font-semibold mb-4">
                  {member.role}
                </p>
                <div className="flex items-center gap-2 text-slate-600 hover:text-teal-600 cursor-pointer transition-colors">
                  <Linkedin size={18} />
                  <span className="text-sm">Connect on LinkedIn</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-3xl font-bold mb-4">
            Join Our Growing Family of 5000+ Happy Investors
          </h3>
          <p className="text-lg text-teal-50 mb-6 max-w-2xl mx-auto">
            Experience personalized wealth management with a team that truly cares about your financial future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://orufybookings.com/asset-kraft/30-min-intro-call', '_blank')}
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Schedule a Consultation
            </button>
            <button 
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Our Calculator
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
