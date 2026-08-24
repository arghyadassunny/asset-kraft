import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import React, { useEffect, useRef } from 'react';

const Hero = ({ openBookingModal }) => {
  const HeroVideo = () => {
    const videoRef = useRef(null);
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }, []);

    return (
      <img
        src="https://res.cloudinary.com/djm5rsjwl/image/upload/v1787602336/Hero_image_1_sshheu.png"
        alt="Hero asset"
        className="w-full h-auto object-contain lg:scale-110 lg:origin-center"
        style={{ maxHeight: '750px' }}
      />
    );
  };

  return (
    <section id="home" className="relative bg-teal-600 pt-20 lg:pt-32 pb-12 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-8">
            
            {/* Main Heading */}
            <h1 className="text-white text-center lg:text-left tracking-tight">
              <span className="block text-lg sm:text-2xl lg:text-3xl font-medium mt-1 lg:mt-2 text-white/90">
                You Enjoy! While We
              </span>
              <span className="block text-5xl sm:text-5xl lg:text-7xl font-extrabold leading-tight">
                 Craft Your Wealth
              </span>
            </h1>

            {/* Mobile Image */}
            <div className="w-full lg:hidden">
              <HeroVideo />
            </div>

  {/* Subheading & Description */}
            <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
              <p className="text-xs lg:text-base text-white leading-relaxed">
                At Asset Kraft, we navigate <span className="font-semibold text-white">the noise of the markets</span> to find the signal of your success.
              </p>
              <p className="text-[11px] lg:text-sm text-white/90 leading-relaxed max-w-md lg:max-w-none mx-auto lg:mx-0">
                We are an AMFI-registered mutual fund distributor helping 5,000+ families build wealth through goal-based mutual fund investing, insurance, and financial planning.
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2 pt-1 text-left inline-block">
                <li className="flex items-center gap-2 text-[11px] lg:text-sm text-white/95">
                  <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white shrink-0" />
                  <span>Helps in achieving your financial goals</span>
                </li>
                <li className="flex items-center gap-2 text-[11px] lg:text-sm text-white/95">
                  <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white shrink-0" />
                  <span>End-to-End Wealth Management</span>
                </li>
                <li className="flex items-center gap-2 text-[11px] lg:text-sm text-white/95">
                  <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white shrink-0" />
                  <span>Personalised Investment Strategies</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row justify-center lg:justify-start gap-3 w-full pt-2 lg:pt-4">
              <Button 
                onClick={openBookingModal}
                className="w-1/2 lg:w-auto bg-white hover:bg-slate-100 text-teal-700 font-semibold text-[10px] lg:text-lg px-2 lg:px-8 py-3 lg:py-6 transition-all"
              >
                Get Started
                <ArrowRight className="ml-1 lg:ml-2" size={12} />
              </Button>
              
            </div>
          </div>

          <div className="hidden lg:block w-full">
            <HeroVideo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;