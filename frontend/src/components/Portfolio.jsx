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
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Our Investment <span className="text-teal-600">Portfolio Strategies</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Tailored investment approaches designed to match your risk appetite, financial goals, and time horizon
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className={`group bg-gradient-to-br ${bgColor} rounded-2xl p-8 border ${borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Icon */}
                <div className={`bg-white rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={iconColor} size={32} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {strategy.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {strategy.description}
                </p>

                {/* Details */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Risk Level:</span>
                    <span className={`text-sm font-semibold ${strategy.riskLevel === 'High' ? 'text-red-600' : strategy.riskLevel === 'Moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {strategy.riskLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Expected Returns:</span>
                    <span className="text-sm font-semibold text-teal-600">
                      {strategy.returns}
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs text-slate-500">Best for: </span>
                    <span className="text-xs font-medium text-slate-700">
                      {strategy.suitableFor}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-200">
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Note:</strong> Past performance is not indicative of future returns. 
            The returns mentioned are indicative and subject to market risks. We recommend consulting with our 
            financial advisors to choose the portfolio strategy that best aligns with your financial goals and risk profile.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-teal-600/30 hover:scale-105"
          >
            Discuss Your Investment Strategy
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
