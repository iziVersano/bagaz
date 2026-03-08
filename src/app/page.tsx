'use client';

import { useState } from 'react';
import { Judge, PetitionType, CaseInput, SimulationResult } from '@/types';
import { judges } from '@/data/judges';
import { runSimulation } from '@/lib/simulation';
import AppHeader from '@/components/AppHeader';
import JudgeCard from '@/components/JudgeCard';
import CaseTypeSelector from '@/components/CaseTypeSelector';
import CaseSliders from '@/components/CaseSliders';
import ResultCard from '@/components/ResultCard';
import Disclaimer from '@/components/Disclaimer';

type Step = 0 | 1 | 2 | 3 | 4;
const TOTAL_STEPS = 5;
const REQUIRED_JUDGES = 3;

const defaultCaseInput: CaseInput = {
  rightsViolation: 50,
  securitySensitivity: 30,
  politicalInvolvement: 40,
  constitutionalSeverity: 50,
};

const DEFAULT_CASE_DESCRIPTION = '';

export default function HomePage() {
  const [step, setStep] = useState<Step>(0);
  const [selectedJudgeIds, setSelectedJudgeIds] = useState<string[]>([]);
  const [petitionType, setPetitionType] = useState<PetitionType | null>(null);
  const [caseInput, setCaseInput] = useState<CaseInput>(defaultCaseInput);
  const [caseDescription, setCaseDescription] = useState(DEFAULT_CASE_DESCRIPTION);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const selectedJudges = judges.filter((j) => selectedJudgeIds.includes(j.id));

  const toggleJudge = (id: string) => {
    setSelectedJudgeIds((prev) => {
      if (prev.includes(id)) return prev.filter((j) => j !== id);
      if (prev.length >= REQUIRED_JUDGES) return prev;
      return [...prev, id];
    });
  };

  const handleNext = () => setStep((s) => (s + 1) as Step);
  const handleBack = () => setStep((s) => (s - 1) as Step);

  const handleSimulate = () => {
    if (!petitionType || selectedJudges.length !== REQUIRED_JUDGES) return;
    const sim = runSimulation(selectedJudges, caseInput, petitionType);
    setResult(sim);
    setStep(4);
  };

  const handleReset = () => {
    setStep(0);
    setSelectedJudgeIds([]);
    setPetitionType(null);
    setCaseInput(defaultCaseInput);
    setCaseDescription(DEFAULT_CASE_DESCRIPTION);
    setResult(null);
  };

  return (
    <div className="min-h-dvh bg-gray-950 flex flex-col">
      <AppHeader step={step} totalSteps={TOTAL_STEPS} onBack={handleBack} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">

        {/* Step 0: Landing */}
        {step === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-8">
            <div>
              <div className="inline-block bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1 text-blue-400 text-xs font-medium mb-4">
                סימולטור סאטירי
              </div>
              <h1 className="text-6xl font-black text-white mb-3 tracking-tight">
                בג״צומטר
              </h1>
              <p className="text-gray-400 text-lg max-w-sm mx-auto leading-relaxed">
                בחר הרכב שופטים, הגדר את סוג העתירה ומאפייניה — וגלה מה הסיכוי לקבלתה.
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 shadow-lg shadow-blue-600/25"
            >
              התחל סימולציה ←
            </button>

            <Disclaimer />
          </div>
        )}

        {/* Step 1: Judge Selection */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">בחר הרכב שופטים</h2>
              <p className="text-gray-400 text-sm">
                יש לבחור בדיוק {REQUIRED_JUDGES} שופטים ·{' '}
                <span className={selectedJudgeIds.length === REQUIRED_JUDGES ? 'text-green-400 font-bold' : 'text-blue-400'}>
                  {selectedJudgeIds.length}/{REQUIRED_JUDGES} נבחרו
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {judges.map((judge) => (
                <JudgeCard
                  key={judge.id}
                  judge={judge}
                  selected={selectedJudgeIds.includes(judge.id)}
                  disabled={selectedJudgeIds.length >= REQUIRED_JUDGES && !selectedJudgeIds.includes(judge.id)}
                  onToggle={toggleJudge}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedJudgeIds.length !== REQUIRED_JUDGES}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-2xl text-base transition-colors"
            >
              {selectedJudgeIds.length === REQUIRED_JUDGES
                ? 'המשך לבחירת עתירה ←'
                : `נדרשים עוד ${REQUIRED_JUDGES - selectedJudgeIds.length} שופטים`}
            </button>
          </div>
        )}

        {/* Step 2: Petition Type */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">סוג העתירה</h2>
              <p className="text-gray-400 text-sm">בחר את הנושא המרכזי של העתירה</p>
            </div>

            <CaseTypeSelector selected={petitionType} onSelect={setPetitionType} />

            <button
              onClick={handleNext}
              disabled={!petitionType}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-2xl text-base transition-colors"
            >
              {petitionType ? 'המשך להגדרת מאפיינים ←' : 'בחר סוג עתירה'}
            </button>
          </div>
        )}

        {/* Step 3: Case Sliders */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">מאפייני התיק</h2>
              <p className="text-gray-400 text-sm">תאר את המקרה וכוון את עוצמת כל מאפיין</p>
            </div>

            <div>
              <label className="text-white font-medium text-sm block mb-1">תיאור המקרה</label>
              <p className="text-gray-500 text-xs mb-2">כתוב במילים שלך על מה העתירה</p>
              <textarea
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                placeholder='לדוגמה: "המדינה מבקשת לסגור את גלי צהל"'
                rows={3}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <CaseSliders values={caseInput} onChange={setCaseInput} />

            <button
              onClick={handleSimulate}
              className="w-full bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black py-5 rounded-2xl text-lg transition-all shadow-lg shadow-blue-600/25"
            >
              ⚖️ הרץ סימולציה
            </button>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && result && petitionType && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white">תוצאת הסימולציה</h2>
            <ResultCard
              result={result}
              selectedJudges={selectedJudges}
              petitionType={petitionType}
              caseDescription={caseDescription}
              onReset={handleReset}
            />
          </div>
        )}

      </main>
    </div>
  );
}
