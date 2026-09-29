import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl glass-panel-elevated border border-gold/50 shadow-glow-gold text-white text-xs sm:text-sm font-heading font-semibold">
        <Sparkles className="w-4 h-4 text-gold shrink-0 animate-spin-slow" />
        <span>{message}</span>
        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="ml-2 p-1 rounded-lg hover:bg-navy-surface text-slate-muted hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
