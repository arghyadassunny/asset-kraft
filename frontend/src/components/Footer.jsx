import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
import { companyInfo } from '../data/mock';

const Footer = () => {
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

          {/* Quick Links */}
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

          {/* Contact Info */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
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
            <strong className="text-slate-400">Disclaimer:</strong> Asset Kraft Investments Pvt. Ltd. is an AMFI-Registered Mutual Fund Distributor bearing ARN No. 322211. We are engaged in the distribution of Mutual Fund products and related financial products/services. We are not a SEBI-registered Investment Adviser unless specifically stated otherwise.
The information and content provided on this website are for general information, investor education and awareness purposes only. The information should not be construed as investment advice, a recommendation, solicitation or an assurance of returns. Mutual Fund investments are subject to market risks. The value of investments may go up or down depending on market conditions and other factors. Past performance is not indicative of future returns. Investors should read all scheme-related documents carefully before investing and consider their investment objectives, risk appetite, financial circumstances and investment horizon.

Any views, opinions, market commentary, illustrations, examples, calculations or information relating to Mutual Fund schemes or other investment products are provided for informational and educational purposes and should not be construed as a guarantee of performance or returns. Asset Kraft may receive commission/distribution remuneration from Asset Management Companies (AMCs) for the distribution of Mutual Fund schemes. Such commission may vary across products and schemes. Details of commissions paid by AMCs to distributors are disclosed to investors through the applicable regulatory disclosures/CAS. Investors are free to choose whether to invest through a Mutual Fund Distributor or directly through the Mutual Fund/AMC under the Direct Plan. Investors should independently evaluate the suitability of any investment before investing.

Asset Kraft does not guarantee any specific return, appreciation, income or outcome from any investment. Investors are requested to verify all scheme-related information, including investment objective, risk factors, portfolio, expense ratio, exit load and other applicable terms, from the respective Scheme Information Document (SID), Key Information Memorandum (KIM) and other official documents issued by the concerned Mutual Fund/AMC before investing. For any grievance or complaint relating to a Mutual Fund investment, investors may first approach the concerned Mutual Fund/AMC or Asset Kraft Investments Pvt. Ltd. for assistance. If the grievance remains unresolved, investors may approach the appropriate regulatory/grievance redressal mechanism, including SEBI's SCORES platform, as applicable.

Mutual Fund investments are subject to market risks, read all scheme related documents carefully before investing.
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