'use client';

import { Judge } from '@/types';

interface JudgeCardProps {
  judge: Judge;
  selected: boolean;
  disabled: boolean;
  onToggle: (id: string) => void;
}

function JudgeAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  const colors = [
    'from-blue-600 to-blue-800',
    'from-purple-600 to-purple-800',
    'from-teal-600 to-teal-800',
    'from-orange-600 to-orange-800',
    'from-rose-600 to-rose-800',
    'from-indigo-600 to-indigo-800',
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg mb-2 mx-auto`}
    >
      {initials}
    </div>
  );
}

export default function JudgeCard({ judge, selected, disabled, onToggle }: JudgeCardProps) {
  return (
    <button
      onClick={() => onToggle(judge.id)}
      disabled={disabled && !selected}
      className={`
        relative w-full rounded-xl border p-4 text-right transition-all duration-200
        ${selected
          ? 'border-blue-500 bg-blue-900/30 shadow-blue-500/20 shadow-lg'
          : disabled
          ? 'border-gray-700 bg-gray-900/30 opacity-40 cursor-not-allowed'
          : 'border-gray-700 bg-gray-900/50 hover:border-gray-500 hover:bg-gray-800/50'
        }
      `}
    >
      {selected && (
        <div className="absolute top-2 left-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      <JudgeAvatar name={judge.name} />
      <p className="text-white font-semibold text-sm text-center mb-2">{judge.name}</p>
      <div className="flex flex-wrap gap-1 justify-center">
        {judge.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-700/60 text-gray-300 rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
