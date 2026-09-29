import React, { useState } from 'react';
import {
  Brain,
  CreditCard,
  HeartPulse,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle,
  Layers,
  Terminal,
} from 'lucide-react';
import { sounds } from '../utils/sound';

export interface ChallengeTrack {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  problemStatements: string[];
  recommendedTech: string[];
  prize: string;
}

export const challengeTracks: ChallengeTrack[] = [
  {
    id: 'ai-ml',
    title: 'AI & MACHINE LEARNING',
    subtitle: 'Build intelligent solutions.',
    description:
      'Architect multimodal generative models, autonomous agent frameworks, computer vision pipelines, or neuro-symbolic reasoning to automate complex problem-solving.',
    icon: Brain,
    tags: ['Generative AI', 'Agentic Workflows', 'Computer Vision', 'LLMs'],
    problemStatements: [
      'Autonomous multi-agent research synthesis with real-time fact verification.',
      'Edge-deployed computer vision for surgical precision or robotics telemetry.',
      'Cross-lingual neural translation for low-resource dialect communities.',
    ],
    recommendedTech: ['PyTorch', 'Transformers', 'LangChain', 'FastAPI', 'ONNX'],
    prize: '₹35,000 Track Pool',
  },
  {
    id: 'fintech',
    title: 'FINTECH',
    subtitle: 'Redefine financial experiences.',
    description:
      'Pioneer decentralized verifiable ledger systems, real-time algorithmic fraud detection, micro-investment tools, and next-gen biometric payment rails.',
    icon: CreditCard,
    tags: ['Algorithmic Trading', 'Fraud Prevention', 'DeFi / Web3', 'Zero Knowledge'],
    problemStatements: [
      'Sub-millisecond fraud pattern detection across high-velocity transactional pipelines.',
      'Decentralized identity & credit scoring without invasive personal data disclosure.',
      'AI financial co-pilot for non-traditional wage earners and students.',
    ],
    recommendedTech: ['Solidity', 'Go', 'Kafka', 'Rust', 'GraphQL'],
    prize: '₹35,000 Track Pool',
  },
  {
    id: 'healthcare',
    title: 'HEALTHCARE',
    subtitle: 'Technology for better lives.',
    description:
      'Engineer predictive clinical diagnostics, wearable physiological monitoring, tele-health bridges, and genomics intelligence empowering patient outcomes.',
    icon: HeartPulse,
    tags: ['Digital Therapeutics', 'Remote Diagnostics', 'Bioinformatics', 'IoMT'],
    problemStatements: [
      'Non-invasive early anomaly detection in cardiac and pulmonary audio signals.',
      'Privacy-preserving federated machine learning for multi-hospital diagnostic records.',
      'Emergency response dispatcher optimization utilizing real-time urban traffic mesh.',
    ],
    recommendedTech: ['TensorFlow.js', 'WebRTC', 'HL7/FHIR APIs', 'React Native'],
    prize: '₹35,000 Track Pool',
  },
  {
    id: 'smart-cities',
    title: 'SMART CITIES',
    subtitle: 'Build the future of urban living.',
    description:
      'Create smart urban mobility, clean energy distribution grids, intelligent waste management networks, and climate-resilient municipal infrastructure.',
    icon: Building2,
    tags: ['IoT Sensor Mesh', 'Clean Energy', 'Urban Mobility', 'Digital Twins'],
    problemStatements: [
      'Adaptive traffic grid signaling using decentralized municipal camera feeds.',
      'Peer-to-peer neighborhood renewable solar microgrid distribution platform.',
      'Predictive municipal water and sewage leak isolation with ultrasonic sensors.',
    ],
    recommendedTech: ['MQTT', 'Node-RED', 'Three.js Digital Twins', 'GIS / MapLibre'],
    prize: '₹35,000 Track Pool',
  },
  {
    id: 'cybersecurity',
    title: 'CYBERSECURITY',
    subtitle: "Secure tomorrow's digital world.",
    description:
      'Fortify quantum-resistant cryptographic protocols, zero-trust cloud architectures, autonomous threat hunting, and memory-safe enterprise systems.',
    icon: ShieldCheck,
    tags: ['Zero Trust', 'Quantum Resistance', 'Threat Hunting', 'DevSecOps'],
    problemStatements: [
      'Real-time behavioral intrusion detection on cloud container clusters.',
      'Automated smart contract vulnerability remediation and formal verification.',
      'Hardware-backed cryptographic identity for remote IoT infrastructure.',
    ],
    recommendedTech: ['eBPF', 'Rust', 'Wasm Security', 'Wireshark APIs', 'K8s'],
    prize: '₹35,000 Track Pool',
  },
  {
    id: 'open-innovation',
    title: 'OPEN INNOVATION',
    subtitle: 'Go beyond the obvious.',
    description:
      'Unleash untamed creativity. Combine disparate disciplines—quantum computing, space-tech, augmented reality, neurotechnology, or ed-tech to create unprecedented breakthroughs.',
    icon: Sparkles,
    tags: ['Space-Tech', 'Neurotech', 'Spatial Computing', 'Wildcard'],
    problemStatements: [
      'Novel educational spatial simulations for complex aerospace or microscopic concepts.',
      'Distributed satellite telemetry monitoring and space debris collision avoidance.',
      'Direct brain-computer interface (BCI) gesture controllers for accessibility.',
    ],
    recommendedTech: ['WebXR', 'Three.js', 'Rust', 'WebAssembly', 'OpenCV'],
    prize: '₹35,000 Track Pool',
  },
];

