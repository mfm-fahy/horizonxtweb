import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING INNOVATION...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statuses = [
      'INITIALIZING PLANETARY TELEMETRY...',
      'CALIBRATING 3D ORBITAL TRAJECTORY...',
      'SYNTHESIZING DEEP-SPACE STELLAR FIELD...',
      'ALIGNING ASTEROID BELT SENSORS...',
      'HORIZONXT SPACE EXPLORATION READY.',
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 3;
        if (next >= 100) {
          clearInterval(timer);
          setStatusText(statuses[4]);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete();
            }, 650);
          }, 400);
          return 100;
        }

        const statusIdx = Math.min(
          Math.floor((next / 100) * (statuses.length - 1)),
          statuses.length - 2
        );
        setStatusText(statuses[statusIdx]);
        return next;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy px-6 transition-all duration-700 ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 167, 181, 0.15) 0%, rgba(31, 63, 174, 0.08) 40%, rgba(10, 29, 59, 1) 85%)',
        }}
      />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Center Cinematic Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Animated Orbit Rings around logo */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer glowing orbital ring */}
          <div className="absolute w-44 h-44 rounded-full border border-teal/30 animate-spin-slow" />
          <div className="absolute w-56 h-56 rounded-full border border-dashed border-gold/25 animate-spin-reverse" />
          
          {/* Pulsing satellite node on ring */}
          <div className="absolute w-44 h-44 animate-spin-slow">
            <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_12px_#F5A623] -top-1.5 left-1/2 -translate-x-1/2 absolute" />
          </div>

          <div className="p-4 rounded-3xl bg-navy-surface/80 border border-teal/30 shadow-glow-teal backdrop-blur-xl">
            <Logo size="hero" showTagline={false} animated={true} />
          </div>
        </div>

        {/* Brand Tagline */}
        <div className="font-heading font-bold text-xs tracking-[0.35em] text-teal-light mb-6 uppercase">
          RESEARCH • INNOVATION • IMPACT
        </div>

        {/* Status text */}
        <div className="font-mono text-sm tracking-widest text-slate-muted mb-4 uppercase h-6">
          {statusText}
        </div>

        {/* Glowing Progress Percentage Bar */}
        <div className="w-full max-w-xs relative mb-4">
          <div className="h-1.5 w-full bg-navy-surface rounded-full overflow-hidden border border-teal/20">
            <div
              className="h-full bg-gradient-to-r from-royal via-teal to-gold rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(0,167,181,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Percentage Number Display */}
        <div className="font-mono text-3xl font-extrabold text-gold tracking-tight glow-text-gold">
          {progress}<span className="text-sm font-semibold text-teal-light ml-1">%</span>
        </div>

        {/* Space Station Coordinates */}
        <div className="mt-8 font-mono text-[10px] tracking-widest text-slate-subtext/70 uppercase">
          STATION: HZX-ORBIT-36 • OCT 24–26 • SYS 2026.0
        </div>
      </div>
    </div>
  );
};
