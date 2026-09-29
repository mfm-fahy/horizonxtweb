import React from 'react';
import { Sparkles, Brain, Cpu, Rocket, Layout, Maximize2 } from 'lucide-react';
import { sounds } from '../utils/sound';

export const JudgingSection: React.FC = () => {
  const criteria = [
    {
      title: 'INNOVATION',
      percentage: 25,
      icon: Brain,
      color: 'gold',
      description:
        'Originality of concept, novel research application, and departure from conventional boilerplate solutions.',
      rubric: ['Creative problem formulation', 'Unconventional approach', 'Intellectual depth'],
    },
    {
      title: 'TECHNICAL IMPLEMENTATION',
      percentage: 25,
      icon: Cpu,
      color: 'teal',
      description:
        'Architectural complexity, code modularity, functional integrity, API/model integration, and engineering robustness.',
      rubric: ['Code quality & commits', 'Effective use of tech stack', 'Working MVP execution'],
    },
    {
      title: 'IMPACT',
      percentage: 20,
      icon: Rocket,
      color: 'royal',
      description:
        'Potential to generate real-world societal, clinical, commercial, or environmental transformation at scale.',
      rubric: ['Significance of problem', 'Practical viability', 'Measurable benefit'],
    },
    {
      title: 'USER EXPERIENCE',
      percentage: 15,
      icon: Layout,
      color: 'teal',
      description:
        'Intuitive interface ergonomics, visual polish, accessible design, and frictionless user flows.',
      rubric: ['Design aesthetics', 'Accessibility (a11y)', 'Smooth interaction'],
    },
    {
      title: 'SCALABILITY',
      percentage: 15,
      icon: Maximize2,
      color: 'gold',
      description:
        'System resilience under load, deployment readiness, maintainability, and clean distributed infrastructure.',
      rubric: ['Concurrency handling', 'Cloud architecture', 'Future extensibility'],
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4 border border-teal/40">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal-light uppercase">
              ORBITAL EVALUATION MATRIX
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-6">
            JUDGING <span className="text-holo">CRITERIA</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-muted leading-relaxed font-sans">
            Every submission is objectively benchmarked across 5 calibrated scientific dimensions by our distinguished panel of engineers, researchers, and venture capitalists.
          </p>
        </div>

        {/* 5 Holographic Criteria Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {criteria.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                onMouseEnter={() => sounds.playHover()}
                className="p-8 rounded-2xl glass-panel-elevated border border-teal/20 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-navy-surface border border-teal/30 group-hover:border-gold/50 flex items-center justify-center text-teal group-hover:text-gold transition-colors shadow-glow-teal group-hover:shadow-glow-gold">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Percentage Display */}
                    <div className="font-mono text-3xl font-extrabold text-gold glow-text-gold flex items-baseline">
                      <span>{item.percentage}</span>
                      <span className="text-sm font-semibold text-teal ml-0.5">%</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-white uppercase tracking-wider mb-2 group-hover:text-gold-light transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-muted font-sans leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Progress Gauge */}
                  <div className="w-full bg-navy-darker h-2 rounded-full overflow-hidden mb-4 border border-teal/20">
                    <div
                      className="h-full bg-gradient-to-r from-royal via-teal to-gold rounded-full"
                      style={{ width: `${item.percentage * 4}%` }}
                    />
                  </div>

                  {/* Rubric check items */}
                  <div className="space-y-1.5 pt-2 border-t border-teal/15 font-mono text-[11px] text-lightgray/80">
                    {item.rubric.map((r) => (
                      <div key={r} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Cumulative Summary Card (6th slot to balance 3x2 grid) */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-navy-surface via-navy-darker to-royal/20 border border-gold/40 flex flex-col justify-between shadow-glow-gold">
            <div>
              <div className="flex items-center gap-2 text-gold font-heading font-bold text-xs uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>100% MERIT-DRIVEN</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white uppercase mb-3">
                STANDARDIZED TELEMETRY
              </h3>
              <p className="text-xs sm:text-sm text-lightgray/90 leading-relaxed font-sans mb-6">
                All evaluations occur within an isolated scoring sandbox with double-blind preliminary reviews, followed by live defense before the Grand Jury.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy-darker/90 border border-teal/20 text-xs font-mono text-teal-light flex items-center justify-between">
              <span>CUMULATIVE SCORE</span>
              <span className="text-gold font-bold text-lg">100 POINTS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
