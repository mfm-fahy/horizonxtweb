import React, { useState, useEffect } from 'react';
import { Clock, Calendar, ShieldCheck, Infinity as InfinityIcon, Activity, Compass, Cpu } from 'lucide-react';

export const EventHighlights: React.FC = () => {
  const [counts, setCounts] = useState({ hours: 0, days: 0, arena: 0 });

  useEffect(() => {
    const duration = 1200; // ms
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        hours: Math.min(Math.floor(36 * progress), 36),
        days: Math.min(Math.floor(25 * progress), 25),
        arena: Math.min(Math.floor(1 * progress), 1),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      value: `${counts.hours}`,
      suffix: 'HOURS',
      label: 'OF BUILDING',
      subtext: 'Continuous flow of coding & creation',
      icon: Clock,
      color: 'gold',
    },
    {
      value: '24–25',
      suffix: 'OCT',
      label: 'OCTOBER 2026',
      subtext: 'Global offline & hybrid arena',
      icon: Calendar,
      color: 'teal',
    },
    {
      value: `${counts.arena}`,
      suffix: 'ARENA',
      label: 'INNOVATION ARENA',
      subtext: 'State-of-the-art research facility',
      icon: ShieldCheck,
      color: 'royal',
    },
    {
      value: '∞',
      suffix: '',
      label: 'POSSIBILITIES',
      subtext: 'Unbounded fluid problem solving',
      icon: InfinityIcon,
      color: 'gold',
    },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Holographic Liquid Field Dashboard Frame */}
        <div className="rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-teal/30 relative overflow-hidden shadow-2xl">
          {/* Top Status Bar of the Liquid Dashboard */}
          <div className="flex flex-wrap items-center justify-between border-b border-teal/20 pb-4 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
              <span className="font-heading font-bold text-xs tracking-[0.25em] text-teal uppercase">
                PLANETARY ARENA TELEMETRY & FLIGHT METRICS
              </span>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] text-slate-muted">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal animate-pulse" />
                <span className="text-lightgray">ORBITAL TRAJECTORY: LOCKED</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold" />
                <span className="text-lightgray">ASTEROID SENSORS: NOMINAL</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-royal-light" />
                <span className="text-lightgray">DEEP SPACE COMPUTE: ONLINE</span>
              </div>
            </div>
          </div>

          {/* Liquid Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group relative p-6 sm:p-7 rounded-2xl bg-navy-darker/80 border border-teal/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-card flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top liquid indicator bar */}
                  <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-teal to-gold group-hover:w-16 transition-all mb-4" />

                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-4xl sm:text-5xl font-extrabold text-white group-hover:text-gold transition-colors flex items-baseline gap-1">
                      <span>{stat.value}</span>
                      {stat.suffix && (
                        <span className="text-sm font-semibold text-teal-light font-heading tracking-wider">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="p-2.5 rounded-xl bg-navy-surface border border-teal/25 text-teal group-hover:text-gold group-hover:border-gold/40 transition-colors shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <div className="font-heading font-bold text-sm tracking-wider uppercase text-lightgray mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-muted font-sans leading-normal">
                      {stat.subtext}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
