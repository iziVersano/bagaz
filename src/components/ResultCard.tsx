'use client';

import { SimulationResult, Judge, PetitionType } from '@/types';
import { petitionTypeLabels } from '@/data/petitionTypes';
import ProbabilityMeter from './ProbabilityMeter';
import Disclaimer from './Disclaimer';
import ShareActions from './ShareActions';

interface ResultCardProps {
  result: SimulationResult;
  selectedJudges: Judge[];
  petitionType: PetitionType;
  onReset: () => void;
}

export default function ResultCard({ result, selectedJudges, petitionType, onReset }: ResultCardProps) {
  const isAccepted = result.outcome === 'accepted';

  const shareText = `בג״צומטר — סימולציה
הרכב: ${selectedJudges.map((j) => j.name).join(', ')}
עתירה: ${petitionTypeLabels[petitionType]}
תוצאה: ${isAccepted ? 'העתירה התקבלה' : 'העתירה נדחתה'} (${result.voteRatio})
הסתברות משוערת: ${result.probability}%
---
זהו סימולטור סאטירי בלבד`;

  return (
    <div className="space-y-5" id="result-card">
      {/* Verdict Banner */}
      <div
        className={`rounded-2xl p-6 text-center border ${
          isAccepted
            ? 'bg-green-950/50 border-green-600/40'
            : 'bg-red-950/50 border-red-600/40'
        }`}
      >
        <div className="text-5xl mb-3">{isAccepted ? '✅' : '❌'}</div>
        <h2 className={`text-2xl font-black mb-1 ${isAccepted ? 'text-green-400' : 'text-red-400'}`}>
          {isAccepted ? 'העתירה התקבלה' : 'העתירה נדחתה'}
        </h2>
        <p className="text-gray-400 text-sm">תוצאה משוערת בסימולציה</p>
      </div>

      {/* Vote Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gray-900 border border-gray-800 p-4 text-center">
          <div className="text-3xl font-black text-green-400">{result.supportCount}</div>
          <div className="text-xs text-gray-500 mt-1">בעד</div>
        </div>
        <div className="rounded-xl bg-gray-900 border border-gray-800 p-4 text-center">
          <div className="text-3xl font-black text-white">{result.voteRatio}</div>
          <div className="text-xs text-gray-500 mt-1">יחס קולות</div>
        </div>
        <div className="rounded-xl bg-gray-900 border border-gray-800 p-4 text-center">
          <div className="text-3xl font-black text-red-400">{result.rejectCount}</div>
          <div className="text-xs text-gray-500 mt-1">נגד</div>
        </div>
      </div>

      {/* Probability Meter */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-4">
        <p className="text-sm text-gray-400 mb-3">אחוז הסתברות משוער</p>
        <div className="text-4xl font-black text-white mb-3">
          {result.probability}%
        </div>
        <ProbabilityMeter probability={result.probability} outcome={result.outcome} />
      </div>

      {/* Panel */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-4">
        <p className="text-xs text-gray-500 mb-2">הרכב השופטים</p>
        <div className="space-y-2">
          {selectedJudges.map((judge) => {
            const vote = result.judgeVotes.find((v) => v.judgeId === judge.id);
            return (
              <div key={judge.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{judge.name}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    vote?.vote === 'support'
                      ? 'bg-green-900/50 text-green-400'
                      : 'bg-red-900/50 text-red-400'
                  }`}
                >
                  {vote?.vote === 'support' ? 'בעד' : 'נגד'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Petition Type */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-4">
        <p className="text-xs text-gray-500 mb-1">סוג העתירה</p>
        <p className="text-white font-medium">{petitionTypeLabels[petitionType]}</p>
      </div>

      {/* Reasoning */}
      <div className="rounded-xl bg-gray-900 border border-gray-800 p-4">
        <p className="text-xs text-gray-500 mb-2">נימוק קצר</p>
        <p className="text-gray-200 text-sm leading-relaxed">{result.reasoning}</p>
      </div>

      {/* Share */}
      <ShareActions shareText={shareText} />

      {/* Try Again */}
      <button
        onClick={onReset}
        className="w-full rounded-xl border border-gray-600 bg-transparent hover:bg-gray-800 text-gray-300 text-sm py-4 transition-colors font-medium"
      >
        נסה הרכב אחר →
      </button>

      <Disclaimer />
    </div>
  );
}
