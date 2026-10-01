import React from 'react';
import { Trophy, Sparkles, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/sound';

export const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface border border-gold/40 mb-4 shadow-glow-gold">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
            <span className="font-heading font-bold text-xs tracking-[0.25em] text-gold uppercase">
              GRAND PRIZE POOL
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-4">
            ₹1,00,000 <span className="text-gold glow-text-gold">PRIZE POOL</span>
          </h2>

          <p className="text-base sm:text-lg text-white leading-relaxed font-sans">
            A grand prize pool of ₹1,00,000 awaits top performing teams at HorizonXT.
          </p>
        </div>

        {/* Central 1 Lakh Prize Showcase Banner */}
        <div className="max-w-4xl mx-auto">
          <div
            onMouseEnter={() => sounds.playHover()}
            className="p-8 sm:p-12 rounded-3xl glass-panel-gold border-2 border-gold flex flex-col items-center text-center relative shadow-[0_0_60px_rgba(245,166,35,0.3)] hover:scale-[1.01] transition-all duration-300"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gold text-navy font-heading font-black text-xs tracking-widest uppercase mb-6 shadow-glow-gold">
              <Trophy className="w-4 h-4" />
              <span>TOTAL PRIZE REWARDS</span>
            </div>

            <div className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl text-gold glow-text-gold mb-6 tracking-tight">
              ₹1,00,000
            </div>

            <p className="font-heading font-bold text-lg sm:text-xl text-white max-w-xl mb-8 uppercase tracking-wide">
              1 LAKH PRIZE POOL FOR INNOVATION & EXCELLENCE
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl pt-6 border-t border-gold/25 font-mono text-xs text-lightgray">
              <div className="p-4 rounded-xl bg-navy-darker/80 border border-gold/30 flex flex-col items-center">
                <CheckCircle className="w-5 h-5 text-gold mb-2" />
                <span className="font-bold text-white uppercase">CASH PRIZES</span>
                <span className="text-slate-muted text-[11px] mt-1">₹1 Lakh Grand Pool</span>
              </div>

              <div className="p-4 rounded-xl bg-navy-darker/80 border border-gold/30 flex flex-col items-center">
                <CheckCircle className="w-5 h-5 text-teal mb-2" />
                <span className="font-bold text-white uppercase">TROPHIES & BADGES</span>
                <span className="text-slate-muted text-[11px] mt-1">HorizonXT Awards</span>
              </div>

              <div className="p-4 rounded-xl bg-navy-darker/80 border border-gold/30 flex flex-col items-center">
                <CheckCircle className="w-5 h-5 text-teal mb-2" />
                <span className="font-bold text-white uppercase">CERTIFICATES</span>
                <span className="text-slate-muted text-[11px] mt-1">Accredited Recognition</span>
              </div>
            </div>
          </div>
        </div>

        {/* All Participants Perks Banner */}
        <div className="mt-12 max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-navy-darker/80 border border-teal/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-base sm:text-lg text-white uppercase">
              UNIVERSAL PARTICIPANT PERKS
            </h4>
            <p className="text-xs sm:text-sm text-slate-muted font-sans">
              Every verified participant receives accredited certificates, free food & beverages, and hacker swag kits during the 3-day event.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-gold shrink-0 border border-gold/30 bg-gold/10 px-4 py-2 rounded-xl">
            100% FREE PARTICIPATION
          </span>
        </div>
      </div>
    </section>
  );
};
