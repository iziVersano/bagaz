'use client';

interface ProbabilityMeterProps {
  probability: number;
  outcome: 'accepted' | 'rejected';
}

export default function ProbabilityMeter({ probability, outcome }: ProbabilityMeterProps) {
  const displayProb = outcome === 'accepted' ? probability : 100 - probability;
  const acceptProb = outcome === 'accepted' ? probability : 100 - probability;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-400">
        <span>קבלה</span>
        <span>דחייה</span>
      </div>
      <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`absolute right-0 top-0 h-full rounded-full transition-all duration-1000 ${
            outcome === 'accepted' ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{ width: `${acceptProb}%` }}
        />
      </div>
      <div className="flex justify-between text-xs font-bold">
        <span className="text-green-400">{acceptProb}%</span>
        <span className="text-red-400">{100 - acceptProb}%</span>
      </div>
    </div>
  );
}
