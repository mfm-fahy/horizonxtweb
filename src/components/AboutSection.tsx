import { useState } from 'react';
import { Microscope, Cpu, Rocket, CheckCircle2, Compass } from 'lucide-react';
import { sounds } from '../utils/sound';

export const AboutSection: React.FC = () => {
  const [tilt, setTilt] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - card.left) / card.width - 0.5) * 16;
    const y = -((e.clientY - card.top) / card.height - 0.5) * 16;
    setTilt((prev) => ({ ...prev, [index]: { x, y } }));
  };

  const handleMouseLeave = (index: number) => {
    setTilt((prev) => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  const pillars = [
    {
      title: 'RESEARCH',
      tagline: 'Explore new possibilities.',
      description:
        'Groundbreaking solutions begin with deep algorithmic inquiry, fundamental scientific rigor, and questioning established paradigms in the unexplored universe.',
      icon: Microscope,
      badge: 'ORBITAL PILLAR 01',
      highlights: ['Deep-Tech Exploration', 'Novel Methodologies', 'Scientific Integrity'],
    },
    {
      title: 'INNOVATION',
      tagline: 'Turn ideas into technology.',
      description:
        'Transform abstract theoretical frameworks into production-grade functional software, AI systems, and scalable planetary architectures within 36 hours.',
      icon: Cpu,
      badge: 'ORBITAL PILLAR 02',
      highlights: ['Autonomous AI & ML', 'Distributed Systems', 'Rapid Prototyping'],
    },
    {
      title: 'IMPACT',
      tagline: 'Build solutions that matter.',
      description:
        'Innovation must serve humanity. Create scalable systems addressing healthcare accessibility, financial inclusion, resilient infrastructure, and space exploration.',
      icon: Rocket,
      badge: 'ORBITAL PILLAR 03',
      highlights: ['Societal Transformation', 'Scalable Deployments', 'Human-Centric Design'],
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-left sm:text-center max-w-4xl mx-auto mb-16 sm:mb-24 relative group">
          {/* Massive soft glowing dark aura behind the text to separate it from the 3D planet without looking like a card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[180%] bg-[radial-gradient(ellipse_at_center,_rgba(10,29,59,0.95)_0%,_rgba(10,29,59,0.7)_45%,_transparent_75%)] blur-xl pointer-events-none -z-10" />
          
          <div className="relative z-10 px-2 sm:px-0">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-navy-darker/80 mb-6 border border-teal/40 shadow-glow-teal">
              <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-teal" />
              <span className="font-heading font-semibold text-[10px] sm:text-xs tracking-[0.25em] text-teal-light uppercase">
                THE PLANETARY INNOVATION MATRIX
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-4 sm:mb-6 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] cursor-default">
              THE NEXT HORIZON OF <br className="hidden sm:block" /> <span className="text-holo">INNOVATION</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/75 font-normal leading-relaxed font-sans max-w-3xl mx-auto text-left sm:text-center transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(165,243,252,0.8)] cursor-default">
              HorizonXT is a 36-hour innovation challenge. Registration officially opens on October 5. Submit your project abstract in .docx format via Google Drive for your chosen problem statement by October 16. Shortlisted teams (up to 5 members per squad) will be called to the physical event on October 24–26 (launching Oct 24 at 9:00 AM).
            </p>
          </div>
        </div>

        {/* 3D Floating Liquid Glass Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const currentTilt = tilt[idx] || { x: 0, y: 0 };

            return (
              <div
                key={pillar.title}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseEnter={() => sounds.playHover()}
                onMouseLeave={() => handleMouseLeave(idx)}
                style={{
                  transform: `perspective(1000px) rotateX(${currentTilt.y}deg) rotateY(${currentTilt.x}deg) scale3d(1, 1, 1)`,
                  transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
                }}
                className="group relative rounded-3xl glass-panel-elevated p-8 sm:p-9 flex flex-col justify-between border border-teal/25 hover:border-gold/60 transition-all duration-300 hover:shadow-glass-hover overflow-hidden"
              >
                {/* Decorative Liquid Caustic Top Glow */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-teal to-transparent group-hover:via-gold transition-all duration-500" />

                <div>
                  {/* Card Header Badge & Droplet Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-teal tracking-widest uppercase">
                      {pillar.badge}
                    </span>
                    <div className="w-13 h-13 rounded-2xl bg-navy-darker/90 border border-teal/30 group-hover:border-gold/60 flex items-center justify-center text-teal group-hover:text-gold transition-all duration-300 shadow-glow-teal group-hover:shadow-glow-gold">
                      <Icon className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-heading font-extrabold text-2xl text-white tracking-wide uppercase mb-2 group-hover:text-gold-light transition-colors">
                    {pillar.title}
                  </h3>

                  <div className="font-heading font-semibold text-sm text-teal-light mb-4 tracking-wide">
                    {pillar.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-muted leading-relaxed mb-6 font-sans">
                    {pillar.description}
                  </p>
                </div>

                {/* Key Highlights list */}
                <div className="pt-6 border-t border-teal/15 space-y-2.5">
                  {pillar.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-mono text-lightgray">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 group-hover:text-gold transition-colors" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Mission Statement Box */}
        <div className="mt-16 p-8 rounded-3xl glass-panel-elevated border border-teal/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-3 h-14 bg-gradient-to-b from-teal via-royal to-gold rounded-full shrink-0 shadow-glow-teal" />
            <div>
              <div className="font-heading font-bold text-xs tracking-[0.3em] text-teal uppercase mb-1">
                OUR CORE CREED
              </div>
              <div className="font-heading text-lg sm:text-2xl font-bold text-white">
                &ldquo;Driving Innovation. Creating Impact. Transforming Lives.&rdquo;
              </div>
            </div>
          </div>

          <div className="font-mono text-xs text-slate-muted text-right md:max-w-xs">
            Open to all enrolled undergraduate & graduate students worldwide. Zero registration fee.
          </div>
        </div>
      </div>
    </section>
  );
};
