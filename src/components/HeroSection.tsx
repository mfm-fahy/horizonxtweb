import { useState, useEffect } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { sounds } from '../utils/sound';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-24T09:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* Deep Space Atmosphere */}
      <div
        className="absolute top-1/4 left-0 w-[24rem] h-[24rem] rounded-full pointer-events-none blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(10, 29, 59, 0.8) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 right-10 w-[26rem] h-[26rem] rounded-full pointer-events-none blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 167, 181, 0.3) 0%, rgba(31, 63, 174, 0.15) 50%, transparent 80%)',
        }}
      />

      {/* Main Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10 my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ZONE 1 (LEFT): Crisp Shortened Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-20 max-w-xl">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy/80 border border-teal/40 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(0,167,181,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-heading font-bold text-[11px] sm:text-xs tracking-[0.24em] text-emerald-400 uppercase">
                REGISTRATION IS NOW OPEN • ABSTRACT DUE OCT 16
              </span>
            </div>

            {/* Main Brand Title */}
            <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-[5.4rem] xl:text-[6.2rem] tracking-[-0.04em] text-white leading-none mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.75)] select-none">
              HORIZON<span className="text-gold font-black">XT</span>
            </h1>

            {/* Statement Hierarchy */}
            <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold leading-[1.18] mb-4 tracking-tight">
              <div className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                REGISTRATION <span className="text-emerald-400">IS NOW OPEN.</span>
              </div>
              <div className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                SUBMIT ABSTRACT BY <span className="text-teal">OCT 16.</span>
              </div>
            </div>

            {/* Concise Supporting Copy */}
            <p className="text-sm sm:text-base text-white leading-relaxed font-sans mb-4 max-w-[500px]">
              Registration is now live! Abstract submission is <span className="text-gold font-bold">100% Free</span>. <span className="text-emerald-400 font-bold">SRM Students: FREE</span> participation. For other colleges, each member pays <span className="text-gold font-bold">₹500 ONLY after abstract shortlisting</span> via official confirmation email. Teams will work on their chosen problem statement during the 36-hour physical hackathon (Oct 24–26).
            </p>


            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={() => {
                  sounds.playClick();
                  onRegisterClick();
                }}
                onMouseEnter={() => sounds.playHover()}
                className="h-[52px] px-8 rounded-[12px] font-heading text-sm font-bold tracking-[0.16em] uppercase bg-gradient-to-r from-gold via-[#ffbe42] to-gold hover:from-[#ffbe42] hover:to-gold text-navy shadow-[0_10px_35px_rgba(245,166,35,0.28)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-3 cursor-pointer"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onExploreClick();
                }}
                onMouseEnter={() => sounds.playHover()}
                className="h-[52px] px-7 rounded-[12px] font-heading text-sm font-semibold tracking-[0.14em] uppercase bg-navy-surface/60 hover:bg-royal/30 text-[#F2F4F7] hover:text-white border border-teal/40 hover:border-teal backdrop-blur-xl shadow-[0_4px_20px_rgba(0,167,181,0.15)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-teal" />
                <span>EXPLORE TRACKS</span>
              </button>
            </div>
          </div>

          {/* ZONE 2: Negative space */}
          <div className="hidden lg:block lg:col-span-1 xl:col-span-1 pointer-events-none" />

          {/* ZONE 3 (RIGHT): Planetary Mission Countdown Pod */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center lg:items-end w-full lg:pt-16 z-20">
            <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-6 rounded-[20px] bg-[rgba(10,29,59,0.65)] backdrop-blur-[14px] border border-teal/30 relative overflow-hidden shadow-[0_12px_40px_rgba(2,6,18,0.7)]">
              <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-teal to-transparent" />

              <div className="flex items-center justify-between border-b border-teal/20 pb-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span className="font-heading font-bold text-[11px] tracking-widest text-teal uppercase">
                    EVENT COUNTDOWN
                  </span>
                </div>
                <span className="font-mono text-[10px] text-teal-light/80 tracking-wider">T-MINUS • OCT 24</span>
              </div>

              {/* Countdown Numbers Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5 text-center mb-4">
                <div className="p-2.5 sm:p-3 rounded-xl bg-navy-darker/80 border border-teal/20 flex flex-col items-center shadow-inner">
                  <span className="font-mono text-xl sm:text-2xl font-black text-gold glow-text-gold">
                    {formatNumber(timeLeft.days)}
                  </span>
                  <span className="font-heading text-[9px] font-semibold text-slate-muted tracking-widest uppercase mt-0.5">
                    DAYS
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-navy-darker/80 border border-teal/20 flex flex-col items-center shadow-inner">
                  <span className="font-mono text-xl sm:text-2xl font-black text-white">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="font-heading text-[9px] font-semibold text-slate-muted tracking-widest uppercase mt-0.5">
                    HOURS
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-navy-darker/80 border border-teal/20 flex flex-col items-center shadow-inner">
                  <span className="font-mono text-xl sm:text-2xl font-black text-white">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="font-heading text-[9px] font-semibold text-slate-muted tracking-widest uppercase mt-0.5">
                    MINS
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-navy-darker/80 border border-teal/20 flex flex-col items-center shadow-inner">
                  <span className="font-mono text-xl sm:text-2xl font-black text-teal-light glow-text-teal">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="font-heading text-[9px] font-semibold text-slate-muted tracking-widest uppercase mt-0.5">
                    SECS
                  </span>
                </div>
              </div>

              {/* Quick Arena Key Metrics */}
              <div className="space-y-2 pt-2.5 border-t border-teal/15 text-[11px] font-mono">
                <div className="flex items-center justify-between text-slate-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    REGISTRATION OPENS
                  </span>
                  <span className="text-gold font-bold">OCTOBER 5, 2026</span>
                </div>
                <div className="flex items-center justify-between text-slate-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    ABSTRACT DEADLINE
                  </span>
                  <span className="text-teal-light font-semibold">OCTOBER 16</span>
                </div>
                <div className="flex items-center justify-between text-slate-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-light" />
                    EVENT DATES
                  </span>
                  <span className="text-white font-semibold">OCTOBER 24, 25, 26 (3 DAYS)</span>
                </div>
                <div className="flex items-center justify-between text-slate-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    TOTAL PRIZE POOL
                  </span>
                  <span className="text-gold font-bold">₹1,00,000 PRIZE POOL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-4">
        <button
          onClick={() => {
            sounds.playClick();
            onExploreClick();
          }}
          className="group flex flex-col items-center text-slate-muted hover:text-teal transition-colors cursor-pointer"
        >
          <span className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase mb-2 group-hover:text-teal">
            ENTER PLANETARY SYSTEM
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-teal/40 flex items-start justify-center p-1 group-hover:border-teal">
            <div className="w-1.5 h-2 bg-gold rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
