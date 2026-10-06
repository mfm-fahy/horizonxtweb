import React from 'react';
import { sounds } from '../utils/sound';

export const InstitutionalSupport: React.FC = () => {
  const institutionalLogos = [
    {
      name: 'SRM TRP Engineering College',
      logo: '/institutions/srm-trp-engineering.png',
      alt: 'SRM TRP Engineering College Logo',
    },
   
    {
      name: 'SRM Institute of Science & Technology, Tiruchirappalli',
      logo: '/institutions/srm-ist-tiruchirappalli.jpg',
      alt: 'SRM Institute of Science & Technology Tiruchirappalli Logo',
    },
    {
      name: 'Trichy SRM Medical College Hospital & Research Centre',
      logo: '/institutions/srm-medical.jpg',
      alt: 'Trichy SRM Medical College Hospital & Research Centre Logo',
    },
    {
      name: 'SRM Trichy College of Nursing',
      logo: '/institutions/srm-nursing.png',
      alt: 'SRM Trichy College of Nursing Logo',
    },
  
     {
      name: 'SRM Trichy Arts & Science College',
      logo: '/institutions/srm-arts-science.png',
      alt: 'SRM Trichy Arts & Science College Logo',
    },
    {
      name: 'Tiruchirappalli SRM Institutions',
      logo: '/institutions/srm-institutions.png',
      alt: 'Tiruchirappalli SRM Institutions Logo',
    },
    
  ];

  return (
    <section id="institutional-support" className="relative py-24 px-4 sm:px-6 lg:px-12 w-full select-none">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* 1. INCUBATION SUPPORT */}
        <div className="text-center space-y-6">
          {/* Category Section Header */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-teal/60" />
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-teal-light tracking-[0.25em] uppercase">
              INCUBATION SUPPORT
            </h3>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-teal/60" />
          </div>

          {/* Incubation Card (R Shivakumar Foundation) */}
          <div className="flex justify-center">
            <div
              onMouseEnter={() => sounds.playHover()}
              className="group relative rounded-[28px] bg-white p-6 sm:p-8 w-full max-w-lg shadow-[0_10px_35px_rgba(0,0,0,0.5)] border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-gold cursor-pointer flex items-center justify-center min-h-[140px]"
            >
              <img
                src="/institutions/r-shivakumar-foundation.png"
                alt="R Shivakumar Foundation Logo"
                className="max-h-24 sm:max-h-28 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* 2. INSTITUTIONAL SUPPORT */}
        <div className="text-center space-y-8">
          {/* Category Section Header */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-teal/60" />
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-teal-light tracking-[0.25em] uppercase">
              INSTITUTIONAL SUPPORT
            </h3>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-teal/60" />
          </div>

          {/* 6 Institutional Logos Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 items-center justify-center">
            {institutionalLogos.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => sounds.playHover()}
                className="group relative rounded-[20px] bg-white p-4 h-28 sm:h-32 flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.4)] border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-glow-teal cursor-pointer"
              >
                <img
                  src={item.logo}
                  alt={item.alt}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. IN COLLABORATION WITH */}
        <div className="text-center space-y-6">
          {/* Category Section Header */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-teal/60" />
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-teal-light tracking-[0.25em] uppercase">
              IN COLLABORATION WITH
            </h3>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-teal/60" />
          </div>

          {/* Collaboration Card (StartupTN) */}
          <div className="flex justify-center">
            <div
              onMouseEnter={() => sounds.playHover()}
              className="group relative rounded-[28px] bg-white p-6 sm:p-8 w-full max-w-lg shadow-[0_10px_35px_rgba(0,0,0,0.5)] border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-teal cursor-pointer flex items-center justify-center min-h-[140px]"
            >
              <img
                src="/institutions/startuptn.png"
                alt="StartupTN Logo"
                className="max-h-24 sm:max-h-28 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
