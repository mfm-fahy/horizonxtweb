import React from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Sparkles,
} from 'lucide-react';
import type { TeamData } from './RegistrationModal';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

interface TeamDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamData;
  onUpdateTeam?: (updatedTeam: TeamData) => void;
  onShowToast?: (message: string) => void;
}

export const TeamDashboardModal: React.FC<TeamDashboardProps> = ({
  isOpen,
  onClose,
  team,
}) => {
  if (!isOpen) return null;

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-teal/20 pb-6 mb-8 pr-12 sm:pr-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>REGISTRATION CONFIRMATION GRID</span>
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

            {/* Registration Status Badge */}
            <div className="px-3.5 py-2 rounded-xl bg-teal/10 border border-teal text-teal-light font-bold flex items-center gap-1.5 shadow-glow-teal">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{team.registrationStatus}</span>
            </div>
          </div>
        </div>

        {/* Prominent Notification Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-teal/20 via-navy-surface to-gold/20 border border-gold/50 shadow-glow-gold space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-gold shrink-0" />
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white uppercase tracking-tight">
              REGISTRATION & ABSTRACT SUBMITTED SUCCESSFULLY!
            </h3>
          </div>
          <p className="text-sm font-sans text-lightgray leading-relaxed">
            Thank you for registering your team for <strong className="text-white font-bold">HorizonXT 2026</strong>! Your abstract has been received and is currently under review by our technical jury. <strong className="text-gold font-bold">You will be notified via your registered Phone Number and Email address</strong> regarding abstract shortlisting results, official communications, and next steps for the 36-hour physical hackathon on October 24–26, 2026.
          </p>
        </div>

        {/* Two-Column Grid: Squad Roster + Challenge & Abstract Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Squad Members List (Max 4 Members) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>REGISTERED SQUAD ROSTER ({team.members.length} / 4 MEMBERS)</span>
              </span>
            </div>

            <div className="space-y-3">
              {team.members.map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="p-4 rounded-2xl bg-navy-darker/80 border border-teal/20 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal/15 pb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-navy-surface border border-teal/30 flex items-center justify-center font-heading font-extrabold text-xs text-gold">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                          <span>{member.name}</span>
                          {member.isLeader && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/20 text-gold border border-gold/40 font-bold uppercase">
                              TEAM LEADER
                            </span>
                          )}
                        </h4>
                        <p className="font-heading text-xs text-teal-light">{member.role}</p>
                      </div>
                    </div>

                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-gold hover:underline bg-gold/10 px-2.5 py-1 rounded-lg border border-gold/30"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-slate-muted">
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-teal shrink-0" />
                      <span className="text-lightgray truncate">{member.email}</span>
                    </div>

                    {member.phone && (
                      <div className="flex items-center gap-2 truncate">
                        <Phone className="w-3.5 h-3.5 text-teal shrink-0" />
                        <span className="text-lightgray font-bold">{member.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Challenge Frontier & Abstract Link */}
          <div className="lg:col-span-5 space-y-6">
            {/* Selected Challenge Card */}
            <div className="p-6 rounded-2xl bg-navy-darker/90 border border-teal/30 space-y-4">
              <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal block">
                ASSIGNED PROBLEM STATEMENT
              </span>

              <div>
                <span className="font-mono text-xs px-3 py-1 rounded bg-gold/20 text-gold border border-gold/40 font-bold uppercase inline-block mb-2">
                  {team.selectedChallenge}
                </span>
                <h4 className="font-heading font-extrabold text-base text-white uppercase">
                  {team.projectTitle}
                </h4>
              </div>

              {/* Abstract Google Drive Link Badge */}
              <div className="pt-3 border-t border-teal/15">
                <span className="text-xs font-mono text-gold font-bold block mb-1.5 uppercase flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-gold" />
                  <span>ABSTRACT GDRIVE (.DOCX FORMAT):</span>
                </span>
                {team.abstractUrl ? (
                  <a
                    href={team.abstractUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-teal hover:underline break-all block bg-navy-surface p-3 rounded-xl border border-teal/30"
                  >
                    {team.abstractUrl}
                  </a>
                ) : (
                  <span className="text-xs text-slate-muted italic">No abstract GDrive URL submitted yet.</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-surface/80 border border-teal/20 text-xs font-sans text-slate-muted leading-relaxed">
                • Evaluation Criteria: Abstract content, technical feasibility, innovation, and problem statement alignment. <br />
                • Shortlisted squads will receive official invitations via email and phone/WhatsApp.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-6 mt-6 border-t border-teal/20">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-heading text-xs font-bold tracking-wider uppercase bg-gold hover:bg-gold-light text-navy shadow-glow-gold cursor-pointer"
          >
            CLOSE CONFIRMATION GRID
          </button>
        </div>
      </div>
    </div>
  );
};
