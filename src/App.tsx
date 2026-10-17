import { useState } from 'react';
import { ThreeSpaceBackground } from './components/ThreeSpaceBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ChallengesSection } from './components/ChallengesSection';
import { EventHighlights } from './components/EventHighlights';
import { HowItWorksSection } from './components/HowItWorksSection';
import { JudgingSection } from './components/JudgingSection';
import { PrizesSection } from './components/PrizesSection';
import { InstitutionalSupport } from './components/InstitutionalSupport';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import type { TeamData } from './components/RegistrationModal';
import { TeamDashboardModal } from './components/TeamDashboardModal';
import { RulesModal } from './components/RulesModal';
import { Toast } from './components/Toast';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default demo team data (matching specification: Team Nova)
  const defaultTeam: TeamData = {
    teamId: 'HZXT-8492',
    teamName: 'TEAM NOVA',
    inviteCode: 'ORBIT-7X9Q',
    selectedChallenge: 'AI & MACHINE LEARNING',
    projectTitle: 'Autonomous Neural Diagnostic Synthesis',
    abstractUrl: 'https://drive.google.com/file/d/1a2b3c4d5e_horizonxt_abstract.docx/view',
    registrationStatus: 'REGISTRATION CLOSED • SHORTLISTED TEAM RESULT WILL BE ANNOUNCED SOON',
    submissionStatus: 'PENDING',
    members: [
      {
        id: 'mem-1',
        name: 'Vishnu N.',
        email: 'vishnu@horizonxt.io',
        role: 'Team Leader • Frontend & UI',
        linkedinUrl: 'https://linkedin.com/in/vishnu-n-horizonxt',
        isLeader: true,
        status: 'active',
      },
      {
        id: 'mem-2',
        name: 'Aarav Sharma',
        email: 'backend.cadet@college.edu',
        role: 'Backend & Cloud Systems',
        linkedinUrl: 'https://linkedin.com/in/aarav-sharma-dev',
        isLeader: false,
        status: 'active',
      },
      {
        id: 'mem-3',
        name: 'Ananya Verma',
        email: 'aiml.cadet@college.edu',
        role: 'AI / ML Specialist',
        linkedinUrl: 'https://linkedin.com/in/ananya-verma-ml',
        isLeader: false,
        status: 'active',
      },
      {
        id: 'mem-4',
        name: 'Rohan Gupta',
        email: 'design.cadet@college.edu',
        role: 'Design & Product UX',
        linkedinUrl: 'https://linkedin.com/in/rohan-gupta-ui',
        isLeader: false,
        status: 'active',
      },
      {
        id: 'mem-5',
        name: 'Priya Nair',
        email: 'systems.cadet@college.edu',
        role: 'DevOps & Cyber Security',
        linkedinUrl: 'https://linkedin.com/in/priya-nair-sec',
        isLeader: false,
        status: 'active',
      },
    ],
  };

  const [activeTeam, setActiveTeam] = useState<TeamData>(() => {
    const saved = localStorage.getItem('horizonxt_team');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultTeam;
      }
    }
    return defaultTeam;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpdateTeam = (updated: TeamData) => {
    setActiveTeam(updated);
    localStorage.setItem('horizonxt_team', JSON.stringify(updated));
  };

  const handleExploreScroll = () => {
    const challengesEl = document.getElementById('challenges');
    if (challengesEl) {
      challengesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-navy text-white selection:bg-teal selection:text-navy overflow-x-hidden">
      {/* 1. Cinematic Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Full-Screen 3D Space & Holographic Fluid Canvas Background */}
      <ThreeSpaceBackground />

      {/* 3. Floating Futuristic Navbar */}
      <Navbar
        onDashboardClick={() => setIsDashboardOpen(true)}
        onRulesClick={() => setIsRulesOpen(true)}
        hasActiveTeam={Boolean(activeTeam)}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <HeroSection
          onExploreClick={handleExploreScroll}
        />

        {/* About HorizonXT */}
        <AboutSection />

        {/* Official Problem Statements Section (PS1 - PS26) */}
        <ChallengesSection />

        {/* Event Highlights Dashboard */}
        <EventHighlights />

        {/* How It Works (Orbital Journey) */}
        <HowItWorksSection />

        {/* Judging Criteria */}
        <JudgingSection />

        {/* Prizes Showcase */}
        <PrizesSection />

        {/* Institutional Support */}
        <InstitutionalSupport />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Final CTA */}
        <FinalCtaSection />
      </main>

      {/* 4. Footer */}
      <Footer
        onRulesClick={() => setIsRulesOpen(true)}
        onDashboardClick={() => setIsDashboardOpen(true)}
        hasActiveTeam={Boolean(activeTeam)}
      />

      {/* 5. Team Dashboard Modal */}
      {activeTeam && (
        <TeamDashboardModal
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          team={activeTeam}
          onUpdateTeam={handleUpdateTeam}
          onShowToast={showToast}
        />
      )}

      {/* 7. Rules & Code of Conduct Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* 8. Toast Feedback Notifications */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

export default App;
