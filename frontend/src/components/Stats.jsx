import React from 'react';
import { TrendingUp, Users, Shield, Award, MapPin, Clock } from 'lucide-react';
import { stats as defaultStats } from '../data/mock';

// Mapping indices to Icons
const iconMap = {
  0: TrendingUp,
  1: Users,
  2: Shield,
  3: Award,
  4: MapPin,
  5: Clock
};

// Mapping the IDs in your mock data to the keys created in Admin/TiDB
const dbKeyMap = {
  1: 'stat_aum',
  2: 'stat_investors',
  3: 'stat_insurance',
  4: 'stat_team',
  5: 'stat_offices',
  6: 'stat_experience'
};

const Stats = ({ dynamicStats }) => {
  // Take only the first 4 items to display in a single line
  const displayedStats = defaultStats.slice(0, 4);

  return (
    <section className="pt-[40px] pb-16 lg:py-20 bg-slate-50 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 px-2">
            Trusted Worldwide. <span className="text-teal-600">Powered by Proven Experience</span>
          </h2>
          <p className="text-sm lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Numbers that reflect our commitment to your financial success
          </p>
        </div>

        {/* Stats Grid: 2 columns on mobile, 4 in 1 single line on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayedStats.map((stat, index) => {
            const Icon = iconMap[index];
            
            const liveValue = dynamicStats ? dynamicStats[dbKeyMap[stat.id]] : null;
            const displayValue = liveValue || stat.value;

            return (
              <div 
                key={stat.id}
                className="group bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-teal-200 lg:hover:-translate-y-2"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-start gap-3 lg:gap-4">
                  
                  {/* Icon Container */}
                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-lg lg:rounded-xl p-2 lg:p-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-teal-600 w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex-1">
                    <div className="text-xl lg:text-3xl font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors">
                      {displayValue}
                    </div>
                    
                    <div className="text-[11px] lg:text-base font-semibold text-slate-700 mb-1 leading-tight">
                      {stat.label}
                    </div>
                    
                    {/* Description */}
                    <div className="hidden lg:block text-xs text-slate-500 line-clamp-2">
                      {stat.description}
                    </div>
                    <div className="lg:hidden text-[9px] text-slate-400 leading-tight">
                      {stat.description.split('.')[0]}
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