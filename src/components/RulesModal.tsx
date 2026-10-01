import { X, CheckCircle2, Scale } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const rules = [
    {
      category: '1. SQUAD ARCHITECTURE & LINKEDIN REQUIREMENT',
      points: [
        'Teams must consist of 1 to a MAXIMUM of 5 registered participants.',
        'Every single team member MUST provide a valid, active LinkedIn Profile URL during registration.',
        'All team members must be enrolled students in an accredited educational institution.',
        'Inter-college and multi-disciplinary teams are strongly encouraged.',
      ],
    },
    {
      category: '2. ABSTRACT SUBMISSION (.DOCX FORMAT ONLY)',
      points: [
        'Teams must select one problem statement from the official tracks and submit a detailed abstract.',
        'The abstract MUST be provided as a Google Drive link containing a .docx format document ONLY.',
        'Google Drive link permission must be set to "Anyone with the link can view".',
        'Abstracts in PDF, TXT, images, or non-.docx formats will be automatically disqualified.',
      ],
    },
    {
      category: '3. REGISTRATION DATES, SHORTLISTING & EVENT',
      points: [
        'Registration officially opens on October 5, 2026.',
        'Abstract submission will close strictly on October 16, 2026.',
        'The physical 3-day hackathon event takes place on October 24, 25, and 26.',
        'The technical jury evaluates all submitted .docx abstracts against innovation, feasibility, and technical depth parameters to shortlist teams.',
      ],
    },
    {
      category: '4. 36-HOUR SPRINT & CODE INTEGRITY',
      points: [
        'All production code, datasets, models, and prototypes must be engineered within the official 36-hour on-site sprint window.',
        'Open-source libraries, public packages, and foundational AI models are permitted provided they are disclosed in the GitHub repository.',
        'Squads retain 100% full intellectual property ownership of all code and artifacts engineered during HorizonXT.',
      ],
    },
    {
      category: '5. FINAL SUBMISSION & DEMO',
      points: [
        'Every squad must submit a public GitHub repository link and working live demonstration before the 36-hour timer expires.',
        'Shortlisted squads will present a 5-minute live demonstration + 3-minute technical Q&A on the main stage on October 26.',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-darker/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel-elevated border border-teal/40 p-6 sm:p-10 my-auto shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close rules"
          className="absolute top-6 right-6 p-2 rounded-xl bg-navy-surface border border-teal/30 text-slate-muted hover:text-white hover:border-teal transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-teal/20 pb-5 mb-8">
          <div className="p-3 rounded-xl bg-navy-surface border border-gold/40 text-gold shadow-glow-gold">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-gold uppercase tracking-widest">
              OFFICIAL HACKATHON PROTOCOL
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
              RULES & REGULATIONS
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          {rules.map((section) => (
            <div key={section.category} className="p-5 rounded-2xl bg-navy-darker/80 border border-teal/20">
              <h4 className="font-heading font-bold text-sm text-teal tracking-wider uppercase mb-3">
                {section.category}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-lightgray font-sans">
                {section.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-teal/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-heading text-xs font-bold tracking-widest uppercase bg-gold hover:bg-gold-light text-navy shadow-glow-gold transition-all"
          >
            I UNDERSTAND & ACKNOWLEDGE
          </button>
        </div>
      </div>
    </div>
  );
};
