'use client';

import { CaseInput } from '@/types';

interface CaseSlidersProps {
  values: CaseInput;
  onChange: (values: CaseInput) => void;
}

const sliderConfig: { key: keyof CaseInput; label: string; description: string; color: string }[] = [
  {
    key: 'rightsViolation',
    label: 'פגיעה בזכויות יסוד',
    description: 'עד כמה הנושא פוגע בזכויות חוקתיות',
    color: 'accent-red-500',
  },
  {
    key: 'securitySensitivity',
    label: 'רגישות ביטחונית',
    description: 'מידת הקשר לביטחון לאומי',
    color: 'accent-yellow-500',
  },
  {
    key: 'politicalInvolvement',
    label: 'מעורבות פוליטית',
    description: 'עד כמה הנושא פוליטי ורגיש',
    color: 'accent-purple-500',
  },
  {
    key: 'constitutionalSeverity',
    label: 'חומרה חוקתית',
    description: 'חריגה מהנורמות החוקתיות',
    color: 'accent-blue-500',
  },
];

function getValueLabel(value: number): string {
  if (value < 25) return 'נמוך';
  if (value < 50) return 'בינוני-נמוך';
  if (value < 75) return 'בינוני-גבוה';
  return 'גבוה';
}

export default function CaseSliders({ values, onChange }: CaseSlidersProps) {
  const handleChange = (key: keyof CaseInput, value: number) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="space-y-6">
      {sliderConfig.map(({ key, label, description, color }) => (
        <div key={key}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-white font-medium text-sm">{label}</span>
            <span className="text-blue-400 font-bold text-sm tabular-nums">
              {values[key]} — {getValueLabel(values[key])}
            </span>
          </div>
          <p className="text-gray-500 text-xs mb-2">{description}</p>
          <input
            type="range"
            min={0}
            max={100}
            value={values[key]}
            onChange={(e) => handleChange(key, Number(e.target.value))}
            className={`w-full h-2 rounded-full bg-gray-700 appearance-none cursor-pointer ${color}`}
          />
          <div className="flex justify-between mt-1">
            <span className="text-gray-600 text-xs">0</span>
            <span className="text-gray-600 text-xs">100</span>
          </div>
        </div>
      ))}
    </div>
  );
}