interface ChallengesSectionProps {
  onSelectTrackForRegistration: (trackId: string) => void;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({
  onSelectTrackForRegistration,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<ChallengeTrack | null>(null);

  const handleOpenModal = (track: ChallengeTrack) => {
    sounds.playClick();
    setSelectedTrack(track);
  };

  const handleCloseModal = () => {
    setSelectedTrack(null);
  };

  return (
    <section id="challenges" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-4 border border-teal/40">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="font-heading font-semibold text-xs tracking-[0.25em] text-teal-light uppercase">
              FRONTIER EXPLORATION TRACKS
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight mb-6">
            CHOOSE YOUR <span className="text-holo">FRONTIER</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-muted leading-relaxed font-sans">
            Select one of 6 planetary research domains or forge your own boundary-breaking deep tech solution. Tackle real challenges with world-class mentorship in the asteroid field.
          </p>
        </div>

        {/* 6 Frontier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challengeTracks.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.id}
                onMouseEnter={() => sounds.playHover()}
                className="group relative rounded-2xl glass-panel-elevated p-8 flex flex-col justify-between border border-teal/20 hover:border-gold/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-hover overflow-hidden"
              >
                {/* Background holographic shimmer gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-royal/10 via-transparent to-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar with Icon & Track Pool */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-navy-surface border border-teal/30 group-hover:border-gold/60 flex items-center justify-center text-teal group-hover:text-gold transition-colors shadow-glow-teal group-hover:shadow-glow-gold">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-xs text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                      {track.prize}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wide mb-2 group-hover:text-gold-light transition-colors relative z-10">
                    {track.title}
                  </h3>

                  <p className="font-heading font-semibold text-xs tracking-wider text-teal-light mb-4 relative z-10">
                    {track.subtitle}
                  </p>

                  <p className="text-sm text-slate-muted font-sans leading-relaxed mb-6 relative z-10">
                    {track.description}
                  </p>
                </div>

                <div className="relative z-10">
                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-navy-surface border border-teal/15 text-lightgray/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Explore Button */}
                  <button
                    onClick={() => handleOpenModal(track)}
                    className="w-full py-3 rounded-xl font-heading text-xs font-bold tracking-[0.2em] uppercase bg-navy-surface/80 hover:bg-gold hover:text-navy text-teal-light hover:border-gold border border-teal/40 transition-all duration-250 flex items-center justify-center gap-2 group-hover:shadow-glow-gold cursor-pointer"
                  >
                    <span>EXPLORE FRONTIER</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal for Selected Challenge Frontier */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-darker/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel-elevated border border-gold/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-2 rounded-xl bg-navy-surface border border-teal/30 text-slate-muted hover:text-white hover:border-teal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-navy-surface border border-gold/50 flex items-center justify-center text-gold shadow-glow-gold">
                <selectedTrack.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="font-mono text-xs text-gold uppercase tracking-widest">
                  TRACK SPECIFICATIONS • {selectedTrack.prize}
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {selectedTrack.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-lightgray/90 leading-relaxed mb-6 font-sans">
              {selectedTrack.description}
            </p>

            {/* Problem Statements */}
            <div className="mb-6">
              <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>SUGGESTED PROBLEM STATEMENTS</span>
              </div>
              <div className="space-y-2.5">
                {selectedTrack.problemStatements.map((stmt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-navy-surface/80 border border-teal/20 text-xs sm:text-sm text-lightgray flex items-start gap-3"
                  >
                    <span className="font-mono text-xs font-bold text-gold shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{stmt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Tech Stack */}
            <div className="mb-8">
              <div className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-teal mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>RECOMMENDED TOOLS & FRAMEWORKS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTrack.recommendedTech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-navy-darker border border-teal/30 text-xs font-mono text-teal-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-teal/20">
              <button
                onClick={() => {
                  sounds.playClick();
                  const trackId = selectedTrack.id;
                  handleCloseModal();
                  onSelectTrackForRegistration(trackId);
                }}
                className="flex-1 py-3.5 rounded-xl font-heading text-xs font-bold tracking-[0.2em] uppercase bg-gold hover:bg-gold-light text-navy shadow-glow-gold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>SELECT THIS TRACK FOR REGISTRATION</span>
              </button>

              <button
                onClick={handleCloseModal}
                className="px-6 py-3.5 rounded-xl font-heading text-xs font-semibold tracking-wider uppercase bg-navy-surface border border-teal/30 text-slate-muted hover:text-white"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
