import React, { useState } from 'react';
import {
  Zap,
  Cpu,
  HeartPulse,
  Radio,
  Leaf,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle,
  Layers,
  Search,
  Check,
  Award,
  BookOpen,
  Target,
} from 'lucide-react';
import { sounds } from '../utils/sound';
import {
  problemStatements,
  type ProblemStatement,
} from '../data/problemStatements';

interface ChallengesSectionProps {
  onSelectTrackForRegistration: (psCode: string) => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Mobility & EV': Zap,
  'Industry 4.0': Cpu,
  'AI & Healthcare': HeartPulse,
  'Robotics & Hardware': Radio,
  'CleanTech & Sustainability': Leaf,
};

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  onSelectTrackForRegistration,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tracks');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPs, setSelectedPs] = useState<ProblemStatement | null>(null);

  const categories = [
    'All Tracks',
    'Mobility & EV',
    'Industry 4.0',
    'AI & Healthcare',
    'Robotics & Hardware',
    'CleanTech & Sustainability',
  ];

  const filteredStatements = problemStatements.filter((ps) => {
    const matchesCategory =
      selectedCategory === 'All Tracks' || ps.category === selectedCategory;
    const matchesSearch =
      ps.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (ps: ProblemStatement) => {
    sounds.playClick();
    setSelectedPs(ps);
  };

  const handleCloseModal = () => {
    setSelectedPs(null);
  };

  return (
    <section id="challenges" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-left sm:text-center max-w-4xl mx-auto mb-16 relative group">
          {/* Massive soft glowing dark aura behind the text to separate it from the 3D planet without looking like a card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[180%] bg-[radial-gradient(ellipse_at_center,_rgba(10,29,59,0.95)_0%,_rgba(10,29,59,0.7)_45%,_transparent_75%)] blur-xl pointer-events-none -z-10" />
          
          <div className="relative z-10 px-2 sm:px-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-darker/80 mb-4 border border-teal/40 shadow-glow-teal">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal-light uppercase">
                OFFICIAL PROBLEM STATEMENTS (PS1 - PS22)
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-tight mb-4 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] cursor-default">
              CHOOSE YOUR <span className="text-holo">CHALLENGE</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/75 font-normal leading-relaxed font-sans max-w-3xl mx-auto text-left sm:text-center transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(165,243,252,0.8)] cursor-default">
              Explore our 22+ official research problem statements spanning Electric Vehicles, Industry 4.0, Autonomous Logistics, Healthcare AI, and Sustainability. Select a challenge to view detailed 36-hour specifications and register your team!
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 glass-panel-elevated p-4 rounded-2xl border border-teal/30">
          {/* Domain Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gold text-navy shadow-glow-gold'
                      : 'bg-navy-surface/80 text-lightgray/80 hover:text-white border border-teal/20 hover:border-teal/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-teal-light absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search PS code or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-navy-darker border border-teal/30 focus:border-gold focus:outline-none text-white text-xs font-mono placeholder-slate-muted"
            />
          </div>
        </div>

        {/* Problem Statement Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStatements.map((ps) => {
            const IconComponent = categoryIcons[ps.category] || Sparkles;

            return (
              <div
                key={ps.id}
                onMouseEnter={() => sounds.playHover()}
                className="group relative rounded-2xl glass-panel-elevated p-6 sm:p-8 flex flex-col justify-between border border-teal/20 hover:border-gold/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-hover overflow-hidden"
              >
                {/* Background holographic shimmer gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-royal/10 via-transparent to-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar with PS Code & Category Badge */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="font-mono text-sm px-3.5 py-1 rounded-xl bg-gold/15 border border-gold/40 text-gold font-bold tracking-wider shadow-glow-gold">
                      {ps.code}
                    </span>
                    <span className="font-mono text-[11px] text-teal-light bg-navy-surface px-3 py-1 rounded-lg border border-teal/30 font-semibold flex items-center gap-1.5">
                      <IconComponent className="w-3.5 h-3.5 text-teal" />
                      <span>{ps.category}</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white uppercase tracking-wide mb-3 group-hover:text-gold-light transition-colors relative z-10 leading-snug">
                    {ps.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-muted font-sans leading-relaxed mb-6 relative z-10 line-clamp-3">
                    {ps.tagline}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-teal/15">
                  {/* Key Metrics Pill */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-teal-light uppercase tracking-wider block mb-1.5">
                      TOP EVALUATION METRICS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ps.evaluationCriteria.slice(0, 3).map((crit) => (
                        <span
                          key={crit.name}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-surface border border-teal/20 text-lightgray/90"
                        >
                          {crit.name} ({crit.weight})
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleOpenModal(ps)}
                    className="w-full py-3 rounded-xl font-heading text-xs font-bold tracking-[0.15em] uppercase bg-navy-surface/90 hover:bg-gold hover:text-navy text-teal-light hover:border-gold border border-teal/40 transition-all duration-250 flex items-center justify-center gap-2 group-hover:shadow-glow-gold cursor-pointer"
                  >
                    <span>VIEW SPECIFICATION</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStatements.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-2xl border border-teal/30">
            <Search className="w-10 h-10 text-teal-light mx-auto mb-3 opacity-60" />
            <p className="text-lg font-heading text-white font-bold uppercase mb-1">
              NO PROBLEM STATEMENTS FOUND
            </p>
            <p className="text-sm text-slate-muted font-sans">
              Try adjusting your category filter or search query.
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal for Selected Problem Statement */}
      {selectedPs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-darker/50 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl glass-panel-elevated border border-gold/50 p-6 sm:p-10 my-auto shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-2 rounded-xl bg-navy-surface border border-teal/30 text-slate-muted hover:text-white hover:border-teal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-base px-4 py-1 rounded-xl bg-gold/20 border border-gold/60 text-gold font-bold tracking-wider shadow-glow-gold">
                {selectedPs.code}
              </span>
              <span className="font-mono text-xs text-teal-light bg-navy-surface px-3 py-1.5 rounded-lg border border-teal/30 font-semibold uppercase">
                {selectedPs.category}
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mb-4 leading-tight">
              {selectedPs.title}
            </h3>

            {/* HorizonXT Philosophy Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal/20 via-navy-surface to-gold/10 border border-gold/40 mb-6">
              <div className="font-heading font-bold text-[11px] text-gold uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>HORIZONXT DESIGN PHILOSOPHY</span>
              </div>
              <p className="text-sm font-sans italic text-white font-medium">
                "{selectedPs.horizonPhilosophy}"
              </p>
            </div>

            {/* Problem & Challenge */}
            <div className="space-y-6 mb-8">
              <div>
                <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>THE PROBLEM</span>
                </div>
                <p className="text-sm sm:text-base text-lightgray/90 leading-relaxed font-sans bg-navy-darker/60 p-4 rounded-xl border border-teal/15">
                  {selectedPs.problem}
                </p>
              </div>

              <div>
                <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>THE CHALLENGE</span>
                </div>
                <p className="text-sm sm:text-base text-lightgray/90 leading-relaxed font-sans bg-navy-darker/60 p-4 rounded-xl border border-teal/15">
                  {selectedPs.challenge}
                </p>
              </div>
            </div>

            {/* 36-Hour Challenge Proof-of-Concept Requirements */}
            <div className="mb-8">
              <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-gold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold" />
                <span>36-HOUR PROOF-OF-CONCEPT REQUIREMENTS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedPs.challenge36h.map((req, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-navy-surface/80 border border-teal/20 text-xs text-lightgray flex items-start gap-2.5"
                  >
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="font-sans leading-snug">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Framework Table */}
            <div className="mb-8">
              <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-teal" />
                <span>EVALUATION FRAMEWORK</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedPs.evaluationCriteria.map((crit) => (
                  <div
                    key={crit.name}
                    className="p-3 rounded-xl bg-navy-darker border border-teal/25 flex flex-col justify-between"
                  >
                    <span className="font-sans text-xs text-lightgray leading-tight mb-1">
                      {crit.name}
                    </span>
                    <span className="font-mono text-sm font-extrabold text-gold">
                      {crit.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Testing Metrics */}
            <div className="mb-8">
              <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>HOW IT WILL BE TESTED & EVALUATED</span>
              </div>
              <div className="space-y-2">
                {selectedPs.keyTesting.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-navy-surface/60 border border-teal/15 text-xs font-mono text-teal-light flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-teal/20">
              <button
                onClick={() => {
                  sounds.playClick();
                  const psCode = selectedPs.code;
                  handleCloseModal();
                  onSelectTrackForRegistration(psCode);
                }}
                className="flex-1 py-4 rounded-xl font-heading text-xs font-bold tracking-[0.2em] uppercase bg-gold hover:bg-gold-light text-navy shadow-glow-gold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>SELECT {selectedPs.code} FOR REGISTRATION</span>
              </button>

              <button
                onClick={handleCloseModal}
                className="px-6 py-4 rounded-xl font-heading text-xs font-semibold tracking-wider uppercase bg-navy-surface border border-teal/30 text-slate-muted hover:text-white"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
