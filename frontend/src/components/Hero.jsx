import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
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
        src="https://res.cloudinary.com/djm5rsjwl/image/upload/v1787606758/Hero_image_3_uvz18u.png"
        alt="Hero asset"
        className="w-full h-auto object-contain lg:scale-110 lg:origin-center"
        style={{ maxHeight: '750px' }}
      />
    );
  };

  return (
    <section id="home" className="relative bg-white pt-20 lg:pt-32 pb-12 lg:pb-32 overflow-hidden lg:-mb-20 -mb-4">
      {/* Background glow effects inverted */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50/70 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-center lg:items-start space-y-6 lg:space-y-8">
            
            {/* Main Heading */}
            <h1 className="text-teal-700 text-center lg:text-left tracking-tight">
              <span className="block text-lg sm:text-2xl lg:text-4xl font-medium mt-2 lg:mt-3 text-teal-600/90 mb-2">
                You Enjoy, While We
              </span>
              <span style={{ lineHeight: 0.85 }} className="block text-5xl sm:text-5xl lg:text-8xl font-extrabold leading-[0.25] text-teal-700 -mb-4">
                Craft Your Wealth!
              </span>
            </h1>

            {/* Mobile Image */}
            <div className="w-full lg:hidden">
              <HeroVideo />
            </div>

{/* Subheading & Description */}
<div className="space-y-3 lg:space-y-4 text-center lg:text-left">
  <p className="text-[9px] px-6 lg:px-0 lg:text-sm text-teal-800/80 leading-relaxed max-w-md lg:max-w-none mx-auto lg:mx-0">
    We are an AMFI-registered mutual fund distributor helping 5,000+ families build <br className="hidden lg:inline" />wealth through goal-based mutual fund investing, insurance, and financial planning.
  </p>

              {/* Bullet Points */}
              <ul className="space-y-2.5 pt-1 text-left inline-block">
                <li className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-teal-800">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                  <span>Helps in achieving your financial goals</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-teal-800">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                  <span>End-to-End Wealth Management</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-teal-800">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                  <span>Personalised Investment Strategies</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row justify-center lg:justify-start gap-3 w-full pt-2 lg:pt-4">
              <Button 
                onClick={openBookingModal}
                className="mt-0 lg:-mt-4 w-1/2 lg:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold text-[13px] lg:text-lg px-2 lg:px-8 py-3 lg:py-6 transition-all"
              >
                Book A Free Call
                <Calendar className="ml-1 lg:ml-2 text-white" size={12} />
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