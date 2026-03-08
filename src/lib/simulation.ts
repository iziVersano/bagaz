import { Judge, CaseInput, PetitionType, SimulationResult, JudgeVote } from '@/types';

const SUPPORT_THRESHOLD = 0.50;

const petitionTypeModifiers: Record<PetitionType, number> = {
  knesset_law: -0.06,
  government_decision: 0.04,
  public_appointment: 0.02,
  security_military: -0.14,
  religion_state: 0.03,
  human_rights: 0.10,
  freedom_of_expression: 0.08,
  other: 0.00,
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

  const { rightsProtection, governmentDeference, securityWeight, activismLevel } = judge.profile;

  // Factors that push toward accepting the petition
  const supportFactors =
    rightsProtection * r * 0.35 +
    activismLevel * c * 0.30 +
    (1 - governmentDeference) * p * 0.20 +
    (1 - securityWeight) * s * 0.10 +
    0.05; // small base tendency

  // Apply petition type modifier
  const typeModifier = petitionTypeModifiers[petitionType];

  const raw = supportFactors + typeModifier;
  return Math.max(0, Math.min(1, raw));
}

const reasoningTemplates = {
  accepted_strong: [
    'הרכב זה ידוע בנטייה לאכוף זכויות יסוד, ועוצמת הפגיעה הנטענת מצדיקה התערבות.',
    'הנסיבות המתוארות מקיימות את כלל האצבע לבחינה חוקתית מוגברת.',
    'רוב השופטים בהרכב זה עשויים לראות בכך חריגה מסמכות בעלת השלכות חוקתיות.',
  ],
  accepted_marginal: [
    'תוצאה קרובה — הרכב זה יכול לקבל את העתירה ברוב דחוק, בתנאי שהטיעונים מוצגים היטב.',
    'ההרכב מוצא עצמו בין שתי גישות; הנטייה הכוללת נוטה לקבלה, אך לא בביטחון מלא.',
    'מספר שופטים בהרכב עשויים להתנדנד, אך הכף נוטה לאפשר את העתירה.',
  ],
  rejected_marginal: [
    'ההרכב מחזיק בעמדת ריסון שיפוטי, אך חלק מהשופטים עשויים להרהר בדעה נוגדת.',
    'הנסיבות אינן מגיעות לרף הנדרש לבחינה חוקתית מוגברת לפי עמדת רוב ההרכב.',
    'תוצאה גבולית — שינוי קל בנסיבות עשוי להוביל לתוצאה שונה.',
  ],
  rejected_strong: [
    'ההרכב מעדיף ריסון שיפוטי ואינו נוטה להתערב בהחלטות הרשות המבצעת/המחוקקת.',
    'לא נמצאה עילה חוקתית מספקת לפי הגישה הפרשנית של רוב השופטים בהרכב.',
    'הרכב זה ידוע בהגנה על עקרון הפרדת הרשויות ואי-התערבות בנושאים אלה.',
  ],
};

function pickReasoning(outcome: 'accepted' | 'rejected', probability: number): string {
  const isStrong = probability >= 70 || probability <= 30;
  let pool: string[];
  if (outcome === 'accepted') {
    pool = isStrong ? reasoningTemplates.accepted_strong : reasoningTemplates.accepted_marginal;
  } else {
    pool = isStrong ? reasoningTemplates.rejected_strong : reasoningTemplates.rejected_marginal;
  }
  // Deterministic pick based on probability value
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

  // Probability: average of support scores if accepted, or average of reject scores if rejected
  const avgSupportScore =
    judgeVotes.reduce((sum, v) => sum + v.score, 0) / judgeVotes.length;

  let probability: number;
  if (outcome === 'accepted') {
    probability = Math.round(avgSupportScore * 100 * 0.4 + (supportCount / selectedJudges.length) * 100 * 0.6);
  } else {
    probability = Math.round((1 - avgSupportScore) * 100 * 0.4 + (rejectCount / selectedJudges.length) * 100 * 0.6);
  }
  probability = Math.max(51, Math.min(95, probability));

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
