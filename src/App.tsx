import { useState } from 'react';
import { ThreeSpaceBackground } from './components/ThreeSpaceBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EventHighlights } from './components/EventHighlights';
import { ChallengesSection } from './components/ChallengesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TimelineSection } from './components/TimelineSection';
import { JudgingSection } from './components/JudgingSection';
import { PrizesSection } from './components/PrizesSection';
import { SponsorsSection } from './components/SponsorsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import type { TeamData } from './components/RegistrationModal';
import { TeamDashboardModal } from './components/TeamDashboardModal';
import { RulesModal } from './components/RulesModal';
import { Toast } from './components/Toast';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [selectedTrackForReg, setSelectedTrackForReg] = useState<string | undefined>();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Default demo team data (matching specification: Team Nova)
  const defaultTeam: TeamData = {
    teamId: 'HZX-8492',
    teamName: 'TEAM NOVA',
    inviteCode: 'ORBIT-7X9Q',
    selectedChallenge: 'AI & MACHINE LEARNING',
    projectTitle: 'Autonomous Neural Diagnostic Synthesis',
    registrationStatus: 'VERIFIED • ORBIT READY',
    submissionStatus: 'PENDING',
    members: [
      {
        id: 'mem-1',
        name: 'Vishnu N.',
        email: 'vishnu@horizonx.io',
        role: 'Team Leader • Frontend & UI',
        skills: ['React', 'Three.js', 'Tailwind', 'UI/UX'],
        isLeader: true,
        status: 'active',
      },
      {
        id: 'mem-2',
        name: 'Member 02',
        email: 'backend.cadet@college.edu',
        role: 'Backend & Cloud Systems',
        skills: ['Node.js', 'Go', 'PostgreSQL', 'Docker'],
        isLeader: false,
        status: 'active',
      },
      {
        id: 'mem-3',
        name: 'Member 03',
        email: 'aiml.cadet@college.edu',
        role: 'AI / ML Specialist',
        skills: ['Python', 'PyTorch', 'LangChain', 'FastAPI'],
        isLeader: false,
        status: 'active',
      },
      {
        id: 'mem-4',
        name: 'Member 04',
        email: 'design.cadet@college.edu',
        role: 'Design & Product UX',
        skills: ['Figma', 'Design Systems', 'User Research'],
        isLeader: false,
        status: 'active',
      },
    ],
  };

  const [activeTeam, setActiveTeam] = useState<TeamData>(() => {
    const saved = localStorage.getItem('horizonx_team');
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

  const handleRegistrationComplete = (newTeam: TeamData) => {
    setActiveTeam(newTeam);
    localStorage.setItem('horizonx_team', JSON.stringify(newTeam));
    setIsRegisterOpen(false);
    setIsDashboardOpen(true);
    showToast(`Team "${newTeam.teamName}" successfully initialized!`);
  };

  const handleUpdateTeam = (updated: TeamData) => {
    setActiveTeam(updated);
    localStorage.setItem('horizonx_team', JSON.stringify(updated));
  };

  const handleSelectTrackForRegistration = (trackId: string) => {
    setSelectedTrackForReg(trackId);
    setIsRegisterOpen(true);
  };

  const handleExploreScroll = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
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
        onRegisterClick={() => {
          setSelectedTrackForReg(undefined);
          setIsRegisterOpen(true);
        }}
        onDashboardClick={() => setIsDashboardOpen(true)}
        onRulesClick={() => setIsRulesOpen(true)}
        hasActiveTeam={Boolean(activeTeam)}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <HeroSection
          onRegisterClick={() => {
            setSelectedTrackForReg(undefined);
            setIsRegisterOpen(true);
          }}
          onExploreClick={handleExploreScroll}
        />

        {/* About HorizonX */}
        <AboutSection />

        {/* Event Highlights Dashboard */}
        <EventHighlights />

        {/* Challenges Section */}
        <ChallengesSection
          onSelectTrackForRegistration={handleSelectTrackForRegistration}
        />

        {/* How It Works (Orbital Journey) */}
        <HowItWorksSection
          onRegisterClick={() => {
            setSelectedTrackForReg(undefined);
            setIsRegisterOpen(true);
          }}
        />

        {/* Timeline Section */}
        <TimelineSection />

        {/* Judging Criteria */}
        <JudgingSection />

        {/* Prizes Showcase */}
        <PrizesSection />

        {/* Sponsors & Partners */}
        <SponsorsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Final CTA */}
        <FinalCtaSection
          onRegisterClick={() => {
            setSelectedTrackForReg(undefined);
            setIsRegisterOpen(true);
          }}
        />
      </main>

      {/* 4. Footer */}
      <Footer
        onRegisterClick={() => {
          setSelectedTrackForReg(undefined);
          setIsRegisterOpen(true);
        }}
        onRulesClick={() => setIsRulesOpen(true)}
        onDashboardClick={() => setIsDashboardOpen(true)}
        hasActiveTeam={Boolean(activeTeam)}
      />

      {/* 5. Team Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialTrackId={selectedTrackForReg}
        onRegistrationComplete={handleRegistrationComplete}
      />

      {/* 6. Team Dashboard Modal */}
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
