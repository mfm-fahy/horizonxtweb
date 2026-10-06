import React from 'react';
import { Logo } from './Logo';
import { ArrowUp } from 'lucide-react';
import { sounds } from '../utils/sound';

interface FooterProps {
  onRegisterClick: () => void;
  onRulesClick: () => void;
  onDashboardClick?: () => void;
  hasActiveTeam?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onRegisterClick,
  onRulesClick,
}) => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Challenges', href: '#challenges' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Rules', onClick: onRulesClick },
    { label: 'FAQ', href: '#faq' },
    { label: 'Register', onClick: onRegisterClick },
  ];

  return (
    <footer className="relative bg-navy-darker border-t border-teal/20 text-white pt-16 pb-12 px-4 sm:px-6 lg:px-12 w-full z-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-teal/15">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="lg" showTagline={true} animated={false} />

            <p className="text-sm text-slate-muted font-sans leading-relaxed max-w-sm pt-2">
              HorizonXT is a 36-hour national hackathon. Registration is now open! Submit project abstracts (.docx format via Google Drive) by October 16. Shortlisted squads (up to 4 members) are invited to the physical 36-hour event on October 24–26.
            </p>

            <div className="font-heading font-semibold text-xs tracking-[0.2em] text-gold uppercase pt-1">
              &ldquo;Driving Innovation. Creating Impact. Transforming Lives.&rdquo;
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-teal mb-4">
              QUICK NAVIGATION
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm font-sans">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    sounds.playClick();
                    if (link.onClick) link.onClick();
                    else if (link.href) {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-left text-slate-muted hover:text-gold transition-colors py-1 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect & Helpdesk Contacts (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <div className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-gold mb-3">
              HELPDESK & COORDINATORS
            </div>

            <div className="space-y-2 text-xs font-mono text-lightgray bg-navy-surface/60 p-3.5 rounded-xl border border-teal/20">
              <div className="flex items-center justify-between border-b border-teal/15 pb-1.5">
                <span className="text-slate-muted">Faheem:</span>
                <a href="tel:9943949439" className="text-gold font-bold hover:underline">9943949439</a>
              </div>
              <div className="flex items-center justify-between border-b border-teal/15 pb-1.5">
                <span className="text-slate-muted">Rajha:</span>
                <a href="tel:8883877748" className="text-gold font-bold hover:underline">8883877748</a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-muted">Kennedy:</span>
                <a href="tel:8870594450" className="text-gold font-bold hover:underline">8870594450</a>
              </div>
            </div>


          </div>
        </div>

        {/* Bottom Copyright & Mission Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-muted">
          <div>
            © 2026 HorizonXT. All Rights Reserved.
          </div>

          <div className="text-center font-heading font-medium text-lightgray tracking-wider">
            &ldquo;Built for the next generation of innovators.&rdquo;
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center gap-1.5 text-teal hover:text-gold transition-colors cursor-pointer"
          >
            <span>BACK TO ORBIT</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
