import React from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Footer = () => {
  const location = useLocation();
  const showQuickLinks = location.pathname === '/';

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white pt-10 pb-6 lg:pt-16 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10 lg:mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <img 
              src="https://res.cloudinary.com/djm5rsjwl/image/upload/v1776006185/Asset_kraft_white_logo_fup2yb.png" 
              alt="AssetKraft" 
              className="h-9 lg:h-12 w-auto mb-5 lg:mb-6 brightness-0 invert mx-auto lg:mx-0"
            />
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-6 max-w-[280px] sm:max-w-md">
              Your trusted partner in wealth management. We combine insight-driven strategies 
              and industry expertise to help you achieve your financial goals.
            </p>
            <div className="flex gap-3 lg:gap-4 justify-center lg:justify-start">
              <a 
                href={companyInfo?.social?.linkedin || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 lg:p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Linkedin size={18} className="lg:w-5 lg:h-5" />
              </a>
              <a 
                href={companyInfo?.social?.facebook || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 lg:p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Facebook size={18} className="lg:w-5 lg:h-5" />
              </a>
              <a 
                href={companyInfo?.social?.instagram || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 p-2.5 lg:p-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Instagram size={18} className="lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Only visible on Home Page */}
          {showQuickLinks && (
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h3 className="text-base lg:text-lg font-bold mb-4 lg:mb-5 text-white">Quick Links</h3>
              <ul className="space-y-2.5 lg:space-y-3">
                {['home', 'services', 'calculator', 'disclosures', 'team', 'contact'].map((id) => (
                  <li key={id}>
                    {id === 'disclosures' ? (
                      <a 
                        href="/disclosures"
                        className="text-slate-400 text-sm lg:text-base hover:text-teal-400 transition-colors capitalize block"
                      >
                        Disclosures
                      </a>
                    ) : (
                      <button 
                        onClick={() => scrollToSection(id)}
                        className="text-slate-400 text-sm lg:text-base hover:text-teal-400 transition-colors capitalize"
                      >
                        {id === 'team' ? 'Our Team' : id === 'contact' ? 'Contact Us' : id}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          <div className={`flex flex-col items-center lg:items-start text-center lg:text-left ${!showQuickLinks ? 'lg:col-span-2' : ''}`}>
            <h3 className="text-base lg:text-lg font-bold mb-4 lg:mb-5 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${companyInfo?.email}`}
                  className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Mail size={18} className="lg:w-5 lg:h-5 group-hover:text-teal-400 shrink-0" />
                  <span className="text-sm lg:text-base break-all">{companyInfo?.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${companyInfo?.phone}`}
                  className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Phone size={18} className="lg:w-5 lg:h-5 group-hover:text-teal-400 shrink-0" />
                  <span className="text-sm lg:text-base">{companyInfo?.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 text-slate-400">
                  <MapPin size={18} className="lg:w-5 lg:h-5 shrink-0 mt-0.5" />
                  <span className="text-sm lg:text-base">
                    Jeevan Deep Building, Junction, 1 Middleton Street, 3rd Floor, Suite 302 & 303, Near Maidan Metro Railway Station, Kolkata, West Bengal, 700071
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Compliance Section */}
        <div className="border-t border-slate-800 pt-8 pb-6 space-y-6 text-xs lg:text-sm text-slate-400 text-center lg:text-left">
          
          {/* ARN Details */}
          <div>
            <p className="font-medium text-slate-300">
              ARN No: <span className="text-white">322211</span> | Validity of Registration: <span className="text-white">19 February 2028</span>
            </p>
          </div>

          {/* Officers Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            <div className="space-y-1">
              <h4 className="font-semibold text-white">Compliance Officer:</h4>
              <p>Name: Sanjeev Mundhra</p>
              <p>
                Email:{' '}
                <a href="mailto:sanjeevmundhra@gmail.com" className="text-teal-400 hover:underline">
                  sanjeevmundhra@gmail.com
                </a>
              </p>
              <p>Mobile Number: +91 9831151241</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-semibold text-white">Grievance Officer:</h4>
              <p>Name: Deepanwita Maitra</p>
              <p>
                Email:{' '}
                <a href="mailto:assetkraft.hrd@gmail.com" className="text-teal-400 hover:underline">
                  assetkraft.hrd@gmail.com
                </a>
              </p>
              <p>Mobile Number: +91 9147756211</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-6 mb-6 text-center lg:text-left">
          <p className="text-slate-500 text-[10px] lg:text-xs leading-relaxed max-w-7xl">
            <strong className="text-slate-400">Disclaimer:</strong> Asset Kraft Investments Pvt. Ltd. is an AMFI Registered Mutual Fund Distributor (ARN No. 322211), engaged in the distribution of Mutual Fund and related financial products and services. We are not a SEBI-registered Investment Adviser. All content on the website - including views, market commentary, illustrations, examples and calculations - is provided for general information and investor education only. It does not constitute investment advice, a recommendation or a solicitation, and no specific return, appreciation, income or outcome is guaranteed. Mutual Fund investments are subject to market risks. The value of investments may rise or fall with market conditions and other factors, and past performance is not indicative of future returns. Before investing, investors should independently evaluate suitability against their own investment objectives, risk appetite, financial circumstances and investment horizon, and should read the Scheme Information Document (SID), Key Information Memorandum (KIM) and other official documents issued by the concerned Mutual Fund/AMC, including the scheme's investment objective, risk factors, portfolio, expense ratio and exit load. Asset Kraft may receive commission or distribution remuneration from Asset Management Companies, which varies across products and schemes; such commissions are disclosed on our website. Investors are free to invest either through a Mutual Fund Distributor or directly with the Mutual Fund/AMC under the Direct Plan. For any grievance relating to a Mutual Fund investment, investors may approach Asset Kraft Investments Pvt. Ltd. or the concerned Mutual Fund/AMC.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-center">
          <p className="text-slate-500 text-[10px] lg:text-xs">
            © {new Date().getFullYear()} Asset Kraft Investments Private Limited. All Rights Reserved.
          </p>
          <div className="flex gap-4 lg:gap-6 text-[10px] lg:text-xs">
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