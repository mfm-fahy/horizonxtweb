import React from 'react';
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  Zap,
  Globe,
  Palette,
  Lightbulb,
  CheckCircle,
} from 'lucide-react';
import { sounds } from '../utils/sound';

export const PrizesSection: React.FC = () => {
  const specialAwards = [
    {
      title: 'BEST AI SOLUTION',
      prize: '₹10,000',
      icon: Zap,
      description: 'Awarded to the squad demonstrating the most sophisticated machine learning or autonomous agent architecture.',
    },
    {
      title: 'BEST SOCIAL IMPACT',
      prize: '₹10,000',
      icon: Globe,
      description: 'Recognizing breakthroughs providing real-world solutions for underrepresented or vulnerable populations.',
    },
    {
      title: 'BEST UI / UX DESIGN',
      prize: '₹10,000',
      icon: Palette,
      description: 'Honoring exceptional interface aesthetics, frictionless user journeys, and accessibility craftsmanship.',
    },
    {
      title: 'MOST INNOVATIVE IDEA',
      prize: '₹10,000',
      icon: Lightbulb,
      description: 'Celebrating high-risk, unconstrained originality and novel problem formulation.',
    },
  ];

  return (
    <section id="prizes" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-surface border border-teal/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal uppercase">
              REWARDS & BOUNTIES
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-6">
            ASCEND TO THE <span className="text-gold">PODIUM</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-muted leading-relaxed font-sans">
            Over ₹2,50,000 in grand cash bounties, institutional venture incubation, cloud grants, and physical HorizonX trophies.
          </p>
        </div>

        {/* Top 3 Podium Cards Showcase (Grand Prize Centered & Elevated) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          {/* 1st Runner-Up (Left, 4 Cols) */}
          <div
            onMouseEnter={() => sounds.playHover()}
            className="lg:col-span-4 order-2 lg:order-1 p-8 rounded-3xl glass-panel-elevated border border-teal/30 flex flex-col justify-between text-center relative group hover:border-teal transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-navy-surface border border-teal/40 flex items-center justify-center text-teal-light shadow-glow-teal">
                <Medal className="w-8 h-8" />
              </div>

              <span className="font-mono text-xs font-bold text-teal tracking-widest uppercase block mb-1">
                🥈 1ST RUNNER-UP
              </span>

              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-4">
                ₹50,000
              </h3>

              <div className="space-y-2 text-xs font-mono text-slate-muted mb-6">
                <p>+ ₹1,00,000 Cloud Compute Credits</p>
                <p>+ Silver HorizonX Orbit Trophy</p>
                <p>+ Direct Internship Interview Pipeline</p>
              </div>
            </div>

            <div className="pt-4 border-t border-teal/15 font-mono text-[10px] text-teal-light">
              TIER 02 PODIUM FINISH
            </div>
          </div>

          {/* Grand Prize (Center, Elevated, 4 Cols) */}
          <div
            onMouseEnter={() => sounds.playHover()}
            className="lg:col-span-4 order-1 lg:order-2 p-8 sm:p-10 rounded-3xl glass-panel-gold border-2 border-gold flex flex-col justify-between text-center relative group hover:scale-[1.03] transition-all duration-300 shadow-[0_0_50px_rgba(245,166,35,0.35)] -mt-4 lg:-mt-8"
          >
            {/* Top Golden Crown Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-navy font-heading font-black text-xs tracking-widest uppercase shadow-glow-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHAMPION APEX</span>
            </div>

            <div>
              {/* Floating Holographic Trophy Icon */}
              <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-gold/40 animate-spin-slow" />
                <div className="w-20 h-20 rounded-3xl bg-navy-darker border-2 border-gold flex items-center justify-center text-gold shadow-glow-gold">
                  <Trophy className="w-10 h-10 animate-bounce" />
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-gold tracking-widest uppercase block mb-1">
                🏆 GRAND PRIZE
              </span>

              <h3 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-gold glow-text-gold mb-4">
                ₹1,00,000
              </h3>

              <div className="space-y-2.5 text-xs font-mono text-lightgray mb-8">
                <div className="flex items-center justify-center gap-1.5 text-gold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-bold">+ ₹2,00,000 Venture Incubation Grant</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-teal" />
                  <span>+ Exclusive HorizonX Pure Gold Trophy</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-teal" />
                  <span>+ Fast-Track VC Investor Pitch Session</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-teal" />
                  <span>+ Unlimited Cloud AI Compute Grants</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/25 font-mono text-xs text-gold font-bold uppercase tracking-widest">
              ULTIMATE HORIZONX CHAMPIONS
            </div>
          </div>

          {/* 2nd Runner-Up (Right, 4 Cols) */}
          <div
            onMouseEnter={() => sounds.playHover()}
            className="lg:col-span-4 order-3 p-8 rounded-3xl glass-panel-elevated border border-teal/30 flex flex-col justify-between text-center relative group hover:border-teal transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-navy-surface border border-teal/40 flex items-center justify-center text-teal-light shadow-glow-teal">
                <Award className="w-8 h-8" />
              </div>

              <span className="font-mono text-xs font-bold text-teal tracking-widest uppercase block mb-1">
                🥉 2ND RUNNER-UP
              </span>

              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-4">
                ₹25,000
              </h3>

              <div className="space-y-2 text-xs font-mono text-slate-muted mb-6">
                <p>+ ₹50,000 Cloud Compute Credits</p>
                <p>+ Bronze HorizonX Orbit Trophy</p>
                <p>+ Research Paper Mentorship Support</p>
              </div>
            </div>

            <div className="pt-4 border-t border-teal/15 font-mono text-[10px] text-teal-light">
              TIER 03 PODIUM FINISH
            </div>
          </div>
        </div>

        {/* Special Category Awards Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wider">
              SPECIAL FRONTIER AWARDS
            </h3>
            <p className="text-xs sm:text-sm text-slate-muted font-sans mt-1">
              Rewarding excellence in specialized domains across all submitted projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialAwards.map((award) => {
              const Icon = award.icon;

              return (
                <div
                  key={award.title}
                  onMouseEnter={() => sounds.playHover()}
                  className="p-6 rounded-2xl bg-navy-surface/80 border border-teal/20 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-navy-darker border border-teal/30 text-teal group-hover:text-gold transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-base font-extrabold text-gold">
                        {award.prize}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-white uppercase mb-2 group-hover:text-gold-light transition-colors">
                      {award.title}
                    </h4>

                    <p className="text-xs text-slate-muted font-sans leading-relaxed">
                      {award.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-teal/10 font-mono text-[10px] text-teal-light">
                    + TROPHY & CERTIFICATE
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Participants Perks Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-navy-darker/80 border border-teal/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-base sm:text-lg text-white uppercase">
              UNIVERSAL CADET PERKS
            </h4>
            <p className="text-xs sm:text-sm text-slate-muted font-sans">
              Every verified participant receives a curated hacker swag box, verified blockchain certificate, free food & beverages, and cloud computing sandbox credits.
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
