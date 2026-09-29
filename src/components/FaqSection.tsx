import { useState } from 'react';
import { ChevronDown, Sparkles, Search } from 'lucide-react';
import { sounds } from '../utils/sound';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'Who can participate?',
      a: 'HorizonX is open to all enrolled undergraduate, postgraduate, and doctoral students from colleges and universities globally. Developers, UI/UX designers, researchers, product thinkers, and domain enthusiasts of all skill levels are encouraged to apply.',
    },
    {
      q: 'What is the team size?',
      a: 'Squads can consist of 2 to 4 members. Interdisciplinary squads (e.g., frontend developer, backend engineer, AI/ML specialist, and UI/UX designer) are strongly recommended. Cross-college teams are completely welcomed!',
    },
    {
      q: 'Is the hackathon free?',
      a: 'Yes, 100% free! There is zero registration fee, zero participation fee, and zero submission fee. Food, beverages, midnight fuel, high-speed Wi-Fi, mentorship, and hacker kits are provided free of charge by our sponsors.',
    },
    {
      q: 'Can I participate individually?',
      a: 'While individual hackers can register, hackathons are collaborative orbital journeys! You can use our squad recruitment portal and Discord channel to find teammates with complementary skills before the event begins.',
    },
    {
      q: 'What technologies can we use?',
      a: 'Any open-source language, framework, API, or hardware platform you prefer! Whether you build in React, Python, Rust, Go, Flutter, PyTorch, Solidity, or hardware microcontrollers like Arduino/Raspberry Pi—you have full autonomy.',
    },
    {
      q: 'What should we build?',
      a: 'You can build web applications, mobile apps, decentralized protocols, machine learning agents, IoT hardware prototypes, or scientific analysis tools aligned with any of our 6 Frontier Tracks or Open Innovation.',
    },
    {
      q: 'Is there a registration deadline?',
      a: 'Registrations close on October 22, 2026 at 11:59 PM IST, or once our physical arena reaches capacity. Early applicants receive priority review and squad credential issuance.',
    },
    {
      q: 'How does judging work?',
      a: 'All projects undergo rigorous evaluation based on 5 parameters: Innovation (25%), Technical Implementation (25%), Real-World Impact (20%), User Experience (15%), and Scalability (15%). Preliminary reviews lead to the top 10 squads presenting on the Grand Finale stage.',
    },
    {
      q: 'What should we bring?',
      a: 'Bring your laptop, chargers, extension cords, personal hardware components, valid college student ID card, toiletries, and boundless creative energy! Overnight rest pods and secure storage are provided.',
    },
    {
      q: 'Will certificates be provided?',
      a: 'Yes! Every verified cadet who completes the 36-hour sprint and submits their project will receive an officially accredited, cryptographically verifiable HorizonX Certificate of Excellence and participation badges.',
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

          <p className="text-sm sm:text-base text-slate-muted leading-relaxed font-sans mb-8">
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
