import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  UserPlus,
  Compass,
  UploadCloud,
  Clock,
  ShieldCheck,
  Globe,
  Code2,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TeamData } from './RegistrationModal';
import { sounds } from '../utils/sound';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

interface TeamDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamData;
  onUpdateTeam: (updatedTeam: TeamData) => void;
  onShowToast: (message: string) => void;
}

export const TeamDashboardModal: React.FC<TeamDashboardProps> = ({
  isOpen,
  onClose,
  team,
  onUpdateTeam,
  onShowToast,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isChangeTrackOpen, setIsChangeTrackOpen] = useState(false);

  // Project Submission Form State
  const [submission, setSubmission] = useState({
    title: team.projectTitle || '',
    repoUrl: team.submissionDetails?.repoUrl || '',
    demoUrl: team.submissionDetails?.demoUrl || '',
    description: team.submissionDetails?.description || '',
    architectureFile: null as File | null,
  });

  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const handleCopyInvite = () => {
    sounds.playClick();
    const textToCopy = `Join my HorizonXT Hackathon Squad "${team.teamName}"! Team ID: ${team.teamId} | Invite Code: ${team.inviteCode} | Register at: https://horizonxt.io`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedCode(true);
    onShowToast(`Invite Code [${team.inviteCode}] copied to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleApproveMember = (memberId: string) => {
    sounds.playSuccess();
    const updatedMembers = team.members.map((m) =>
      m.id === memberId ? { ...m, status: 'active' as const } : m
    );
    onUpdateTeam({ ...team, members: updatedMembers });
    onShowToast('Squad candidate approved!');
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission.title.trim() || !submission.repoUrl.trim()) {
      setSubmitError('Project title and GitHub repository URL are required.');
      return;
    }

    sounds.playSuccess();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00A7B5', '#F5A623', '#1F3FAE', '#FFFFFF'],
      });
    } catch {
      // fallback
    }

    const updatedTeam: TeamData = {
      ...team,
      submissionStatus: 'SUBMITTED',
      projectTitle: submission.title,
      submissionDetails: {
        repoUrl: submission.repoUrl,
        demoUrl: submission.demoUrl || 'https://demo.horizonxt.io',
        description: submission.description,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    };

    onUpdateTeam(updatedTeam);
    setIsSubmitModalOpen(false);
    onShowToast('Project submitted successfully to HorizonXT Evaluation Grid!');
  };

  const availableChallenges = [
    { id: 'ai-ml', name: 'AI & Machine Learning' },
    { id: 'fintech', name: 'FinTech & DeFi' },
    { id: 'healthcare', name: 'Healthcare & BioTech' },
    { id: 'smart-cities', name: 'Smart Cities & CleanTech' },
    { id: 'cybersecurity', name: 'Cybersecurity & Zero Trust' },
    { id: 'open-innovation', name: 'Open Innovation & Wildcard' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-darker/50 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl glass-panel-elevated border border-teal/40 p-6 sm:p-10 my-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dashboard"
          className="absolute top-6 right-6 p-2 rounded-xl bg-navy-surface border border-teal/30 text-slate-muted hover:text-white hover:border-teal transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-teal/20 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
              <span className="font-mono text-xs text-teal uppercase tracking-widest">
                SPACE STATION MISSION COMMAND • SYS 2026
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-wide uppercase">
              {team.teamName}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {/* Team ID Badge */}
            <div className="px-3.5 py-2 rounded-xl bg-navy-darker border border-teal/30 flex items-center gap-2">
              <span className="text-slate-muted">TEAM ID:</span>
              <span className="text-white font-bold">{team.teamId}</span>
            </div>

            {/* Invite Code Badge with Copy button */}
            <button
              onClick={handleCopyInvite}
              className="px-3.5 py-2 rounded-xl bg-navy-darker border border-gold/40 text-gold flex items-center gap-2 hover:bg-gold/10 transition-colors cursor-pointer"
            >
              <span className="text-slate-muted">INVITE CODE:</span>
              <span className="font-bold">{team.inviteCode}</span>
              {copiedCode ? <Check className="w-3.5 h-3.5 text-teal" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {/* Registration Status */}
            <div className="px-3.5 py-2 rounded-xl bg-teal/10 border border-teal text-teal-light font-bold flex items-center gap-1.5 shadow-glow-teal">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{team.registrationStatus}</span>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-navy-surface/80 border border-teal/25 mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Invite Member Button */}
            <button
              onClick={handleCopyInvite}
              className="px-4 py-2.5 rounded-xl font-heading text-xs font-bold tracking-wider uppercase bg-navy-darker hover:bg-gold/20 text-gold border border-gold/40 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ INVITE MEMBER</span>
            </button>

            {/* Change Challenge Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsChangeTrackOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl font-heading text-xs font-semibold tracking-wider uppercase bg-navy-darker hover:bg-royal/30 text-lightgray border border-teal/30 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-teal" />
              <span>CHANGE CHALLENGE</span>
            </button>
          </div>

          <div>
            {/* Submit Project Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsSubmitModalOpen(true);
              }}
              className={`px-6 py-2.5 rounded-xl font-heading text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                team.submissionStatus === 'SUBMITTED'
                  ? 'bg-teal text-navy shadow-glow-teal'
                  : 'bg-gold hover:bg-gold-light text-navy shadow-glow-gold'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>
                {team.submissionStatus === 'SUBMITTED' ? 'UPDATE SUBMISSION' : 'SUBMIT PROJECT'}
              </span>
            </button>
          </div>
        </div>

        {/* Two-Column Space Station Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Squad Members Holographic Profile Cards (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal">
                SQUAD ROSTER ({team.members.length} / 5 CADETS)
              </span>
              <span className="font-mono text-xs text-slate-muted">ORBIT STATUS: SYNCHRONIZED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.members.map((member) => (
                <div
                  key={member.id}
                  className="p-5 rounded-2xl bg-navy-darker/80 border border-teal/20 relative group hover:border-gold/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-navy-surface border border-teal/30 flex items-center justify-center font-heading font-extrabold text-sm text-gold">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          member.status === 'active'
                            ? 'bg-teal/15 text-teal border-teal/30'
                            : 'bg-gold/15 text-gold border-gold/30 animate-pulse'
                        }`}
                      >
                        {member.status === 'active' ? 'ACTIVE CADET' : 'INVITE PENDING'}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-base text-white truncate">
                      {member.name}
                    </h4>
                    <p className="font-heading text-xs text-teal-light mb-2 truncate">
                      {member.role}
                    </p>

                    {/* Member LinkedIn Link */}
                    {member.linkedinUrl && (
                      <div className="mb-3">
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-gold hover:underline bg-gold/10 px-2.5 py-1 rounded-lg border border-gold/30"
                        >
                          <LinkedinIcon className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span className="truncate max-w-[140px]">LinkedIn Profile</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {member.status === 'pending' && (
                    <button
                      onClick={() => handleApproveMember(member.id)}
                      className="w-full py-1.5 rounded-lg font-heading text-[10px] font-bold uppercase bg-teal/20 hover:bg-teal hover:text-navy text-teal border border-teal/40 transition-colors"
                    >
                      APPROVE CANDIDATE
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Challenge Frontier & Submission Telemetry (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Selected Challenge Card */}
            <div className="p-6 rounded-2xl bg-navy-darker/80 border border-teal/25 space-y-4">
              <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal block">
                ASSIGNED FRONTIER
              </span>

              <div>
                <h4 className="font-heading font-extrabold text-lg text-white uppercase">
                  {team.selectedChallenge}
                </h4>
                <p className="text-xs text-slate-muted font-sans mt-1">
                  Active trajectory. Abstract review in progress. Shortlisted teams called for Oct 24–26 physical event.
                </p>
              </div>

              <div className="pt-3 border-t border-teal/15">
                <span className="text-xs font-mono text-slate-muted block mb-1">
                  PROJECT TITLE:
                </span>
                <p className="text-xs font-heading font-semibold text-lightgray">
                  &ldquo;{team.projectTitle}&rdquo;
                </p>
              </div>

              {/* Abstract Google Drive Link Badge */}
              <div className="pt-3 border-t border-teal/15">
                <span className="text-xs font-mono text-gold font-bold block mb-1.5 uppercase flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-gold" />
                  <span>ABSTRACT GDRIVE (.DOCX):</span>
                </span>
                {team.abstractUrl ? (
                  <a
                    href={team.abstractUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-teal hover:underline break-all block bg-navy-surface p-2 rounded-lg border border-teal/30"
                  >
                    {team.abstractUrl}
                  </a>
                ) : (
                  <span className="text-xs text-slate-muted italic">No abstract GDrive URL submitted yet.</span>
                )}
              </div>
            </div>

            {/* Submission Status Card */}
            <div className="p-6 rounded-2xl bg-navy-darker/80 border border-gold/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-gold">
                  DEPLOYMENT STATUS
                </span>
                <span
                  className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    team.submissionStatus === 'SUBMITTED'
                      ? 'bg-teal/20 text-teal border border-teal/40'
                      : 'bg-gold/20 text-gold border border-gold/40'
                  }`}
                >
                  {team.submissionStatus}
                </span>
              </div>

              {team.submissionStatus === 'SUBMITTED' && team.submissionDetails ? (
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-muted">
                    <span>SUBMITTED AT:</span>
                    <span className="text-white">{team.submissionDetails.submittedAt}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-muted">
                    <span>GITHUB:</span>
                    <a
                      href={team.submissionDetails.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal hover:underline truncate max-w-[150px]"
                    >
                      {team.submissionDetails.repoUrl}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-slate-muted">
                    <span>LIVE DEMO:</span>
                    <a
                      href={team.submissionDetails.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold hover:underline truncate max-w-[150px]"
                    >
                      {team.submissionDetails.demoUrl}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 text-xs text-slate-muted">
                  <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>
                    Deadline: October 25, 11:00 AM. Ensure GitHub repo is public and demo link is functional.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Change Challenge Modal */}
        {isChangeTrackOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-navy-darker/50 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-2xl glass-panel-elevated border border-teal/40 p-6">
              <h3 className="font-heading font-extrabold text-xl text-white uppercase mb-4">
                SWITCH FRONTIER TRACK
              </h3>
              <div className="space-y-2 mb-6">
                {availableChallenges.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      sounds.playClick();
                      onUpdateTeam({ ...team, selectedChallenge: c.id });
                      setIsChangeTrackOpen(false);
                      onShowToast(`Frontier switched to ${c.name}`);
                    }}
                    className={`w-full p-3 rounded-xl text-left font-heading text-xs font-bold uppercase transition-all flex items-center justify-between border ${
                      team.selectedChallenge === c.id
                        ? 'bg-gold text-navy border-gold'
                        : 'bg-navy-surface text-lightgray border-teal/20 hover:border-teal'
                    }`}
                  >
                    <span>{c.name}</span>
                    {team.selectedChallenge === c.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsChangeTrackOpen(false)}
                className="w-full py-2.5 rounded-xl text-xs font-heading font-semibold uppercase text-slate-muted hover:text-white"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}

        {/* Project Submission Modal */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-navy-darker/50 backdrop-blur-md">
            <div className="relative w-full max-w-xl rounded-2xl glass-panel-elevated border border-gold/40 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-teal/20 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <UploadCloud className="w-6 h-6 text-gold" />
                  <h3 className="font-heading font-extrabold text-2xl text-white uppercase">
                    PROJECT SUBMISSION GRID
                  </h3>
                </div>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="p-1 rounded-lg text-slate-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-lightgray mb-1 uppercase">
                    Final Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={submission.title}
                    onChange={(e) => setSubmission({ ...submission, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-darker border border-teal/30 text-white text-sm focus:border-gold focus:outline-none"
                    placeholder="e.g. HorizonXT Quantum Ledger"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-lightgray mb-1 uppercase">
                    GitHub Repository URL (Public) *
                  </label>
                  <div className="relative">
                    <Code2 className="w-4 h-4 text-slate-muted absolute left-3.5 top-3" />
                    <input
                      type="url"
                      required
                      value={submission.repoUrl}
                      onChange={(e) => setSubmission({ ...submission, repoUrl: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-darker border border-teal/30 text-white text-sm focus:border-gold focus:outline-none"
                      placeholder="https://github.com/org/horizonxt-project"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-lightgray mb-1 uppercase">
                    Live Demo / Video Pitch URL
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-muted absolute left-3.5 top-3" />
                    <input
                      type="url"
                      value={submission.demoUrl}
                      onChange={(e) => setSubmission({ ...submission, demoUrl: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-darker border border-teal/30 text-white text-sm focus:border-gold focus:outline-none"
                      placeholder="https://my-app.vercel.app or YouTube link"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-lightgray mb-1 uppercase">
                    Architecture & Executive Summary
                  </label>
                  <textarea
                    rows={3}
                    value={submission.description}
                    onChange={(e) => setSubmission({ ...submission, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-darker border border-teal/30 text-white text-sm focus:border-gold focus:outline-none"
                    placeholder="Briefly describe what your squad engineered, key innovations, and technologies utilized..."
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-rose-400 font-mono">{submitError}</p>
                )}

                <div className="flex gap-3 pt-4 border-t border-teal/20">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-heading text-xs font-bold tracking-widest uppercase bg-gold hover:bg-gold-light text-navy shadow-glow-gold transition-all"
                  >
                    CONFIRM & SUBMIT ARTIFACT
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-5 py-3 rounded-xl text-xs font-heading font-semibold uppercase text-slate-muted hover:text-white"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
