import React, { useState } from 'react';
import {
  Clock,
  Compass,
  Zap,
  Users,
  Moon,
  Flame,
  CheckCircle,
  Award,
  Radio,
} from 'lucide-react';
import { sounds } from '../utils/sound';

export const TimelineSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'all' | 'oct24' | 'oct25'>('all');

  const scheduleOct24 = [
    {
      time: '09:00 AM',
      title: 'Registration & Check-in',
      phase: 'DEPARTURE PREPARATION',
      description:
        'Arrival at the Innovation Nexus Arena, credential verification, hacker kit issuance, squad badge collection, and station Wi-Fi calibration.',
      icon: Clock,
      highlight: false,
    },
    {
      time: '10:00 AM',
      title: 'Opening Ceremony',
      phase: 'MISSION BRIEFING',
      description:
        'Keynote addresses from eminent researchers, problem track release telemetry, sponsor challenges announcement, and event rules ratification.',
      icon: Radio,
      highlight: false,
    },
    {
      time: '11:00 AM',
      title: 'Hacking Begins',
      phase: 'IGNITION',
      description:
        'Official 36-hour timer starts! Squads begin repository initialization, architectural diagramming, API integration, and algorithmic development.',
      icon: Zap,
      highlight: true,
    },
    {
      time: '01:00 PM',
      title: 'Mentor Connect',
      phase: 'ORBITAL ALIGNMENT',
      description:
        '1-on-1 dedicated mentoring checkpoints with industry specialists and research faculty to stress-test system feasibility and scope.',
      icon: Users,
      highlight: false,
    },
    {
      time: '06:00 PM',
      title: 'Progress Check',
      phase: 'FIRST STAGE TELEMETRY',
      description:
        'Intermediate checkpoint evaluation to confirm MVP architecture, database schemas, and baseline technical execution.',
      icon: CheckCircle,
      highlight: false,
    },
    {
      time: '10:00 PM',
      title: 'Night Build',
      phase: 'DEEP SPACE SURGE',
      description:
        'Midnight fuel: Red Bull & pizza drops, midnight acoustic jams, mini tech challenges, and uninterrupted nocturnal sprint hacking.',
      icon: Moon,
      highlight: false,
    },
  ];

  const scheduleOct25 = [
    {
      time: '08:00 AM',
      title: 'Final Sprint',
      phase: 'ATMOSPHERIC RE-ENTRY',
      description:
        'Dawn energy breakfast, final UI polish, backend integration hardening, and recording the 2-minute demonstration video.',
      icon: Flame,
      highlight: false,
    },
    {
      time: '11:00 AM',
      title: 'Submission Deadline',
      phase: 'PAYLOAD DOCKING',
      description:
        'Hard repository lock! Code freeze on GitHub, demo URLs submitted to the HorizonX telemetry grid. Zero grace period.',
      icon: Clock,
      highlight: true,
    },
    {
      time: '01:00 PM',
      title: 'Project Evaluation',
      phase: 'JURY ANALYSIS',
      description:
        'Preliminary scoring across innovation, technical execution, user experience, scalability, and societal impact.',
      icon: CheckCircle,
      highlight: false,
    },
    {
      time: '03:00 PM',
      title: 'Final Pitch',
      phase: 'GRAND FINALE ARENA',
      description:
        'Top 10 shortlisted squads take the central stage for a 5-minute live demonstration and 3-minute jury cross-examination.',
      icon: Compass,
      highlight: true,
    },
    {
      time: '05:00 PM',
      title: 'Winner Announcement',
      phase: 'PODIUM ASCENSION',
      description:
        'Grand prize presentation, category bounty awards, researcher felicitations, internship offers, and the closing ceremony.',
      icon: Award,
      highlight: true,
    },
  ];

  return (
    <section id="timeline" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4 border border-teal/40">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal-light uppercase">
              ORBITAL TRAJECTORY CHRONOLOGY
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-6">
            36 HOURS. <span className="text-holo">ONE ORBITAL FLIGHT.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-muted leading-relaxed font-sans">
            A continuous orbital mission spanning October 24 and 25. Journey along the coordinates of innovation.
          </p>

          {/* Day Filter Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-navy-surface border border-teal/30 mt-8 gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveDay('all');
              }}
              className={`px-5 py-2 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
                activeDay === 'all'
                  ? 'bg-gold text-navy shadow-glow-gold'
                  : 'text-lightgray hover:text-white'
              }`}
            >
              ALL 36 HOURS
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveDay('oct24');
              }}
              className={`px-5 py-2 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
                activeDay === 'oct24'
                  ? 'bg-gold text-navy shadow-glow-gold'
                  : 'text-lightgray hover:text-white'
              }`}
            >
              OCTOBER 24 (DAY 1)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveDay('oct25');
              }}
              className={`px-5 py-2 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
                activeDay === 'oct25'
                  ? 'bg-gold text-navy shadow-glow-gold'
                  : 'text-lightgray hover:text-white'
              }`}
            >
              OCTOBER 25 (DAY 2)
            </button>
          </div>
        </div>

        {/* Spacecraft Trajectory Timeline Container */}
        <div className="relative">
          {/* Central Vertical Glowing Orbital Streamline for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-teal via-gold to-teal shadow-glow-teal opacity-75 rounded-full" />

          {/* OCTOBER 24 SECTION */}
          {(activeDay === 'all' || activeDay === 'oct24') && (
            <div className="mb-16">
              <div className="flex items-center justify-center mb-10">
                <div className="px-6 py-2.5 rounded-full bg-navy-surface border border-teal/40 text-teal-light font-heading font-extrabold text-sm tracking-[0.25em] uppercase shadow-glow-teal flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                  <span>OCTOBER 24 • MISSION DEPLOYMENT</span>
                </div>
              </div>

              <div className="space-y-8">
                {scheduleOct24.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      onMouseEnter={() => sounds.playHover()}
                      className={`relative flex flex-col md:flex-row items-center ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Left or Right Content Card */}
                      <div className="w-full md:w-1/2 p-2 sm:p-4">
                        <div
                          className={`p-6 sm:p-7 rounded-2xl glass-panel-elevated border transition-all duration-300 hover:scale-[1.01] ${
                            item.highlight
                              ? 'border-gold/60 shadow-glow-gold bg-navy-surface/90'
                              : 'border-teal/20 hover:border-teal/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs text-gold font-bold tracking-wider">
                              {item.time}
                            </span>
                            <span className="font-mono text-[10px] text-teal-light uppercase tracking-widest bg-navy-darker px-2 py-0.5 rounded border border-teal/20">
                              {item.phase}
                            </span>
                          </div>

                          <h4 className="font-heading font-extrabold text-xl text-white uppercase tracking-wide mb-2">
                            {item.title}
                          </h4>

                          <p className="text-sm text-slate-muted font-sans leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Center Node Orbit */}
                      <div className="relative z-10 my-4 md:my-0 flex items-center justify-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            item.highlight
                              ? 'bg-gold text-navy shadow-glow-gold scale-110'
                              : 'bg-navy-surface border-2 border-teal text-teal shadow-glow-teal'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Empty counterpart for balance on desktop */}
                      <div className="hidden md:block w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* OCTOBER 25 SECTION */}
          {(activeDay === 'all' || activeDay === 'oct25') && (
            <div>
              <div className="flex items-center justify-center mb-10">
                <div className="px-6 py-2.5 rounded-full bg-navy-surface border border-gold/40 text-gold font-heading font-extrabold text-sm tracking-[0.25em] uppercase shadow-glow-gold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span>OCTOBER 25 • ASCENSION & FINALS</span>
                </div>
              </div>

              <div className="space-y-8">
                {scheduleOct25.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      onMouseEnter={() => sounds.playHover()}
                      className={`relative flex flex-col md:flex-row items-center ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Card */}
                      <div className="w-full md:w-1/2 p-2 sm:p-4">
                        <div
                          className={`p-6 sm:p-7 rounded-2xl glass-panel-elevated border transition-all duration-300 hover:scale-[1.01] ${
                            item.highlight
                              ? 'border-gold/60 shadow-glow-gold bg-navy-surface/90'
                              : 'border-teal/20 hover:border-teal/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs text-gold font-bold tracking-wider">
                              {item.time}
                            </span>
                            <span className="font-mono text-[10px] text-teal-light uppercase tracking-widest bg-navy-darker px-2 py-0.5 rounded border border-teal/20">
                              {item.phase}
                            </span>
                          </div>

                          <h4 className="font-heading font-extrabold text-xl text-white uppercase tracking-wide mb-2">
                            {item.title}
                          </h4>

                          <p className="text-sm text-slate-muted font-sans leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Center Node */}
                      <div className="relative z-10 my-4 md:my-0 flex items-center justify-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            item.highlight
                              ? 'bg-gold text-navy shadow-glow-gold scale-110'
                              : 'bg-navy-surface border-2 border-teal text-teal shadow-glow-teal'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="hidden md:block w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
