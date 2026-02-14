import React from 'react';
import { TrendingUp, Users, Shield, Award, MapPin, Clock } from 'lucide-react';
import { stats } from '../data/mock';

const iconMap = {
  0: TrendingUp,
  1: Users,
  2: Shield,
  3: Award,
  4: MapPin,
  5: Clock
};

const Stats = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted Worldwide. <span className="text-teal-600">Powered by Proven Experience</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Numbers that reflect our commitment to your financial success
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[index];
            return (
              <div 
                key={stat.id}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-teal-200 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-teal-600" size={28} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold text-slate-700 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-slate-500">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
