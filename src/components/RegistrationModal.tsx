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
  ShieldCheck,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Logo } from './Logo';
import { sounds } from '../utils/sound';
import { problemStatements } from '../data/problemStatements';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  linkedinUrl: string;
  isLeader: boolean;
  status: 'active' | 'pending';
}

export interface TeamData {
  teamId: string;
  teamName: string;
  inviteCode: string;
  selectedChallenge: string;
  projectTitle: string;
  abstractUrl: string;
  registrationStatus: 'ABSTRACT SUBMITTED • SHORTLISTING PENDING' | 'VERIFIED • SHORTLISTED FOR EVENT';
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

  // Step 1: Personal Details (Leader)
  const [personal, setPersonal] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '3rd Year',
    linkedinUrl: '',
  });

  // Step 2: Team Flow
  const [createTeamData, setCreateTeamData] = useState({
    teamName: '',
    teamSize: '4',
    leaderRole: 'Team Leader & System Architect',
  });

  // Additional members for Create Team (up to 4 teammates, making total 5)
  const [teammates, setTeammates] = useState<
    Array<{ name: string; email: string; role: string; linkedinUrl: string }>
  >([
    { name: '', email: '', role: 'Backend Developer', linkedinUrl: '' },
    { name: '', email: '', role: 'AI / ML Specialist', linkedinUrl: '' },
    { name: '', email: '', role: 'UI/UX Designer', linkedinUrl: '' },
    { name: '', email: '', role: 'Full Stack Engineer', linkedinUrl: '' },
  ]);

  // Step 3: Challenge & Abstract Submission
  const [selectedChallenge, setSelectedChallenge] = useState(
    initialTrackId || problemStatements[0].code
  );
  const [projectTitle, setProjectTitle] = useState('');
  const [abstractUrl, setAbstractUrl] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTrackId) {
      setSelectedChallenge(initialTrackId);
    }
  }, [initialTrackId]);

  if (!isOpen) return null;

  const updateTeammate = (
    index: number,
    field: 'name' | 'email' | 'role' | 'linkedinUrl',
    value: string
  ) => {
    setTeammates((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
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
    if (!personal.linkedinUrl.trim()) errs.linkedinUrl = 'LinkedIn profile URL is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!createTeamData.teamName.trim()) errs.teamName = 'Team name is required.';
    const targetSize = parseInt(createTeamData.teamSize, 10);
    for (let i = 0; i < targetSize - 1; i++) {
      const tm = teammates[i];
      if (!tm.name.trim()) {
        errs[`tm_${i}_name`] = `Teammate ${i + 2} Name is required.`;
      }
      if (!tm.email.trim() || !tm.email.includes('@')) {
        errs[`tm_${i}_email`] = `Valid email required for Teammate ${i + 2}.`;
      }
      if (!tm.linkedinUrl.trim()) {
        errs[`tm_${i}_linkedin`] = `LinkedIn Profile URL required for Teammate ${i + 2}.`;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!selectedChallenge) errs.selectedChallenge = 'Please choose a frontier track.';
    if (!abstractUrl.trim()) {
      errs.abstractUrl = 'Google Drive link for Abstract (.docx format) is required.';
    } else if (!abstractUrl.includes('drive.google.com') && !abstractUrl.includes('docs.google.com')) {
      errs.abstractUrl = 'Please provide a valid Google Drive URL (e.g., https://drive.google.com/...)';
    }
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

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    sounds.playSuccess();

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

    let compiledMembers: TeamMember[] = [];

    const leaderMember: TeamMember = {
      id: 'mem-1',
      name: personal.fullName,
      email: personal.email,
      role: createTeamData.leaderRole || 'Team Leader',
      linkedinUrl: personal.linkedinUrl,
      isLeader: true,
      status: 'active',
    };

    const targetCount = parseInt(createTeamData.teamSize, 10);
    const otherMembers: TeamMember[] = teammates.slice(0, targetCount - 1).map((tm, idx) => ({
      id: `mem-${idx + 2}`,
      name: tm.name || `Teammate 0${idx + 2}`,
      email: tm.email || `teammate${idx + 2}@college.edu`,
      role: tm.role || `Teammate 0${idx + 2}`,
      linkedinUrl: tm.linkedinUrl,
      isLeader: false,
      status: 'active',
    }));

    compiledMembers = [leaderMember, ...otherMembers];

    const newTeam: TeamData = {
      teamId: generatedTeamId,
      teamName: createTeamData.teamName.toUpperCase(),
      inviteCode: generatedInviteCode,
      selectedChallenge: selectedChallenge,
      projectTitle: projectTitle.trim() || 'HorizonXT Abstract Solution',
      abstractUrl: abstractUrl.trim(),
      registrationStatus: 'ABSTRACT SUBMITTED • SHORTLISTING PENDING',
      submissionStatus: 'PENDING',
      members: compiledMembers,
    };

    // Save to MongoDB Atlas via /api/register serverless endpoint
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeam),
      });
    } catch (apiError) {
      console.warn('Backend API connection warning (will retain local state):', apiError);
    } finally {
      setIsSubmitting(false);
    }

    onRegistrationComplete(newTeam);
  };

  const stepTitles = [
    { num: '01', title: 'LEADER' },
    { num: '02', title: 'TEAM & LINKEDIN' },
    { num: '03', title: 'ABSTRACT (.DOCX)' },
    { num: '04', title: 'CONFIRM' },
  ];

  const targetSizeCount = parseInt(createTeamData.teamSize, 10);

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
            <span>REGISTRATION OPENS OCT 5 • ABSTRACT DEADLINE OCT 16</span>
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

        {/* STEP 1: PERSONAL DETAILS (LEADER) */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-teal font-heading font-bold text-sm tracking-wider uppercase">
              <User className="w-4 h-4" />
              <span>TEAM LEADER DETAILS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                  Full Name (Leader) *
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

              {/* LinkedIn URL for Leader */}
              <div>
                <label className="block text-xs font-mono text-gold mb-1.5 uppercase flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-gold" />
                  <span>Leader LinkedIn Profile URL *</span>
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/alex-vance"
                  value={personal.linkedinUrl}
                  onChange={(e) => setPersonal({ ...personal, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-gold/40 focus:border-gold focus:outline-none text-white text-sm font-sans"
                />
                {errors.linkedinUrl && (
                  <p className="text-xs text-rose-400 mt-1">{errors.linkedinUrl}</p>
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
            </div>
          </div>
        )}

        {/* STEP 2: TEAM SETUP (UP TO 5 MEMBERS WITH LINKEDIN) */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-teal font-heading font-bold text-sm tracking-wider uppercase">
              <Users className="w-4 h-4" />
              <span>SQUAD ROSTER (MAX 5 MEMBERS) & LINKEDIN PROFILES</span>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-xs font-mono text-gold mb-1.5 uppercase font-bold">
                      Squad Size (Max 5 Members) *
                    </label>
                    <select
                      value={createTeamData.teamSize}
                      onChange={(e) =>
                        setCreateTeamData({ ...createTeamData, teamSize: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-gold/40 focus:border-gold focus:outline-none text-white text-sm font-sans"
                    >
                      <option value="1">1 Member (Solo)</option>
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members</option>
                      <option value="5">5 Members (Maximum)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Teammates Inputs (up to 5 total members) */}
                {targetSizeCount > 1 && (
                  <div className="space-y-4 pt-2">
                    <div className="font-mono text-xs text-teal font-bold uppercase tracking-wider">
                      TEAM MEMBERS' LINKEDIN & CONTACT DETAILS ({targetSizeCount - 1} Teammate{targetSizeCount > 2 ? 's' : ''}):
                    </div>

                    {Array.from({ length: targetSizeCount - 1 }).map((_, idx) => {
                      const tm = teammates[idx];
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-navy-darker/80 border border-teal/25 space-y-3"
                        >
                          <div className="font-heading font-bold text-xs text-gold uppercase flex items-center justify-between">
                            <span>MEMBER 0{idx + 2} DETAILS</span>
                            <span className="text-[10px] text-slate-muted font-mono">REQUIRED</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <input
                                type="text"
                                placeholder={`Member 0${idx + 2} Full Name *`}
                                value={tm.name}
                                onChange={(e) => updateTeammate(idx, 'name', e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-navy-surface border border-teal/20 text-white text-xs font-sans focus:border-gold focus:outline-none"
                              />
                              {errors[`tm_${idx}_name`] && (
                                <p className="text-[10px] text-rose-400 mt-1">
                                  {errors[`tm_${idx}_name`]}
                                </p>
                              )}
                            </div>

                            <div>
                              <input
                                type="email"
                                placeholder={`Member 0${idx + 2} Email *`}
                                value={tm.email}
                                onChange={(e) => updateTeammate(idx, 'email', e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-navy-surface border border-teal/20 text-white text-xs font-sans focus:border-gold focus:outline-none"
                              />
                              {errors[`tm_${idx}_email`] && (
                                <p className="text-[10px] text-rose-400 mt-1">
                                  {errors[`tm_${idx}_email`]}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <input
                                type="text"
                                placeholder={`Member 0${idx + 2} Role (e.g. Backend)`}
                                value={tm.role}
                                onChange={(e) => updateTeammate(idx, 'role', e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-navy-surface border border-teal/20 text-white text-xs font-sans focus:border-gold focus:outline-none"
                              />
                            </div>

                            <div>
                              <div className="relative">
                                <LinkedinIcon className="w-3.5 h-3.5 text-gold absolute left-3 top-3" />
                                <input
                                  type="url"
                                  placeholder={`Member 0${idx + 2} LinkedIn Profile URL *`}
                                  value={tm.linkedinUrl}
                                  onChange={(e) => updateTeammate(idx, 'linkedinUrl', e.target.value)}
                                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-surface border border-gold/30 text-white text-xs font-sans focus:border-gold focus:outline-none"
                                />
                              </div>
                              {errors[`tm_${idx}_linkedin`] && (
                                <p className="text-[10px] text-rose-400 mt-1">
                                  {errors[`tm_${idx}_linkedin`]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
          </div>
        )}

        {/* STEP 3: CHALLENGE & ABSTRACT GDRIVE LINK (.DOCX ONLY) */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-teal font-heading font-bold text-sm tracking-wider uppercase">
              <Compass className="w-4 h-4" />
              <span>PROBLEM STATEMENT & ABSTRACT SUBMISSION (.DOCX)</span>
            </div>

            <div>
              <label className="block text-xs font-mono text-gold mb-1.5 uppercase font-bold">
                Select Official Problem Statement *
              </label>
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy-darker border border-gold/50 focus:border-gold focus:outline-none text-white text-sm font-sans font-semibold cursor-pointer mb-3"
              >
                {problemStatements.map((ps) => (
                  <option key={ps.id} value={ps.code} className="bg-navy-darker text-white">
                    {ps.code}: {ps.title} ({ps.category})
                  </option>
                ))}
              </select>

              {/* Show selected PS details summary box */}
              {(() => {
                const activePs = problemStatements.find((ps) => ps.code === selectedChallenge) || problemStatements[0];
                return (
                  <div className="p-3.5 rounded-xl bg-navy-surface border border-teal/30 text-xs font-sans space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-gold">{activePs.code}</span>
                      <span className="font-mono text-[10px] text-teal-light uppercase px-2 py-0.5 rounded bg-teal/10 border border-teal/20">
                        {activePs.category}
                      </span>
                    </div>
                    <p className="font-bold text-white text-sm">{activePs.title}</p>
                    <p className="text-slate-muted text-xs line-clamp-2">{activePs.tagline}</p>
                  </div>
                );
              })()}
            </div>

            <div>
              <label className="block text-xs font-mono text-lightgray/80 mb-1.5 uppercase">
                Proposed Project Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Autonomous Neural Diagnostic Synthesis Engine"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy-darker/90 border border-teal/30 focus:border-gold focus:outline-none text-white text-sm font-sans"
              />
            </div>

            {/* ABSTRACT GDRIVE LINK (.DOCX ONLY) MANDATORY FIELD */}
            <div className="p-5 rounded-2xl bg-navy-darker/95 border-2 border-gold/60 space-y-3">
              <div className="flex items-center gap-2 text-gold font-heading font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4 text-gold" />
                <span>ABSTRACT GOOGLE DRIVE LINK (.DOCX FORMAT ONLY) *</span>
              </div>

              <div className="relative">
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/... or https://docs.google.com/..."
                  value={abstractUrl}
                  onChange={(e) => setAbstractUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-navy-surface border border-gold/50 focus:border-gold focus:outline-none text-white text-sm font-sans placeholder-slate-muted"
                />
              </div>

              {errors.abstractUrl && (
                <p className="text-xs text-rose-400 font-mono">{errors.abstractUrl}</p>
              )}

              <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-[11px] font-sans text-lightgray space-y-1">
                <div className="font-bold text-gold uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>CRITICAL ABSTRACT SUBMISSION REQUIREMENTS:</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-muted">
                  <li>The abstract must be formatted strictly as a <strong className="text-white">.docx file</strong>.</li>
                  <li>Upload the .docx document to your Google Drive and set sharing access to <strong className="text-white">&ldquo;Anyone with the link can view&rdquo;</strong>.</li>
                  <li>Our technical jury will evaluate the abstract to shortlist teams for the physical 36-hour event (Oct 24–26).</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION & REVIEW */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-gold font-heading font-bold text-sm tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>REVIEW TELEMETRY & SUBMIT ABSTRACT</span>
            </div>

            <div className="p-5 rounded-2xl bg-navy-darker/90 border border-teal/30 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">LEADER:</span>
                <span className="text-white font-bold">{personal.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">LEADER LINKEDIN:</span>
                <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="text-teal hover:underline truncate max-w-[220px]">
                  {personal.linkedinUrl}
                </a>
              </div>
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">SQUAD NAME & SIZE:</span>
                <span className="text-white font-bold">
                  {createTeamData.teamName} ({createTeamData.teamSize} Members)
                </span>
              </div>
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">PROBLEM TRACK:</span>
                <span className="text-teal font-bold uppercase">{selectedChallenge}</span>
              </div>
              <div className="flex justify-between border-b border-teal/15 pb-2">
                <span className="text-slate-muted">ABSTRACT GDRIVE (.DOCX):</span>
                <a href={abstractUrl} target="_blank" rel="noreferrer" className="text-gold hover:underline truncate max-w-[220px]">
                  {abstractUrl}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-surface border border-teal/20 text-xs text-lightgray flex items-start gap-3 font-sans">
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <span>
                By submitting this abstract, I confirm that all team members' LinkedIn profiles are accurate, the abstract document is in .docx format inside the provided Google Drive link, and our squad is ready for jury evaluation and shortlisting for the 36-hour physical event (Oct 24–26).
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
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className={`px-8 py-3.5 rounded-xl font-heading text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-2 ${
                isSubmitting
                  ? 'bg-gold/60 text-navy cursor-wait opacity-80'
                  : 'bg-gold hover:bg-gold-light text-navy shadow-glow-gold hover:scale-[1.02] cursor-pointer'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>{isSubmitting ? 'SAVING TO MONGODB...' : 'SUBMIT ABSTRACT FOR SHORTLISTING'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
