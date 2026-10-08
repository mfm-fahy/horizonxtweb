import { useState } from 'react';
import { ChevronDown, Sparkles, Search } from 'lucide-react';
import { sounds } from '../utils/sound';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'Is registration free? What is the participation fee?',
      a: 'Abstract submission is 100% FREE for all teams! For SRMIST / SRM students, participation in the physical event is 100% FREE. For teams from other colleges, each team member pays ₹500 ONLY AFTER their abstract is shortlisted by the technical jury. No upfront payment is required when registering.',
    },
    {
      q: 'How will shortlisted teams be notified?',
      a: 'All shortlisted teams will receive an official confirmation email containing detailed event instructions, schedule, and payment link (for non-SRM teams).',
    },
    {
      q: 'Do teams work on the same problem statement at the hackathon?',
      a: 'YES! Shortlisted teams will build their prototype on the exact SAME problem statement (selected from PS1 to PS26) that they submitted their abstract for.',
    },
    {
      q: 'Who can I contact for queries or support?',
      a: 'You can reach out to our official HorizonXT Helpdesk coordinators directly via phone/WhatsApp: Faheem (+91 9943949439), Rajha (+91 8883877748), or Dr. Joseph Sagaya Kennedy (+91 8870594450).',
    },
    {
      q: 'Who can participate & what is the team size limit?',
      a: 'HorizonXT is open to all undergraduate, postgraduate, and doctoral students worldwide. Squads can consist of 1 up to a maximum of 4 members. Every team member MUST provide their valid LinkedIn profile URL during registration.',
    },
    {
      q: 'How do we submit our project abstract?',
      a: 'During registration, select an official problem statement (PS1 to PS26), upload your abstract in .docx format ONLY to Google Drive (set to "Anyone with the link can view"), and paste the Google Drive link into the registration form.',
    },
    {
      q: 'What should shortlisted teams bring to the event?',
      a: 'Bring your laptop, chargers, extension cords, personal hardware components, valid college student ID card, and enthusiasm! Food, accommodation/rest pods, and high-speed Wi-Fi will be provided.',
    },
    {
      q: 'What technologies can we use during the 36-hour hackathon?',
      a: 'Any open-source language, framework, API, or hardware platform you prefer! Whether you build in React, Python, Rust, Go, Flutter, PyTorch, Solidity, or hardware microcontrollers like Arduino/Raspberry Pi—you have full autonomy.',
    },
    {
      q: 'What format must the abstract be in?',
      a: 'The abstract MUST be in Microsoft Word (.docx) format uploaded inside your Google Drive link. PDF, text, or image files will not be accepted.',
    },
    {
      q: 'How does judging work on-site?',
      a: 'Shortlisted teams building during the 36-hour sprint undergo evaluation based on Innovation (25%), Technical Implementation (25%), Real-World Impact (20%), User Experience (15%), and Scalability (15%). Finalists present on the Grand Stage on October 26.',
    },
    {
      q: 'What should shortlisted teams bring to the event?',
      a: 'Bring your laptop, chargers, extension cords, personal hardware components, valid college student ID card, toiletries, and creative energy! Overnight rest pods and secure storage are provided on October 24–26.',
    },
    {
      q: 'Will certificates be provided?',
      a: 'Yes! Every verified cadet participating in the 36-hour sprint and submitting their final project will receive an officially accredited HorizonXT Certificate of Excellence and participation badges.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    sounds.playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-left sm:text-center max-w-4xl mx-auto mb-12 relative group">
          {/* Massive soft glowing dark aura behind the text to separate it from the 3D planet without looking like a card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[180%] bg-[radial-gradient(ellipse_at_center,_rgba(10,29,59,0.95)_0%,_rgba(10,29,59,0.7)_45%,_transparent_75%)] blur-xl pointer-events-none -z-10" />
          
          <div className="relative z-10 px-2 sm:px-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-surface border border-teal/30 mb-4 shadow-glow-teal">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal uppercase">
                KNOWLEDGE REPOSITORY
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-tight mb-4 transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] cursor-default">
              FREQUENTLY ASKED <span className="text-holo">QUESTIONS</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/75 font-normal leading-relaxed font-sans max-w-3xl mx-auto text-left sm:text-center mb-8 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(165,243,252,0.8)] cursor-default">
              Got questions regarding the mission? Review our telemetry guides below.
            </p>
          {/* Interactive Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-muted absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search questions (e.g. team size, free, certificate)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-navy-surface/80 border border-teal/30 text-white placeholder-slate-muted text-xs sm:text-sm focus:border-gold focus:outline-none backdrop-blur-md shadow-inner"
            />
          </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'glass-panel-elevated border-teal/50 shadow-glow-teal'
                    : 'bg-navy-darker/60 border-teal/15 hover:border-teal/35'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gold font-bold">
                      0{index + 1}.
                    </span>
                    <span className="font-heading font-bold text-sm sm:text-base text-white tracking-wide">
                      {faq.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-xl bg-navy-surface border border-teal/30 flex items-center justify-center text-teal shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold border-gold/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-muted font-sans leading-relaxed border-t border-teal/10 animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-slate-muted font-mono text-xs">
              No telemetry matches found for &ldquo;{searchQuery}&rdquo;. Try another term or contact organizers.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
