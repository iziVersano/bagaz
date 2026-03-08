export interface JudgeProfile {
  rightsProtection: number;       // 0-1: tendency to protect fundamental rights
  governmentDeference: number;    // 0-1: deference to government decisions
  securityWeight: number;         // 0-1: weight given to security considerations
  religiousConsideration: number; // 0-1: weight given to religious factors
  activismLevel: number;          // 0-1: judicial activism level
}

export interface Judge {
  id: string;
  name: string;
  image: string;
  tags: string[];
  profile: JudgeProfile;
}

export type PoliticalLean = 'left' | 'center' | 'right';

export type PetitionType =
  | 'knesset_law'
  | 'government_decision'
  | 'public_appointment'
  | 'security_military'
  | 'religion_state'
  | 'human_rights'
  | 'freedom_of_expression'
  | 'other';

export interface CaseInput {
  rightsViolation: number;        // 0-100
  securitySensitivity: number;    // 0-100
  politicalInvolvement: number;   // 0-100
  constitutionalSeverity: number; // 0-100
}

export interface JudgeVote {
  judgeId: string;
  vote: 'support' | 'reject';
  score: number;
}

export interface SimulationResult {
  outcome: 'accepted' | 'rejected';
  supportCount: number;
  rejectCount: number;
  voteRatio: string;
  probability: number;
  reasoning: string;
  judgeVotes: JudgeVote[];
}
