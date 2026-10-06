import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

interface NavbarProps {
  onRegisterClick: () => void;
  onDashboardClick: () => void;
  onRulesClick: () => void;
  hasActiveTeam: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRegisterClick,
  onRulesClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CHALLENGES', href: '#challenges' },
    { label: 'HOW IT WORKS', href: '#how-it-works' },
    { label: 'PRIZES', href: '#prizes' },
    { label: 'RULES', onClick: onRulesClick },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (item: { label: string; href?: string; onClick?: () => void }) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 ${
          isScrolled
            ? 'bg-navy/80 backdrop-blur-2xl border-b border-teal/25 shadow-[0_12px_36px_rgba(6,18,38,0.7)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: HorizonXT Logo */}
          <div
            onClick={() => {
              sounds.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer"
          >
            <Logo size="md" showTagline={true} animated={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item)}
                onMouseEnter={() => sounds.playHover()}
                className="font-heading text-xs font-bold tracking-[0.08em] text-lightgray/85 hover:text-teal hover:drop-shadow-[0_0_8px_rgba(0,167,181,0.6)] transition-all duration-200 cursor-pointer uppercase py-1 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-teal to-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Glowing Primary CTA: REGISTER NOW */}
            <button
              onClick={() => {
                sounds.playClick();
                onRegisterClick();
              }}
              onMouseEnter={() => sounds.playHover()}
              className="group relative px-5 py-2.5 rounded-xl font-heading text-xs font-bold tracking-[0.18em] uppercase bg-gold hover:bg-gold-light text-navy shadow-glow-gold transition-all duration-250 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Mobile Menu"
              className="p-2 rounded-lg border border-teal/30 bg-navy-surface/80 text-teal hover:border-teal transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-navy/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 animate-in fade-in duration-300">
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 p-2 rounded-xl border border-teal/40 text-teal bg-navy-surface"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col gap-5">
            <Logo size="lg" showTagline={true} />
            <div className="h-[1px] w-full bg-gradient-to-r from-teal/40 via-gold/30 to-transparent my-2" />

            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item)}
                  className="text-left font-heading text-lg font-bold tracking-[0.2em] text-lightgray hover:text-teal transition-colors uppercase py-2 border-b border-navy-surface/80 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-teal/50" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3.5 rounded-xl font-heading text-sm font-bold tracking-[0.2em] uppercase bg-gold text-navy shadow-glow-gold flex items-center justify-center gap-2"
            >
              <span>REGISTER NOW →</span>
            </button>
            <div className="text-center font-mono text-[10px] text-gold uppercase tracking-widest mt-2">
              HORIZONXT • REGISTRATION OPENS OCT 5 • EVENT OCT 24–26
            </div>
          </div>
        </div>
      )}
    </>
  );
};
