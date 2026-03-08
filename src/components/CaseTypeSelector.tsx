'use client';

import { PetitionType } from '@/types';
import { petitionTypeLabels, petitionTypeIcons } from '@/data/petitionTypes';

interface CaseTypeSelectorProps {
  selected: PetitionType | null;
  onSelect: (type: PetitionType) => void;
}

const petitionTypes = Object.keys(petitionTypeLabels) as PetitionType[];

export default function CaseTypeSelector({ selected, onSelect }: CaseTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {petitionTypes.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`
            rounded-xl border p-4 text-right transition-all duration-200
            ${selected === type
              ? 'border-blue-500 bg-blue-900/30 shadow-blue-500/20 shadow-lg'
              : 'border-gray-700 bg-gray-900/50 hover:border-gray-500 hover:bg-gray-800/50'
            }
          `}
        >
          <div className="text-2xl mb-2">{petitionTypeIcons[type]}</div>
          <p className={`text-sm font-medium ${selected === type ? 'text-blue-300' : 'text-gray-200'}`}>
            {petitionTypeLabels[type]}
          </p>
        </button>
      ))}
    </div>
  );
}
