import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    /* MOBILE: pt-10 pb-6
       DESKTOP: lg:pt-16 lg:pb-8
    */
    <footer className="bg-slate-900 text-white pt-10 pb-6 lg:pt-16 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10 lg:mb-12">
          
          {/* Company Info - Centered on mobile */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <img 
              src={"https://res.cloudinary.com/djm5rsjwl/image/upload/v1776006185/Asset_kraft_white_logo_fup2yb.png"} 
              alt="AssetKraft" 
              className="h-9 lg:h-12 w-auto mb-5 lg:mb-6 brightness-0 invert mx-auto lg:mx-0"
            />
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-6 max-w-[280px] sm:max-w-md">
              Your trusted partner in wealth management. We combine insight-driven strategies 
              and industry expertise to help you achieve your financial goals.
            </p>
            <div className="flex gap-3 lg:gap-4 justify-center lg:justify-start">
              <a 
                href={companyInfo.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 lg:p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Linkedin size={18} className="lg:w-5 lg:h-5" />
              </a>
              <a 
                href={companyInfo.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 lg:p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Facebook size={18} className="lg:w-5 lg:h-5" />
              </a>
              <a 
                href={companyInfo.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 lg:p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Instagram size={18} className="lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Centered on mobile */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-base lg:text-lg font-bold mb-4 lg:mb-5 text-white">Quick Links</h3>
            <ul className="space-y-2.5 lg:space-y-3">
              {['home', 'services', 'calculator', 'team', 'contact'].map((id) => (
                <li key={id}>
                  <button 
                    onClick={() => scrollToSection(id)}
                    className="text-slate-400 text-sm lg:text-base hover:text-teal-400 transition-colors capitalize"
                  >
                    {id === 'team' ? 'Our Team' : id === 'contact' ? 'Contact Us' : id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Centered layout for mobile */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-base lg:text-lg font-bold mb-4 lg:mb-5 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Mail size={18} className="lg:w-5 lg:h-5 group-hover:text-teal-400" />
                  <span className="text-sm lg:text-base">{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Phone size={18} className="lg:w-5 lg:h-5 group-hover:text-teal-400" />
                  <span className="text-sm lg:text-base">{companyInfo.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-slate-400">
                  <MapPin size={18} className="lg:w-5 lg:h-5" />
                  <span className="text-sm lg:text-base">
                    Offices at {companyInfo.locations.join(' & ')}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer - Compact and centered on mobile */}
        <div className="border-t border-slate-800 pt-6 lg:pt-8 mb-6 lg:mb-8 text-center lg:text-left">
          <p className="text-slate-500 text-[10px] lg:text-sm leading-relaxed max-w-4xl mx-auto lg:mx-0">
            <strong className="text-slate-400">Disclaimer:</strong> Mutual fund investments are subject to market risks. 
            Please read all scheme-related documents carefully before investing. Past performance is not indicative of 
            future returns. Asset Kraft Investments Pvt. Ltd. is an AMFI Registered Mutual Fund Distributor.
          </p>
        </div>

        {/* Bottom Bar - Stacked on mobile */}
        <div className="border-t border-slate-800 pt-6 lg:pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-center">
          <p className="text-slate-500 text-[10px] lg:text-sm">
            © {new Date().getFullYear()} Asset Kraft Investments Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-4 lg:gap-6 text-[10px] lg:text-sm">
            <button className="text-slate-500 hover:text-teal-400 transition-colors">
              Privacy Policy
            </button>
            <button className="text-slate-500 hover:text-teal-400 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;