import { useState } from 'react';
import { ChevronDown, Sparkles, Search } from 'lucide-react';
import { sounds } from '../utils/sound';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'Who can participate?',
      a: 'HorizonXT is open to all enrolled undergraduate, postgraduate, and doctoral students from colleges and universities globally. Developers, UI/UX designers, researchers, product thinkers, and domain enthusiasts of all skill levels are encouraged to apply.',
    },
    {
      q: 'What is the team size limit?',
      a: 'Squads can consist of 1 up to a maximum of 5 members. Every team member MUST provide their valid LinkedIn profile URL during registration. Interdisciplinary squads across colleges are warmly welcomed!',
    },
    {
      q: 'How do we submit our project abstract?',
      a: 'During registration, select a problem statement from our tracks, upload your abstract in .docx format ONLY to Google Drive (set to "Anyone with the link can view"), and paste the Google Drive link into the registration form.',
    },
    {
      q: 'When do registrations open and close?',
      a: 'Registrations officially open on October 5, 2026. Abstract submissions in .docx format via Google Drive will close on October 16, 2026. Our technical jury evaluates all submitted abstracts to shortlist teams for the physical 36-hour hackathon event on October 24–26.',
    },
    {
      q: 'Is the hackathon free?',
      a: 'Yes, 100% free! There is zero registration fee, zero abstract submission fee, and zero event participation fee. Food, beverages, midnight fuel, high-speed Wi-Fi, mentorship, and hacker kits are provided free of charge by our sponsors.',
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-surface border border-teal/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal uppercase">
              KNOWLEDGE REPOSITORY
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight mb-4">
            FREQUENTLY ASKED <span className="text-holo">QUESTIONS</span>
          </h2>

          <p className="text-sm sm:text-base text-white leading-relaxed font-sans mb-8">
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
