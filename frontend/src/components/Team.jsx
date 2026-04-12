import React from 'react';
import { Linkedin } from 'lucide-react';
import { team as defaultTeam } from '../data/mock';

const Team = ({ openBookingModal, dynamicData, isLoading }) => {
  
  // 1. Loading Skeleton (Matches fixed card dimensions)
  if (isLoading) {
    return (
      <section className="pt-4 pb-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-10 w-48 bg-slate-100 rounded-lg mx-auto mb-16 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[460px] w-[280px] bg-slate-50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Database Logic
  let displayTeam = defaultTeam;
  if (dynamicData?.team_data) {
    try {
      const parsed = JSON.parse(dynamicData.team_data);
      if (Array.isArray(parsed) && parsed.length > 0) displayTeam = parsed;
    } catch (e) {
      displayTeam = defaultTeam;
    }
  }

  return (
    /* MOBILE: pt-4 (Reduced padding above heading) | pb-16
       DESKTOP: lg:py-24 (Unchanged)
    */
    <section id="team" className="pt-4 pb-16 lg:py-[40px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3 lg:mb-4 px-2">
            Meet the <span className="text-teal-600">Founders</span>
          </h2>
          <p className="text-sm lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Backed by 20+ years of experience and a passionate team of 30+ professionals
          </p>
        </div>

        {/* Team Grid - justify-items-center ensures fixed-width cards stay centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 justify-items-center">
          {displayTeam.map((member) => (
            <div 
              key={member.id}
              /* CONSTANT SIZE: w-[280px] h-[460px] for both mobile and desktop
                 flex-col ensures content fills the fixed height correctly
              */
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-teal-300 hover:-translate-y-2 w-[280px] h-[460px] flex flex-col"
            >
              <div className="relative h-72 w-full overflow-hidden bg-slate-100 flex-shrink-0">
                <img 
                  src={member.image || 'https://via.placeholder.com/400x500?text=Member'} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 lg:p-6 bg-gradient-to-br from-teal-50 to-yellow-50 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-1 lg:mb-2 group-hover:text-teal-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 text-sm lg:text-base font-semibold mb-4">
                    {member.role}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-slate-600 hover:text-teal-600 cursor-pointer transition-colors mt-auto">
                  <Linkedin size={16} className="lg:w-[18px] lg:h-[18px]" />
                  <span className="text-xs lg:text-sm">Connect on LinkedIn</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 md:p-12 text-center text-white shadow-xl max-w-[340px] mx-auto lg:max-w-none">
          <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">Join Our Growing Family of 5000+ Happy Investors</h3>
          <p className="text-xs lg:text-lg text-teal-50 mb-6 max-w-2xl mx-auto px-2">
            Experience personalized wealth management with a team that truly cares about your financial future
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <button onClick={openBookingModal} className="bg-white text-teal-600 px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 shadow-lg">
              Schedule a Consultation
            </button>
            <button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })} className="bg-yellow-400 text-slate-900 px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-yellow-300 transition-all duration-300 shadow-lg">
              Try Our Calculator
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;