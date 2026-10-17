import { Orbit } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-12 w-full overflow-hidden">
      {/* Background radial cosmic glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 167, 181, 0.25) 0%, rgba(31, 63, 174, 0.15) 40%, rgba(10, 29, 59, 0) 80%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Deep Space Orbit Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-surface border border-gold/40 shadow-glow-gold mb-8">
          <Orbit className="w-4 h-4 text-gold animate-spin-slow" />
          <span className="font-heading font-bold text-xs tracking-[0.25em] text-gold uppercase">
            DEEP SPACE EXPEDITION
          </span>
        </div>

        {/* Large Text */}
        <h2 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[1.08] mb-6">
          YOUR IDEA COULD DEFINE<br />
          <span className="text-holo">THE NEXT HORIZON.</span>
        </h2>

        {/* Subtitle */}
        <p className="font-heading font-bold text-base sm:text-xl md:text-2xl text-teal-light tracking-wide uppercase mb-12 max-w-3xl mx-auto">
          36 HOURS. ONE CHANCE. LIMITLESS POSSIBILITIES.
        </p>

        {/* Final Cosmic Brand Climax Reveal */}
        <div className="border-t border-teal/20 pt-12 max-w-md mx-auto">
          <div className="font-heading font-extrabold text-2xl sm:text-3xl tracking-widest text-white uppercase mb-2">
            HORIZON<span className="text-gold">XT</span>
          </div>
          <div className="font-heading font-bold text-xs sm:text-sm tracking-[0.4em] text-teal-light uppercase">
            RESEARCH • INNOVATION • IMPACT
          </div>
        </div>
      </div>
    </section>
  );
};
