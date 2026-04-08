import React from 'react';
import { TrendingUp, Users, Shield, Award, MapPin, Clock } from 'lucide-react';
import { stats as defaultStats } from '../data/mock';

// Mapping indices to Icons to keep your UI identical
const iconMap = {
  0: TrendingUp,
  1: Users,
  2: Shield,
  3: Award,
  4: MapPin,
  5: Clock
};

// Mapping the IDs in your mock data to the keys you created in Admin/TiDB
const dbKeyMap = {
  1: 'stat_aum',
  2: 'stat_investors',
  3: 'stat_insurance',
  4: 'stat_team',
  5: 'stat_offices',
  6: 'stat_experience'
};

const Stats = ({ dynamicStats }) => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - UI Unchanged */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted Worldwide. <span className="text-teal-600">Powered by Proven Experience</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Numbers that reflect our commitment to your financial success
          </p>
        </div>

        {/* Stats Grid - UI Unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultStats.map((stat, index) => {
            const Icon = iconMap[index];
            
            /** * LOGIC: 
             * 1. Look into dynamicStats (from Home.jsx) 
             * 2. Use the ID to find the right key (e.g., ID 1 -> 'stat_aum')
             * 3. If TiDB has data, show it. Otherwise, show the mock value (e.g., '700+')
             */
            const liveValue = dynamicStats ? dynamicStats[dbKeyMap[stat.id]] : null;
            const displayValue = liveValue || stat.value;

            return (
              <div 
                key={stat.id}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-teal-200 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4">
                  {/* Icon Container */}
                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-teal-600" size={28} />
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex-1">
                    <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {displayValue}
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