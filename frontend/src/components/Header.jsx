import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { companyInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-3 left-4 right-4 z-50 transition-all duration-400 ${
        isScrolled 
          ? 'bg-white/45 shadow-[0_4px_40px_rgba(0,0,0,0.10),0_1px_0_rgba(255,255,255,0.8)_inset]' 
          : 'bg-white/28 shadow-[0_2px_32px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.7)_inset]'
      } backdrop-blur-[24px] backdrop-saturate-[180%] border border-white/45 rounded-[14px] px-8 md:px-12 py-4`}
      style={{
        width: 'calc(100% - 32px)',
      }}
    >
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center group"
        >
          <img 
            src={companyInfo.logo} 
            alt="AssetKraft - AMFI Registered Mutual Fund Distributor" 
            className="h-12 w-auto"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-9">
          <button 
            onClick={() => scrollToSection('home')} 
            className="relative text-[15px] font-medium text-[#2d3e38] hover:text-teal-600 transition-colors after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-teal-600 after:rounded-sm after:transition-all after:duration-250 hover:after:w-full"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="relative text-[15px] font-medium text-[#2d3e38] hover:text-teal-600 transition-colors after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-teal-600 after:rounded-sm after:transition-all after:duration-250 hover:after:w-full"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="relative text-[15px] font-medium text-[#2d3e38] hover:text-teal-600 transition-colors after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-teal-600 after:rounded-sm after:transition-all after:duration-250 hover:after:w-full"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('calculator')} 
            className="relative text-[15px] font-medium text-[#2d3e38] hover:text-teal-600 transition-colors after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-teal-600 after:rounded-sm after:transition-all after:duration-250 hover:after:w-full"
          >
            Calculator
          </button>
          <button 
            onClick={() => scrollToSection('team')} 
            className="relative text-[15px] font-medium text-[#2d3e38] hover:text-teal-600 transition-colors after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-[2px] after:bg-teal-600 after:rounded-sm after:transition-all after:duration-250 hover:after:w-full"
          >
            Our Team
          </button>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => scrollToSection('contact')}
          className="hidden lg:block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-200 shadow-[0_4px_14px_rgba(29,168,150,0.35)] hover:shadow-[0_6px_20px_rgba(29,168,150,0.45)] hover:-translate-y-[1px]"
        >
          Contact Us
        </Button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu?.classList.toggle('hidden');
          }}
          className="lg:hidden p-2 rounded-lg hover:bg-teal-50 transition-colors"
        >
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden lg:hidden mt-4 pt-4 border-t border-white/30">
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => { scrollToSection('home'); document.getElementById('mobile-menu')?.classList.add('hidden'); }} 
            className="text-left px-4 py-2 text-sm font-medium text-[#2d3e38] hover:text-teal-600 hover:bg-teal-50/50 rounded-lg transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => { scrollToSection('services'); document.getElementById('mobile-menu')?.classList.add('hidden'); }} 
            className="text-left px-4 py-2 text-sm font-medium text-[#2d3e38] hover:text-teal-600 hover:bg-teal-50/50 rounded-lg transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => { scrollToSection('portfolio'); document.getElementById('mobile-menu')?.classList.add('hidden'); }} 
            className="text-left px-4 py-2 text-sm font-medium text-[#2d3e38] hover:text-teal-600 hover:bg-teal-50/50 rounded-lg transition-colors"
          >
            Portfolio
          </button>
          <button 
            onClick={() => { scrollToSection('calculator'); document.getElementById('mobile-menu')?.classList.add('hidden'); }} 
            className="text-left px-4 py-2 text-sm font-medium text-[#2d3e38] hover:text-teal-600 hover:bg-teal-50/50 rounded-lg transition-colors"
          >
            Calculator
          </button>
          <button 
            onClick={() => { scrollToSection('team'); document.getElementById('mobile-menu')?.classList.add('hidden'); }} 
            className="text-left px-4 py-2 text-sm font-medium text-[#2d3e38] hover:text-teal-600 hover:bg-teal-50/50 rounded-lg transition-colors"
          >
            Our Team
          </button>
          <Button 
            onClick={() => { scrollToSection('contact'); document.getElementById('mobile-menu')?.classList.add('hidden'); }}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
