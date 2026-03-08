import { Judge, CaseInput, PetitionType, SimulationResult, JudgeVote } from '@/types';

const SUPPORT_THRESHOLD = 0.50;

// Modifiers based on real HCJ acceptance patterns by petition type.
// Security/military petitions are almost never accepted (~5-10% historically).
// Human rights and freedom of expression fare much better (~40-60%).
// Knesset laws are very rarely struck down (beit din precedent).
const petitionTypeModifiers: Record<PetitionType, number> = {
  knesset_law:           -0.12, // very hard to strike down — strong separation of powers norm
  government_decision:    0.05, // moderate — government decisions are more reviewable
  public_appointment:     0.03, // moderate — procedural grounds often upheld
  security_military:     -0.20, // court almost never overrides military judgment
  religion_state:        -0.02, // mixed — court intervenes sometimes (conversions) but carefully
  human_rights:           0.12, // court most willing to intervene here
  freedom_of_expression:  0.09, // strong tradition of protecting free speech
  other:                  0.00,
};

// Per-judge base tendency: reflects how often each judge historically votes
// to accept petitions, independent of case specifics.
// Derived from their voting record and judicial philosophy.
const judgeBaseTendency: Record<string, number> = {
  j1:  0.10, // חיות — moderate liberal, some base tendency to intervene
  j2:  0.12, // עמית — liberal, higher base tendency
  j3: -0.15, // סולברג — very conservative, strong base tendency to reject
  j4:  0.13, // ברק-ארז — liberal, high base tendency
  j5:  0.11, // ברון — liberal
  j6: -0.08, // וילנר — conservative
  j7:  0.06, // כבוב — moderate liberal
  j8:  0.05, // גרוסקופף — moderate liberal
  j9: -0.07, // כנפי-שטייניץ — moderate conservative
  j10: -0.10, // שטיין — conservative positivist
  j11: -0.09, // אלרון — conservative
  j12:  0.06, // רונן סופר — moderate liberal (est.)
  j13:  0.00, // איזנמן — centrist (est.)
};

function calculateJudgeScore(
  judge: Judge,
  caseInput: CaseInput,
  petitionType: PetitionType
): number {
  const r = caseInput.rightsViolation / 100;
  const s = caseInput.securitySensitivity / 100;
  const p = caseInput.politicalInvolvement / 100;
  const c = caseInput.constitutionalSeverity / 100;

  const { rightsProtection, governmentDeference, securityWeight, religiousConsideration, activismLevel } = judge.profile;

  // Core support score:
  // - rightsProtection × rightsViolation: judge who cares about rights reacts to rights violations
  // - activismLevel × constitutionalSeverity: activist judge reacts to constitutional severity
  // - (1 - governmentDeference) × politicalInvolvement: non-deferential judges engage in political disputes
  // - (1 - securityWeight) × securitySensitivity: security-skeptical judges don't defer on security grounds
  // - religiousConsideration used for religion_state petitions specifically
  const religiousBonus = petitionType === 'religion_state'
    ? (1 - religiousConsideration) * 0.10  // secular judges more likely to intervene on religion/state
    : 0;

  const supportFactors =
    rightsProtection * r * 0.35 +
    activismLevel * c * 0.30 +
    (1 - governmentDeference) * p * 0.20 +
    (1 - securityWeight) * s * 0.08 +
    religiousBonus +
    (judgeBaseTendency[judge.id] ?? 0.00);

  const typeModifier = petitionTypeModifiers[petitionType];

  const raw = supportFactors + typeModifier;
  return Math.max(0, Math.min(1, raw));
}

const reasoningTemplates = {
  accepted_strong: [
    'ההרכב מצא "פגיעה בלתי מידתית" — נוסחה שמאפשרת לבטל כמעט כל החלטת ממשלה או חוק.',
    'השופטים הפעילו ביקורת שיפוטית מרחיבה — גם כאשר הכנסת חוקקה חוק מפורש בנושא.',
    'ככלל: כשהממשלה הנבחרת רוצה, בגץ מעדיף לבחון. ובחינה כמעט תמיד מסתיימת בהתערבות.',
  ],
  accepted_marginal: [
    'ברוב דחוק — אחד השופטים כתב דעת מיעוט שתהפוך לרוב בהרכב הבא.',
    'השופטים מצאו "פגם פרוצדורלי" שמצדיק ביטול — הפגם שולי, ההתערבות מהותית.',
    'הרכב זה נוטה לקבל כשיש "עניין ציבורי" — וכמעט הכל כשיר להיות עניין ציבורי.',
  ],
  rejected_marginal: [
    'הפעם בגץ מתאפק — אל תתפלא אם הרכב אחר יחליט הפך על אותו נושא בדיוק.',
    'דחייה טכנית — העותר מוזמן לחזור עם ניסוח מעט שונה ולקבל תוצאה שונה.',
    'ההרכב מצא שאין עילה "עדיין". מילת המפתח: עדיין.',
  ],
  rejected_strong: [
    'נדיר, אך קורה: ההרכב הכיר בכך שיש גבול לסמכות השיפוטית — לפחות הפעם.',
    'ההרכב פסק שהכנסת הנבחרת רשאית לחוקק בנושא זה. ניצחון דמוקרטי קטן.',
    'הפרדת הרשויות נשמרה — לפחות בתיק הזה, לפחות בהרכב הזה.',
  ],
};

function pickReasoning(outcome: 'accepted' | 'rejected', probability: number): string {
  const isStrong = probability >= 70 || probability <= 35;
  let pool: string[];
  if (outcome === 'accepted') {
    pool = isStrong ? reasoningTemplates.accepted_strong : reasoningTemplates.accepted_marginal;
  } else {
    pool = isStrong ? reasoningTemplates.rejected_strong : reasoningTemplates.rejected_marginal;
  }
  return pool[Math.floor(probability) % pool.length];
}

export function runSimulation(
  selectedJudges: Judge[],
  caseInput: CaseInput,
  petitionType: PetitionType
): SimulationResult {
  const judgeVotes: JudgeVote[] = selectedJudges.map((judge) => {
    const score = calculateJudgeScore(judge, caseInput, petitionType);
    return {
      judgeId: judge.id,
      vote: score >= SUPPORT_THRESHOLD ? 'support' : 'reject',
      score,
    };
  });

  const supportCount = judgeVotes.filter((v) => v.vote === 'support').length;
  const rejectCount = judgeVotes.length - supportCount;
  const outcome: 'accepted' | 'rejected' = supportCount > rejectCount ? 'accepted' : 'rejected';

  const avgScore = judgeVotes.reduce((sum, v) => sum + v.score, 0) / judgeVotes.length;

  // Probability calculation: blend of average score and vote ratio
  // Wider range than before — allow results as low as 30% and as high as 95%
  let probability: number;
  if (outcome === 'accepted') {
    probability = Math.round(avgScore * 100 * 0.45 + (supportCount / selectedJudges.length) * 100 * 0.55);
    probability = Math.max(52, Math.min(95, probability));
  } else {
    probability = Math.round((1 - avgScore) * 100 * 0.45 + (rejectCount / selectedJudges.length) * 100 * 0.55);
    probability = Math.max(52, Math.min(95, probability));
  }

  const reasoning = pickReasoning(outcome, probability);

  return {
    outcome,
    supportCount,
    rejectCount,
    voteRatio: `${supportCount}-${rejectCount}`,
    probability,
    reasoning,
    judgeVotes,
  };
}
