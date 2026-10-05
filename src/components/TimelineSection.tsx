import React, { useState } from 'react';
import {
  Clock,
  Compass,
  Zap,
  Users,
  Moon,
  Flame,
  Award,
  FileText,
} from 'lucide-react';
import { sounds } from '../utils/sound';

export const TimelineSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'all' | 'oct24' | 'oct25' | 'oct26'>('all');

  const scheduleOct24 = [
    {
      time: '08:30 AM',
      title: 'Squad Check-in & Registration',
      phase: 'DAY 1 • ARENA ARRIVAL',
      description:
        'Arrival at the event arena, credential verification, hacker kit issuance, and Wi-Fi calibration.',
      icon: Clock,
      highlight: false,
    },
    {
      time: '10:00 AM',
      title: 'Opening Ceremony & Briefing',
      phase: 'DAY 1 • LAUNCH',
      description:
        'Keynote briefing, problem statement telemetry release, and event rules ratification.',
      icon: Compass,
      highlight: false,
    },
    {
      time: '11:00 AM',
      title: '36-Hour Hackathon Timer Ignition',
      phase: 'DAY 1 • 36H KICKOFF',
      description:
        'Official 36-hour timer starts! Squads begin repository initialization, architectural setup, and core hacking.',
      icon: Zap,
      highlight: true,
    },
    {
      time: '10:00 PM',
      title: 'Night Build & Energy Surge',
      phase: 'DAY 1 • NIGHT HACK',
      description:
        'Red Bull energy drops, snacks, and uninterrupted nocturnal sprint hacking.',
      icon: Moon,
      highlight: false,
    },
  ];

  const scheduleOct25 = [
    {
      time: '09:00 AM',
      title: 'Day 2 Sprint & Mentorship Review',
      phase: 'DAY 2 • MID-FLIGHT',
      description:
        'Dawn energy breakfast, feature integration, backend hardening, and 1-on-1 mentor guidance.',
      icon: Flame,
      highlight: false,
    },
    {
      time: '03:00 PM',
      title: 'Progress Review & Technical Stress Test',
      phase: 'DAY 2 • ARCHITECTURE CHECK',
      description:
        'Technical checkpoints to stress-test system stability, API endpoints, and model performance.',
      icon: Users,
      highlight: false,
    },
    {
      time: '11:00 PM',
      title: 'Overnight Build & Final Polish',
      phase: 'DAY 2 • FINAL NIGHT',
      description:
        'Final UI polishing, video pitch recording, and preparing the abstract submission document.',
      icon: Moon,
      highlight: false,
    },
  ];

  const scheduleOct26 = [
    {
      time: '11:00 AM',
      title: 'Final Project Submission & Stage Prep',
      phase: 'DAY 3 • STAGE PREP',
      description:
        'Final submission check, project links freeze, and stage presentation preparation before the timer finish.',
      icon: FileText,
      highlight: true,
    },
    {
      time: '11:30 AM',
      title: '36-Hour Timer Finish & Code Freeze',
      phase: 'DAY 3 • CODE FREEZE',
      description:
        'Official 36-hour hacking timer ends. Code freeze on GitHub repositories and live demo deployments.',
      icon: Clock,
      highlight: true,
    },
    {
      time: '01:30 PM',
      title: 'Jury Pitching & Functional Demos',
      phase: 'DAY 3 • GRAND FINALE',
      description:
        'Shortlisted squads present a 5-minute live demonstration + 3-minute technical jury Q&A on stage.',
      icon: Compass,
      highlight: true,
    },
    {
      time: '04:30 PM',
      title: 'Winner Announcement & Awards',
      phase: 'DAY 3 • PODIUM',
      description:
        'Awarding the ₹1,00,000 Grand Prize Pool, physical trophies, accredited certificates, and closing ceremony.',
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
              EVENT SCHEDULE & CHRONOLOGY
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-6">
            OCTOBER 24, 25, 26 • <span className="text-holo">3 DAYS EVENT</span>
          </h2>

          <p className="text-base sm:text-lg text-white leading-relaxed font-sans">
            Registration officially opens on <span className="text-gold font-semibold">October 5</span>. Abstract submission window runs until <span className="text-teal font-semibold">October 16</span>, leading into the 3-day on-site hackathon on <span className="text-white font-semibold">October 24–26</span>.
          </p>

          {/* Day Filter Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-navy-surface border border-teal/30 mt-8 gap-1.5 flex-wrap justify-center">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveDay('all');
              }}
              className={`px-4 py-2 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
                activeDay === 'all'
                  ? 'bg-gold text-navy shadow-glow-gold'
                  : 'text-lightgray hover:text-white'
              }`}
            >
              ALL 3 DAYS (OCT 24–26)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveDay('oct24');
              }}
              className={`px-4 py-2 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
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
              className={`px-4 py-2 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
                activeDay === 'oct25'
                  ? 'bg-gold text-navy shadow-glow-gold'
                  : 'text-lightgray hover:text-white'
              }`}
            >
              OCTOBER 25 (DAY 2)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveDay('oct26');
              }}
              className={`px-4 py-2 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
                activeDay === 'oct26'
                  ? 'bg-gold text-navy shadow-glow-gold'
                  : 'text-lightgray hover:text-white'
              }`}
            >
              OCTOBER 26 (DAY 3 & GRAND FINALE)
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-teal via-gold to-teal shadow-glow-teal opacity-75 rounded-full" />

          {/* DAY 1: OCTOBER 24 SECTION */}
          {(activeDay === 'all' || activeDay === 'oct24') && (
            <div className="mb-16">
              <div className="relative z-20 w-full flex items-center justify-center mb-10">
                <div className="px-6 py-2.5 rounded-full bg-navy-surface border border-teal/40 text-teal-light font-heading font-extrabold text-sm tracking-[0.25em] uppercase shadow-glow-teal flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                  <span>OCTOBER 24 • DAY 1 KICKOFF</span>
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
                      <div className={`w-full md:w-1/2 p-2 sm:p-4 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
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

                      <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 my-4 md:my-0 flex items-center justify-center">
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

          {/* DAY 2: OCTOBER 25 SECTION */}
          {(activeDay === 'all' || activeDay === 'oct25') && (
            <div className="mb-16">
              <div className="relative z-20 w-full flex items-center justify-center mb-10">
                <div className="px-6 py-2.5 rounded-full bg-navy-surface border border-gold/40 text-gold font-heading font-extrabold text-sm tracking-[0.25em] uppercase shadow-glow-gold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span>OCTOBER 25 • DAY 2 HACKING & MENTORSHIP</span>
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
                      <div className={`w-full md:w-1/2 p-2 sm:p-4 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
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

                      <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 my-4 md:my-0 flex items-center justify-center">
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

          {/* DAY 3: OCTOBER 26 SECTION */}
          {(activeDay === 'all' || activeDay === 'oct26') && (
            <div>
              <div className="relative z-20 w-full flex items-center justify-center mb-10">
                <div className="px-6 py-2.5 rounded-full bg-navy-surface border border-teal/40 text-teal-light font-heading font-extrabold text-sm tracking-[0.25em] uppercase shadow-glow-teal flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                  <span>OCTOBER 26 • DAY 3 GRAND FINALE & PODIUM</span>
                </div>
              </div>

              <div className="space-y-8">
                {scheduleOct26.map((item, idx) => {
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
                      <div className={`w-full md:w-1/2 p-2 sm:p-4 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
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

                      <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 my-4 md:my-0 flex items-center justify-center">
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

          {/* END CARD */}
          <div className="relative z-20 w-full flex items-center justify-center mt-16 mb-4">
            <div className="px-6 py-2.5 rounded-full bg-navy-surface border border-gold/60 text-gold font-heading font-extrabold text-sm tracking-[0.25em] uppercase shadow-glow-gold flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold" />
              <span>EVENT CONCLUDES</span>
              <div className="w-2 h-2 rounded-full bg-gold" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
