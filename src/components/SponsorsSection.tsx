import React from 'react';
import { Sparkles, Terminal, Cloud, Shield, Database, Cpu, Atom, BookOpen, Users, Radio, Landmark } from 'lucide-react';
import { sounds } from '../utils/sound';

export const SponsorsSection: React.FC = () => {
  const tiers = [
    {
      category: 'GOVERNMENT & STATE INNOVATION PARTNERS',
      sponsors: [
        { name: 'STARTUPTN', subtitle: 'Government of Tamil Nadu', icon: Landmark },
      ],
    },
    {
      category: 'TECHNOLOGY PARTNERS',
      sponsors: [
        { name: 'NEXUS CLOUD', subtitle: 'Quantum Cloud Infrastructure', icon: Cloud },
        { name: 'TENSOR SYNAPSE', subtitle: 'Autonomous AI Accelerators', icon: Cpu },
        { name: 'HYPER LEDGER X', subtitle: 'Zero Knowledge Protocols', icon: Shield },
        { name: 'AETHER DATA', subtitle: 'Real-Time Vector Engine', icon: Database },
      ],
    },
    {
      category: 'KNOWLEDGE & RESEARCH PARTNERS',
      sponsors: [
        { name: 'DEEP TECH LABS', subtitle: 'Frontier Scientific Institute', icon: Atom },
        { name: 'GLOBAL ACM CHAPTER', subtitle: 'Computing Machinery Council', icon: BookOpen },
        { name: 'IEEE INNOVATION HUB', subtitle: 'Standards & Robotics Society', icon: Terminal },
      ],
    },
    {
      category: 'COMMUNITY & MEDIA PARTNERS',
      sponsors: [
        { name: 'DEV UNIVERSE', subtitle: 'Global Hacker Collective', icon: Users },
        { name: 'TECH HORIZON WIRE', subtitle: 'Space-Tech & AI Broadcast', icon: Radio },
      ],
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-surface border border-teal/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal uppercase">
              ECOSYSTEM ALLIANCES
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight mb-4">
            POWERED <span className="text-holo">BY</span>
          </h2>

          <p className="text-sm sm:text-base text-white leading-relaxed font-sans">
            Backed by elite global technology corporations, scientific research institutions, and venture capital incubators.
          </p>
        </div>

        {/* Sponsor Tiers Grid */}
        <div className="space-y-12">
          {tiers.map((tier) => (
            <div key={tier.category}>
              <div className="font-mono text-xs text-teal tracking-[0.25em] uppercase font-bold text-center mb-6">
                — {tier.category} —
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {tier.sponsors.map((sponsor) => {
                  const Icon = sponsor.icon;

                  return (
                    <div
                      key={sponsor.name}
                      onMouseEnter={() => sounds.playHover()}
                      className="group relative p-6 rounded-2xl glass-panel border border-teal/15 hover:border-gold/50 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 hover:shadow-glow-teal"
                    >
                      {/* Subtle orbital aura */}
                      <div className="w-12 h-12 rounded-xl bg-navy-darker border border-teal/20 group-hover:border-gold/50 flex items-center justify-center text-slate-muted group-hover:text-gold transition-all duration-300 mb-3 shadow-inner">
                        <Icon className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
                      </div>

                      <div className="font-heading font-extrabold text-xs sm:text-sm text-lightgray/90 group-hover:text-white transition-colors uppercase tracking-wider">
                        {sponsor.name}
                      </div>

                      <div className="font-mono text-[9px] text-slate-subtext group-hover:text-teal-light transition-colors mt-0.5">
                        {sponsor.subtitle}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
