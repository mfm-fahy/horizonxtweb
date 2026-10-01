import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
  useFullImage?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  animated = false,
  className = '',
  useFullImage = false,
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl',
    hero: 'w-20 h-20 md:w-24 md:h-24 rounded-3xl',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    hero: 'text-4xl md:text-5xl',
  };

  const taglineSizes = {
    sm: 'text-[7.5px] tracking-[0.2em]',
    md: 'text-[9px] tracking-[0.22em]',
    lg: 'text-[11px] tracking-[0.28em]',
    hero: 'text-xs md:text-sm tracking-[0.35em]',
  };

  if (useFullImage) {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <img
          src="/logo-transparent.png"
          alt="HorizonXT Logo"
          className={`h-auto object-contain transition-transform duration-300 ${
            size === 'sm' ? 'max-h-8' : size === 'md' ? 'max-h-12' : size === 'lg' ? 'max-h-16' : 'max-h-24'
          } ${animated ? 'hover:scale-105' : ''}`}
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Official HorizonXT Favicon / Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center p-0.5 border border-teal/40 group-hover:border-gold/60 shadow-[0_0_18px_rgba(0,167,181,0.25)] group-hover:shadow-[0_0_24px_rgba(245,166,35,0.4)] transition-all duration-300 overflow-hidden bg-navy-darker/90`}>
        {/* Ambient backglow */}
        <div
          className={`absolute inset-0 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(245, 166, 35, 0.5) 0%, rgba(0, 167, 181, 0.4) 60%, transparent 100%)',
          }}
        />

        <img
          src="/favicon.png"
          alt="HorizonXT Emblem"
          className={`w-full h-full object-cover relative z-10 rounded-[inherit] transition-transform duration-500 ${
            animated ? 'group-hover:scale-105' : ''
          }`}
        />
      </div>

      {/* Official Wordmark Matching Uploaded Logo */}
      <div className="flex flex-col text-left">
        <div className={`font-heading font-extrabold ${textSizes[size]} tracking-wider flex items-center leading-none text-white`}>
          <span>HORIZON</span>
          <span className="text-gold font-black drop-shadow-[0_0_12px_rgba(245,166,35,0.7)] ml-0.5">XT</span>
          {/* Official 4-point sparkle star */}
          <span className="text-gold text-[0.6em] ml-1 transform -translate-y-1.5 animate-pulse">✦</span>
        </div>

        {showTagline && (
          <div
            className={`font-heading font-bold uppercase text-teal-light/95 ${taglineSizes[size]} mt-1 flex items-center gap-1 leading-none`}
          >
            <span>RESEARCH</span>
            <span className="text-gold">•</span>
            <span>INNOVATION</span>
            <span className="text-gold">•</span>
            <span>IMPACT</span>
          </div>
        )}
      </div>
    </div>
  );
};
