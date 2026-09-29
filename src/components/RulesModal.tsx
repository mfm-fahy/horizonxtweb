import { X, CheckCircle2, Scale } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const rules = [
    {
      category: '1. SQUAD ARCHITECTURE & ELIGIBILITY',
      points: [
        'Teams must consist of 2 to 4 registered participants.',
        'All team members must be enrolled students in an accredited educational institution.',
        'Inter-college and multi-disciplinary teams are strongly encouraged.',
      ],
    },
    {
      category: '2. CODE FRESHNESS & INTEGRITY',
      points: [
        'All production code, datasets, wireframes, and models must be written within the official 36-hour sprint window.',
        'Open-source libraries, public packages, foundational AI models, and APIs are permitted provided they are disclosed in the submission repository.',
        'Pre-built or previously submitted projects will face instantaneous disqualification.',
      ],
    },
    {
      category: '3. INTELLECTUAL PROPERTY & OWNERSHIP',
      points: [
        'Squads retain 100% full intellectual property ownership of all code, designs, and artifacts engineered during HorizonX.',
        'Neither the organizers nor the sponsors claim any equity, licensing, or IP ownership over participant work.',
      ],
    },
    {
      category: '4. SUBMISSION TELEMETRY',
      points: [
        'Every squad must submit a public GitHub repository link with timestamped commit history.',
        'A working live deployment URL and an unlisted 2-minute video demonstration must be linked on the Team Dashboard before Oct 25, 11:00 AM.',
        'Commit history will be analyzed to verify team distribution and development during the hackathon.',
      ],
    },
    {
      category: '5. ETHICS & RESEARCH CONDUCT',
      points: [
        'HorizonX enforces a zero-tolerance policy against harassment, discrimination, or malicious attacks.',
        'Projects involving cybersecurity must adhere strictly to responsible disclosure principles and non-destructive testing.',
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
              OFFICIAL EVENT PROTOCOL
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
