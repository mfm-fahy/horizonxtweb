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
      title: 'REGISTER & SQUAD ASSEMBLY',
      subtitle: 'Opens Oct 5 • Up to 5 Members',
      description:
        'Registration officially opens on October 5. Form your squad of up to 5 members. Provide college credentials and mandatory LinkedIn Profile links for every team member.',
      icon: UserCheck,
      details: 'Registration opens Oct 5. Maximum 5 members per team with LinkedIn profiles.',
    },
    {
      step: 'STEP 02',
      title: 'CHOOSE PROBLEM STATEMENT',
      subtitle: 'Mission Alignment',
      description:
        'Select a problem statement aligned with AI/ML, FinTech, Healthcare, Smart Cities, Cybersecurity, or Open Innovation.',
      icon: Compass,
      details: 'Review detailed track guidelines and suggested problem statements.',
    },
    {
      step: 'STEP 03',
      title: 'SUBMIT ABSTRACT (.DOCX)',
      subtitle: 'Oct 5 – Oct 16 Window',
      description:
        'Prepare your project abstract in .docx format only, upload it to Google Drive with view access, and submit the link between Oct 5 and Oct 16.',
      icon: UploadCloud,
      details: 'Window: Oct 5 to Oct 16. Abstract must be in .docx format.',
    },
    {
      step: 'STEP 04',
      title: 'SHORTLISTING & INVITATION',
      subtitle: 'Jury Telemetry Review',
      description:
        'Our technical evaluation panel reviews all submitted abstracts. Shortlisted teams receive an official invitation call to the physical 3-day event.',
      icon: Users,
      details: 'Shortlisted teams are called to participate in the on-site hackathon.',
    },
    {
      step: 'STEP 05',
      title: '36-HOUR HACKATHON EVENT',
      subtitle: '3-Day On-Site Event (Oct 24, 25, 26)',
      description:
        'Shortlisted squads assemble at the physical venue for 36 continuous hours of building across 3 days (Oct 24, 25, 26).',
      icon: Code,
      details: '3-day event: October 24, 25, 26. Food & rest pods provided.',
    },
    {
      step: 'STEP 06',
      title: 'PROTOTYPE DEMO & PITCH',
      subtitle: 'Grand Jury Presentation',
      description:
        'Demonstrate your functional prototype live on stage before venture capitalists, tech leaders, and senior researchers.',
      icon: Mic,
      details: '5-minute live demonstration + 3-minute technical Q&A.',
    },
    {
      step: 'STEP 07',
      title: 'WIN & PODIUM ASCENSION',
      subtitle: 'Impact & Rewards',
      description:
        'Celebrate victory with the ₹1,00,000 Grand Prize Pool, physical trophies, and accredited certificates.',
      icon: Trophy,
      details: 'Top performing teams awarded from the 1 Lakh Prize Pool.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-left sm:text-center max-w-4xl mx-auto mb-16 sm:mb-24 relative group">
          {/* Massive soft glowing dark aura behind the text to separate it from the 3D planet without looking like a card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[180%] bg-[radial-gradient(ellipse_at_center,_rgba(10,29,59,0.95)_0%,_rgba(10,29,59,0.7)_45%,_transparent_75%)] blur-xl pointer-events-none -z-10" />
          
          <div className="relative z-10 px-2 sm:px-0">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-navy-darker/80 mb-6 border border-teal/40 shadow-glow-teal">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-teal animate-pulse" />
              <span className="font-heading font-semibold text-[10px] sm:text-xs tracking-[0.25em] text-teal-light uppercase">
                ORBITAL TRAJECTORY & FLIGHT PLAN
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-4 sm:mb-6 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] cursor-default">
              HOW IT <span className="text-holo">WORKS</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/75 font-normal leading-relaxed font-sans max-w-3xl mx-auto text-left sm:text-center transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(165,243,252,0.8)] cursor-default">
              From initial squad assembly to the grand valedictory pitch—navigate the 7 orbital coordinates of your HorizonXT space expedition.
            </p>
          </div>
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
                  : 'bg-navy-surface/80 text-lightgray border-teal/20 hover:border-teal hover:text-white'
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
