import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { companyInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 hover:text-teal-300 transition-colors">
              <Mail size={14} />
              <span className="hidden sm:inline">{companyInfo.email}</span>
            </a>
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
              <Phone size={14} />
              <span>{companyInfo.phone}</span>
            </a>
          </div>
          <div className="flex gap-3">
            <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors">
              LinkedIn
            </a>
            <a href={companyInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-white'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={companyInfo.logo} 
                alt="AssetKraft" 
                className="h-12 w-auto cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-slate-700 hover:text-teal-600 font-medium transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="text-slate-700 hover:text-teal-600 font-medium transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="text-slate-700 hover:text-teal-600 font-medium transition-colors">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('calculator')} className="text-slate-700 hover:text-teal-600 font-medium transition-colors">
                Calculator
              </button>
              <button onClick={() => scrollToSection('team')} className="text-slate-700 hover:text-teal-600 font-medium transition-colors">
                Our Team
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-teal-600/30"
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-teal-50 rounded-lg transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-teal-50 rounded-lg transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-teal-50 rounded-lg transition-colors">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('calculator')} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-teal-50 rounded-lg transition-colors">
                Calculator
              </button>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-teal-50 rounded-lg transition-colors">
                Our Team
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
