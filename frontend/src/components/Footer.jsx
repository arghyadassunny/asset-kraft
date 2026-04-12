import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Footer = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img 
              src={"https://res.cloudinary.com/djm5rsjwl/image/upload/v1776006185/Asset_kraft_white_logo_fup2yb.png"} 
              alt="AssetKraft" 
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
              Your trusted partner in wealth management. We combine insight-driven strategies 
              and industry expertise to help you achieve your financial goals.
            </p>
            <div className="flex gap-4">
              <a 
                href={companyInfo.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={companyInfo.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={companyInfo.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('calculator')}
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('team')}
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-400 hover:text-teal-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Mail size={20} className="mt-0.5 group-hover:text-teal-400" />
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Phone size={20} className="mt-0.5 group-hover:text-teal-400" />
                  <span>{companyInfo.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin size={20} className="mt-0.5" />
                  <span>
                    Offices at {companyInfo.locations.join(' & ')}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <p className="text-slate-500 text-sm leading-relaxed">
            <strong className="text-slate-400">Disclaimer:</strong> Mutual fund investments are subject to market risks. 
            Please read all scheme-related documents carefully before investing. Past performance is not indicative of 
            future returns. Asset Kraft Investments Pvt. Ltd. is an AMFI Registered Mutual Fund Distributor.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Asset Kraft Investments Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
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
