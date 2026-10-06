import { useState } from 'react';
import { Microscope, Cpu, Rocket, CheckCircle2 } from 'lucide-react';
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
    <section id="about" className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">

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
