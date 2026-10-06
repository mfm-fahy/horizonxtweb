import React from 'react';
import { Logo } from './Logo';
import { Mail, ArrowUp } from 'lucide-react';
import { sounds } from '../utils/sound';

interface FooterProps {
  onRegisterClick: () => void;
  onRulesClick: () => void;
  onDashboardClick: () => void;
  hasActiveTeam: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onRegisterClick,
  onRulesClick,
  onDashboardClick,
  hasActiveTeam,
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
              HorizonXT is a 36-hour national hackathon. Registration officially opens on October 5. Submit project abstracts (.docx format via Google Drive) by October 16. Shortlisted squads (up to 5 members) are invited to the physical 36-hour event on October 24–26.
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

              {hasActiveTeam && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onDashboardClick();
                  }}
                  className="text-left text-teal-light hover:text-white font-semibold py-1 cursor-pointer"
                >
                  Squad Dashboard
                </button>
              )}
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

            <div className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-teal mb-2 pt-2">
              COMMUNICATION CHANNELS
            </div>

            <p className="text-xs text-slate-muted font-sans leading-relaxed">
              Stay aligned with real-time announcements and event updates.
            </p>

            {/* Social Icons Row with crisp SVGs */}
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl bg-navy-surface border border-teal/25 hover:border-gold/60 text-slate-muted hover:text-gold hover:shadow-glow-gold transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-navy-surface border border-teal/25 hover:border-gold/60 text-slate-muted hover:text-gold hover:shadow-glow-gold transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-10 h-10 rounded-xl bg-navy-surface border border-teal/25 hover:border-gold/60 text-slate-muted hover:text-gold hover:shadow-glow-gold transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-navy-surface border border-teal/25 hover:border-gold/60 text-slate-muted hover:text-gold hover:shadow-glow-gold transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:contact@horizonxt.io"
                aria-label="Email"
                className="w-10 h-10 rounded-xl bg-navy-surface border border-teal/25 hover:border-gold/60 text-slate-muted hover:text-gold hover:shadow-glow-gold transition-all duration-200 flex items-center justify-center"
              >
                <Mail className="w-4 h-4" />
              </a>
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
