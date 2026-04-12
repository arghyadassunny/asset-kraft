import React from 'react';
import { TrendingUp, Shield, PieChart, Target, BarChart3, Wallet } from 'lucide-react';

const portfolioStrategies = [
  {
    id: 1,
    title: "Equity Growth Portfolio",
    description: "High-growth potential through diversified equity mutual funds",
    icon: TrendingUp,
    riskLevel: "High",
    returns: "12-15% p.a.",
    suitableFor: "Long-term wealth creation",
    color: "teal"
  },
  {
    id: 2,
    title: "Balanced Hybrid Portfolio",
    description: "Optimal mix of equity and debt for stable growth",
    icon: PieChart,
    riskLevel: "Moderate",
    returns: "9-12% p.a.",
    suitableFor: "Balanced investors",
    color: "yellow"
  },
  {
    id: 3,
    title: "Debt Conservative Portfolio",
    description: "Capital protection with steady income generation",
    icon: Shield,
    riskLevel: "Low",
    returns: "7-9% p.a.",
    suitableFor: "Risk-averse investors",
    color: "teal"
  },
  {
    id: 4,
    title: "Goal-Based Planning",
    description: "Customized portfolios aligned with specific life goals",
    icon: Target,
    riskLevel: "Custom",
    returns: "Goal-dependent",
    suitableFor: "Targeted objectives",
    color: "yellow"
  },
  {
    id: 5,
    title: "Tax-Saving Portfolio",
    description: "ELSS and tax-efficient instruments for wealth + savings",
    icon: Wallet,
    riskLevel: "Moderate",
    returns: "10-13% p.a.",
    suitableFor: "Tax planning",
    color: "teal"
  },
  {
    id: 6,
    title: "Retirement Planning",
    description: "Long-term corpus building for secure retirement",
    icon: BarChart3,
    riskLevel: "Moderate",
    returns: "11-14% p.a.",
    suitableFor: "Retirement goals",
    color: "yellow"
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 px-2">
            Our Investment <span className="text-teal-600">Portfolio Strategies</span>
          </h2>
          <p className="text-sm lg:text-lg text-slate-600 max-w-3xl mx-auto px-4">
            Tailored investment approaches designed to match your risk appetite, financial goals, and time horizon
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolioStrategies.map((strategy) => {
            const Icon = strategy.icon;
            const bgColor = strategy.color === 'teal' 
              ? 'from-teal-50 to-cyan-50' 
              : 'from-yellow-50 to-amber-50';
            const iconColor = strategy.color === 'teal' ? 'text-teal-600' : 'text-yellow-600';
            const borderColor = strategy.color === 'teal' ? 'border-teal-200' : 'border-yellow-200';

            return (
              <div 
                key={strategy.id}
                /* MOBILE: max-w-[280px] and mx-auto added to shrink card width
                   DESKTOP: lg:max-w-none to fill grid column
                */
                className={`group bg-gradient-to-br ${bgColor} rounded-2xl p-6 lg:p-8 border ${borderColor} hover:shadow-xl transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left max-w-[280px] mx-auto lg:max-w-none`}
              >
                <div className={`bg-white rounded-xl w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={iconColor} size={window.innerWidth < 1024 ? 24 : 32} />
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-2 lg:mb-3">
                  {strategy.title}
                </h3>

                <p className="text-sm lg:text-base text-slate-600 mb-5 leading-relaxed">
                  {strategy.description}
                </p>

                <div className="w-full space-y-2.5 pt-4 border-t border-slate-200/60">
                  <div className="flex justify-between items-center text-xs lg:text-sm">
                    <span className="text-slate-500">Risk Level:</span>
                    <span className={`font-semibold ${strategy.riskLevel === 'High' ? 'text-red-600' : strategy.riskLevel === 'Moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {strategy.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs lg:text-sm">
                    <span className="text-slate-500">Expected Returns:</span>
                    <span className="font-semibold text-teal-600">
                      {strategy.returns}
                    </span>
                  </div>
                  <div className="pt-1">
                    <span className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-wider font-medium">Best for: </span>
                    <span className="text-[11px] lg:text-xs font-semibold text-slate-700">
                      {strategy.suitableFor}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 lg:mt-12 bg-slate-50 rounded-xl p-4 lg:p-6 border border-slate-200 max-w-[320px] mx-auto lg:max-w-none">
          <p className="text-xs lg:text-sm text-slate-600 leading-relaxed text-center lg:text-left">
            <strong className="text-slate-900">Note:</strong> Past performance is not indicative of future returns. 
            Indicative returns are subject to market risks. We recommend consulting with our 
            advisors to align with your specific risk profile.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 lg:mt-12 text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-semibold text-base lg:text-lg transition-all duration-300 hover:shadow-xl hover:shadow-teal-600/30 hover:scale-105"
          >
            Discuss Your Strategy
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;