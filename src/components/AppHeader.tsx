'use client';

interface AppHeaderProps {
  step: number;
  totalSteps: number;
  onBack?: () => void;
}

const stepLabels = ['בחירת שופטים', 'סוג עתירה', 'מאפייני תיק', 'תוצאה'];

export default function AppHeader({ step, totalSteps, onBack }: AppHeaderProps) {
  if (step === 0) return null;

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
        {onBack && step < totalSteps && (
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
            aria-label="חזור"
          >
            <span>→</span>
            <span className="hidden sm:inline">חזור</span>
          </button>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">
              שלב {step} מתוך {totalSteps - 1}: {stepLabels[step - 1]}
            </span>
            <span className="text-xs font-bold text-blue-400">בג״צומטר</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all duration-500"
              style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
