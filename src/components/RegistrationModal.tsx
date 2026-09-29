import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Logo } from './Logo';
import { sounds } from '../utils/sound';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  isLeader: boolean;
  status: 'active' | 'pending';
}

export interface TeamData {
  teamId: string;
  teamName: string;
  inviteCode: string;
  selectedChallenge: string;
  projectTitle: string;
  registrationStatus: 'VERIFIED • ORBIT READY';
  submissionStatus: 'PENDING' | 'SUBMITTED';
  submissionDetails?: {
    repoUrl: string;
    demoUrl: string;
    description: string;
    submittedAt: string;
  };
  members: TeamMember[];
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackId?: string;
  onRegistrationComplete: (team: TeamData) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialTrackId,
  onRegistrationComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Personal Details
  const [personal, setPersonal] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '3rd Year',
    skills: ['Frontend', 'AI/ML'] as string[],
  });

  // Step 2: Team Flow
  const [teamMode, setTeamMode] = useState<'create' | 'join'>('create');
  const [createTeamData, setCreateTeamData] = useState({
    teamName: '',
    teamSize: '4',
    leaderRole: 'Frontend & System Architecture',
  });
  const [joinTeamData, setJoinTeamData] = useState({
    teamId: '',
    inviteCode: '',
    memberRole: 'Full Stack Engineer',
  });

  // Step 3: Challenge Selection
  const [selectedChallenge, setSelectedChallenge] = useState(
    initialTrackId || 'ai-ml'
  );
  const [projectTitle, setProjectTitle] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialTrackId) {
      setSelectedChallenge(initialTrackId);
    }
  }, [initialTrackId]);

  if (!isOpen) return null;

  const availableSkills = [
    'Frontend',
    'Backend',
    'AI/ML',
    'UI/UX Design',
    'DevOps / Cloud',
    'Cybersecurity',
    'Mobile Apps',
    'IoT / Hardware',
  ];

  const toggleSkill = (skill: string) => {
    setPersonal((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill],
      };
    });
  };

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!personal.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!personal.email.trim() || !personal.email.includes('@'))
      errs.email = 'Valid academic or personal email required.';
    if (!personal.phone.trim() || personal.phone.length < 10)
      errs.phone = '10-digit contact number required.';
    if (!personal.college.trim()) errs.college = 'College or University name required.';
    if (!personal.department.trim()) errs.department = 'Department name required.';
    if (personal.skills.length === 0) errs.skills = 'Select at least one skill.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (teamMode === 'create') {
      if (!createTeamData.teamName.trim()) errs.teamName = 'Team name is required.';
    } else {
      if (!joinTeamData.teamId.trim()) errs.teamId = 'Team ID is required (e.g. HZX-8492).';
      if (!joinTeamData.inviteCode.trim())
        errs.inviteCode = 'Invite Code is required (e.g. ORBIT-7X9Q).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!selectedChallenge) errs.selectedChallenge = 'Please choose a frontier track.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    sounds.playClick();
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };

  const handleBack = () => {
    sounds.playClick();
    if (step > 1) setStep((step - 1) as 1 | 2 | 3 | 4);
  };

  const handleFinalSubmit = () => {
    sounds.playSuccess();

    // Trigger celebratory particle blast
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A7B5', '#F5A623', '#1F3FAE', '#FFFFFF'],
      });
    } catch {
      // fallback
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const generatedTeamId = `HZX-${randomDigits}`;
    const generatedInviteCode = `ORBIT-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newTeam: TeamData = {
      teamId: teamMode === 'create' ? generatedTeamId : joinTeamData.teamId.toUpperCase(),
      teamName:
        teamMode === 'create'
          ? createTeamData.teamName.toUpperCase()
          : `TEAM ${joinTeamData.teamId.toUpperCase()}`,
      inviteCode: teamMode === 'create' ? generatedInviteCode : joinTeamData.inviteCode.toUpperCase(),
      selectedChallenge: selectedChallenge,
      projectTitle: projectTitle.trim() || 'HorizonX Autonomous Frontier Solution',
      registrationStatus: 'VERIFIED • ORBIT READY',
      submissionStatus: 'PENDING',
      members:
        teamMode === 'create'
          ? [
              {
                id: 'mem-1',
                name: personal.fullName,
                email: personal.email,
                role: 'Team Leader • ' + personal.skills[0],
                skills: personal.skills,
                isLeader: true,
                status: 'active',
              },
              {
                id: 'mem-2',
                name: 'Member 02 (Invited)',
                email: 'Awaiting squad invite code...',
                role: 'Backend / Systems',
                skills: ['Node.js', 'PostgreSQL', 'Docker'],
                isLeader: false,
                status: 'pending',
              },
              {
                id: 'mem-3',
                name: 'Member 03 (Invited)',
                email: 'Awaiting squad invite code...',
                role: 'AI / ML Specialist',
                skills: ['Python', 'PyTorch', 'LangChain'],
                isLeader: false,
                status: 'pending',
              },
              {
                id: 'mem-4',
                name: 'Member 04 (Invited)',
                email: 'Awaiting squad invite code...',
                role: 'UI/UX & Frontend',
                skills: ['Figma', 'React', 'Tailwind'],
                isLeader: false,
                status: 'pending',
              },
            ]
          : [
              {
                id: 'mem-leader',
                name: 'Squad Commander',
                email: 'leader@horizonx.io',
                role: 'Team Leader',
                skills: ['System Architecture'],
                isLeader: true,
                status: 'active',
              },
              {
                id: 'mem-user',
                name: personal.fullName,
                email: personal.email,
                role: joinTeamData.memberRole,
                skills: personal.skills,
                isLeader: false,
                status: 'active',
              },
            ],
    };

    onRegistrationComplete(newTeam);
  };

  const stepTitles = [
    { num: '01', title: 'PERSONAL' },
    { num: '02', title: 'TEAM' },
    { num: '03', title: 'CHALLENGE' },
    { num: '04', title: 'CONFIRM' },
  ];

  const challengeOptions = [
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖' },
    { id: 'fintech', name: 'FinTech & DeFi', icon: '💳' },
    { id: 'healthcare', name: 'Healthcare & BioTech', icon: '🩺' },
    { id: 'smart-cities', name: 'Smart Cities & CleanTech', icon: '🌆' },
    { id: 'cybersecurity', name: 'Cybersecurity & Zero Trust', icon: '🛡️' },
    { id: 'open-innovation', name: 'Open Innovation & Wildcard', icon: '✨' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-darker/85 backdrop-blur-2xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel-elevated border border-teal/40 p-6 sm:p-10 my-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close registration"
          className="absolute top-6 right-6 p-2 rounded-xl bg-navy-surface border border-teal/30 text-slate-muted hover:text-white hover:border-teal transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header with Logo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal/20 pb-6 mb-8">
          <Logo size="md" showTagline={true} />
          <div className="font-mono text-xs text-gold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span>PORTAL: ORBITAL REGISTRATION</span>
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
          {stepTitles.map((s, idx) => {
            const currentIdx = idx + 1;
            const isCompleted = step > currentIdx;
            const isActive = step === currentIdx;

            return (
              <div key={s.num} className="flex flex-col gap-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gold shadow-glow-gold'
                      : isCompleted
                      ? 'bg-teal'
                      : 'bg-navy-surface'
                  }`}
                />
                <span
                  className={`font-mono text-[10px] sm:text-xs tracking-wider uppercase font-bold truncate ${
                    isActive ? 'text-gold' : isCompleted ? 'text-teal' : 'text-slate-muted'
                  }`}
                >
                  {s.num} {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* STEP 1: PERSONAL DETAILS */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-teal font-heading font-bold text-sm tracking-wider uppercase">
              <User className="w-4 h-4" />
              <span>PARTICIPANT TELEMETRY</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Vance"
                  value={personal.fullName}
                  onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                  College / Personal Email *
                </label>
                <input
                  type="email"
                  placeholder="alex.v@college.edu"
                  value={personal.email}
                  onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={personal.phone}
                  onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                />
                {errors.phone && (
                  <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* College */}
              <div>
                <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                  College / Institute Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Institute of Tech"
                  value={personal.college}
                  onChange={(e) => setPersonal({ ...personal, college: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                />
                {errors.college && (
                  <p className="text-xs text-rose-400 mt-1">{errors.college}</p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                  Department / Degree *
                </label>
                <input
                  type="text"
                  placeholder="Computer Science & Engineering"
                  value={personal.department}
                  onChange={(e) => setPersonal({ ...personal, department: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                />
                {errors.department && (
                  <p className="text-xs text-rose-400 mt-1">{errors.department}</p>
                )}
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                  Year of Study
                </label>
                <select
                  value={personal.year}
                  onChange={(e) => setPersonal({ ...personal, year: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                >
                  <option value="1st Year">1st Year Undergraduate</option>
                  <option value="2nd Year">2nd Year Undergraduate</option>
                  <option value="3rd Year">3rd Year Undergraduate</option>
                  <option value="4th Year">4th Year Undergraduate</option>
                  <option value="Postgraduate">Postgraduate / Masters</option>
                </select>
              </div>
            </div>

            {/* Core Skills */}
            <div>
              <label className="block text-xs font-mono text-lightgray/80 mb-2 uppercase">
                Primary Expertise & Skills (Select all that apply) *
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => {
                  const isSelected = personal.skills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        isSelected
                          ? 'bg-teal text-navy font-bold border border-teal shadow-glow-teal'
                          : 'bg-navy-surface text-lightgray border border-teal/20 hover:border-teal/50'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
              {errors.skills && (
                <p className="text-xs text-rose-400 mt-1">{errors.skills}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: TEAM SETUP (CREATE OR JOIN) */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-teal font-heading font-bold text-sm tracking-wider uppercase">
              <Users className="w-4 h-4" />
              <span>SQUAD PROTOCOL</span>
            </div>

            {/* Mode Switcher: Create vs Join */}
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-navy-surface border border-teal/25">
              <button
                type="button"
                onClick={() => setTeamMode('create')}
                className={`py-3 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
                  teamMode === 'create'
                    ? 'bg-gold text-navy shadow-glow-gold'
                    : 'text-lightgray hover:text-white'
                }`}
              >
                CREATE NEW TEAM (LEADER)
              </button>
              <button
                type="button"
                onClick={() => setTeamMode('join')}
                className={`py-3 rounded-xl font-heading text-xs font-bold tracking-wider uppercase transition-all ${
                  teamMode === 'join'
                    ? 'bg-gold text-navy shadow-glow-gold'
                    : 'text-lightgray hover:text-white'
                }`}
              >
                JOIN EXISTING TEAM
              </button>
            </div>

            {teamMode === 'create' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                    Team / Squad Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SQUAD NEBULA"
                    value={createTeamData.teamName}
                    onChange={(e) =>
                      setCreateTeamData({ ...createTeamData, teamName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                  />
                  {errors.teamName && (
                    <p className="text-xs text-rose-400 mt-1">{errors.teamName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                      Target Squad Size
                    </label>
                    <select
                      value={createTeamData.teamSize}
                      onChange={(e) =>
                        setCreateTeamData({ ...createTeamData, teamSize: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                    >
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members (Recommended)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                      Your Role as Leader
                    </label>
                    <input
                      type="text"
                      value={createTeamData.leaderRole}
                      onChange={(e) =>
                        setCreateTeamData({ ...createTeamData, leaderRole: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-darker/80 border border-gold/30 text-xs font-mono text-lightgray flex items-start gap-3">
                  <KeyRound className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gold">AUTOMATIC SQUAD CREDENTIALS:</span>
                    <p className="text-slate-muted mt-0.5">
                      Upon confirmation, an exclusive Team ID and 8-character encrypted Invite Code will be generated for you to invite teammates.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                    Team ID *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HZX-8492"
                    value={joinTeamData.teamId}
                    onChange={(e) =>
                      setJoinTeamData({ ...joinTeamData, teamId: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                  />
                  {errors.teamId && (
                    <p className="text-xs text-rose-400 mt-1">{errors.teamId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                    Invite Code *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ORBIT-7X9Q"
                    value={joinTeamData.inviteCode}
                    onChange={(e) =>
                      setJoinTeamData({ ...joinTeamData, inviteCode: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                  />
                  {errors.inviteCode && (
                    <p className="text-xs text-rose-400 mt-1">{errors.inviteCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                    Your Designated Squad Role
                  </label>
                  <input
                    type="text"
                    value={joinTeamData.memberRole}
                    onChange={(e) =>
                      setJoinTeamData({ ...joinTeamData, memberRole: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: CHALLENGE SELECTION */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-teal font-heading font-bold text-sm tracking-wider uppercase">
              <Compass className="w-4 h-4" />
              <span>CHALLENGE FRONTIER ALIGNMENT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challengeOptions.map((opt) => {
                const isSelected = selectedChallenge === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setSelectedChallenge(opt.id)}
                    className={`p-4 rounded-xl text-left border transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'bg-navy-surface border-gold shadow-glow-gold'
                        : 'bg-navy-darker/70 border-teal/20 hover:border-teal/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{opt.icon}</span>
                      <span className="font-heading font-bold text-xs uppercase tracking-wider text-lightgray">
                        {opt.name}
                      </span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                Tentative Project Title or Concept (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Autonomous Satellite Collision Avoidance Neural Engine"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
              />
              <p className="text-[11px] text-slate-muted mt-1">
                You can alter project title and description anytime before final submission.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION & INITIALIZATION */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-gold font-heading font-bold text-sm tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>REVIEW TELEMETRY & CONFIRM</span>
            </div>

            <div className="p-5 rounded-2xl bg-navy-darker/90 border border-teal/30 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">PARTICIPANT:</span>
                <span className="text-white font-bold">{personal.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">EMAIL:</span>
                <span className="text-white">{personal.email}</span>
              </div>
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">COLLEGE:</span>
                <span className="text-white">{personal.college}</span>
              </div>
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">MODE:</span>
                <span className="text-gold font-bold uppercase">
                  {teamMode === 'create' ? 'CREATE TEAM (LEADER)' : 'JOIN TEAM'}
                </span>
              </div>
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">SQUAD:</span>
                <span className="text-white font-bold">
                  {teamMode === 'create' ? createTeamData.teamName : joinTeamData.teamId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-muted">FRONTIER TRACK:</span>
                <span className="text-teal font-bold uppercase">{selectedChallenge}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-surface border border-teal/20 text-xs text-lightgray flex items-start gap-3 font-sans">
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>
                By completing registration, I agree to the HorizonX Code of Conduct, intellectual property ownership guidelines, and 36-hour sprint regulations.
              </span>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-teal/20">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl font-heading text-xs font-semibold tracking-wider uppercase border border-teal/30 text-lightgray hover:border-teal flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-7 py-3 rounded-xl font-heading text-xs font-bold tracking-[0.2em] uppercase bg-royal hover:bg-royal-light text-white shadow-glow-royal flex items-center gap-2 cursor-pointer"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              className="px-8 py-3.5 rounded-xl font-heading text-xs font-bold tracking-[0.2em] uppercase bg-gold hover:bg-gold-light text-navy shadow-glow-gold flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>INITIALIZE SQUAD TELEMETRY</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
