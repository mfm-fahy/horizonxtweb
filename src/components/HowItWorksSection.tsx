import React, { useState } from 'react';
import {
  UserCheck,
  Users,
  Compass,
  Code,
  UploadCloud,
  Mic,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface HowItWorksProps {
  onRegisterClick: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onRegisterClick }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: 'STEP 01',
      title: 'REGISTER',
      subtitle: 'Individual Enlistment',
      description:
        'Complete the single-entry candidate profile with college credentials, technical skills, and GitHub/portfolio handles.',
      icon: UserCheck,
      details: 'Instant verification code issued upon submission. No fee required.',
    },
    {
      step: 'STEP 02',
      title: 'CREATE / JOIN TEAM',
      subtitle: 'Squad Assembly',
      description:
        'Form a squad of 2 to 4 innovators. Generate your custom Team ID and encrypted invite code, or enter an existing invite code.',
      icon: Users,
      details: 'Cross-college teams warmly supported and celebrated.',
    },
    {
      step: 'STEP 03',
      title: 'SELECT CHALLENGE',
      subtitle: 'Mission Alignment',
      description:
        'Commit to one of 6 frontiers: AI/ML, FinTech, Healthcare, Smart Cities, Cybersecurity, or Open Innovation.',
      icon: Compass,
      details: 'Track can be refined until the initial mentor check-in.',
    },
    {
      step: 'STEP 04',
      title: 'BUILD',
      subtitle: '36-Hour Deep Sprint',
      description:
        '36 continuous hours of hacking, prototyping, and engineering supported by round-the-clock technical mentors and cloud compute credits.',
      icon: Code,
      details: 'Meals, energy drinks, gaming lounges, and quiet nap pods provided.',
    },
    {
      step: 'STEP 05',
      title: 'SUBMIT',
      subtitle: 'Artifact Deployment',
      description:
        'Push your code repository, live deployed application link, and 2-minute demonstration video through the Team Dashboard before Oct 25, 11:00 AM.',
      icon: UploadCloud,
      details: 'Dashboard validation checks commit logs and deployment uptime.',
    },
    {
      step: 'STEP 06',
      title: 'PITCH',
      subtitle: 'Jury Telemetry',
      description:
        'Showcase your functional prototype to a distinguished panel of venture capitalists, tech founders, and senior researchers.',
      icon: Mic,
      details: '5-minute live demonstration + 3-minute technical Q&A.',
    },
    {
      step: 'STEP 07',
      title: 'WIN',
      subtitle: 'Ascension & Impact',
      description:
        'Celebrate victory with over ₹2,50,000 in grand cash bounties, incubator admission, cloud grants, and prestigious physical trophies.',
      icon: Trophy,
      details: 'Top 3 teams receive fast-track summer research/engineering internships.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4 border border-teal/40">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal-light uppercase">
              ORBITAL TRAJECTORY & FLIGHT PLAN
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-6">
            HOW IT <span className="text-holo">WORKS</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-muted leading-relaxed font-sans">
            From initial squad assembly to the grand valedictory pitch—navigate the 7 orbital coordinates of your HorizonX space expedition.
          </p>
        </div>

        {/* Interactive Step Navigator Pills */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-12 gap-2 sm:gap-3 no-scrollbar">
          {steps.map((item, idx) => (
            <button
              key={item.step}
              onClick={() => {
                sounds.playClick();
                setActiveStep(idx);
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`shrink-0 px-4 py-2 rounded-xl font-heading text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                activeStep === idx
                  ? 'bg-gold text-navy border-gold shadow-glow-gold scale-105'
                  : 'bg-navy-surface/80 text-lightgray/80 border-teal/20 hover:border-teal hover:text-white'
              }`}
            >
              <span>{item.step}</span>
              <span className="hidden sm:inline opacity-75 font-mono text-[10px]">• {item.title}</span>
            </button>
          ))}
        </div>

        {/* Focused Orbital Display Card */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel-elevated p-8 sm:p-12 border border-teal/30 relative overflow-hidden shadow-glow-card">
          <div className="absolute top-0 right-0 w-48 h-48 bg-royal/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Step Icon & Holographic Orbit */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Orbit Rings */}
                <div className="absolute inset-0 rounded-full border border-teal/30 animate-spin-slow" />
                <div className="absolute -inset-3 rounded-full border border-dashed border-gold/30 animate-spin-reverse" />

                <div className="w-24 h-24 rounded-3xl bg-navy-surface border border-gold/50 flex items-center justify-center text-gold shadow-glow-gold">
                  {React.createElement(steps[activeStep].icon, { className: 'w-12 h-12' })}
                </div>
              </div>

              <div className="mt-4 font-mono text-xs font-bold text-teal tracking-widest uppercase">
                COORDINATE 0{activeStep + 1} OF 07
              </div>
            </div>

            {/* Step Content */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-teal/15 text-teal border border-teal/30">
                    {steps[activeStep].step}
                  </span>
                  <span className="font-heading text-xs font-semibold text-gold tracking-widest uppercase">
                    {steps[activeStep].subtitle}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-wide uppercase mb-4">
                  {steps[activeStep].title}
                </h3>

                <p className="text-base text-lightgray/90 leading-relaxed mb-6 font-sans">
                  {steps[activeStep].description}
                </p>

                <div className="p-4 rounded-xl bg-navy-darker/80 border border-teal/20 text-xs font-mono text-teal-light flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  <span>{steps[activeStep].details}</span>
                </div>
              </div>

              {/* Navigation controls for steps */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-teal/15">
                <button
                  disabled={activeStep === 0}
                  onClick={() => {
                    sounds.playClick();
                    setActiveStep((prev) => Math.max(prev - 1, 0));
                  }}
                  className={`px-4 py-2 rounded-xl font-heading text-xs font-semibold tracking-wider uppercase border border-teal/20 transition-colors ${
                    activeStep === 0
                      ? 'opacity-30 cursor-not-allowed text-slate-muted'
                      : 'text-lightgray hover:border-teal hover:text-white cursor-pointer'
                  }`}
                >
                  ← PREVIOUS
                </button>

                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
                    }}
                    className="px-6 py-2.5 rounded-xl font-heading text-xs font-bold tracking-wider uppercase bg-royal hover:bg-royal-light text-white border border-teal/40 transition-colors flex items-center gap-2 cursor-pointer shadow-glow-royal"
                  >
                    <span>NEXT COORDINATE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onRegisterClick();
                    }}
                    className="px-6 py-2.5 rounded-xl font-heading text-xs font-bold tracking-wider uppercase bg-gold hover:bg-gold-light text-navy shadow-glow-gold transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>BEGIN REGISTRATION NOW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
