import { PetitionType } from '@/types';

export const petitionTypeLabels: Record<PetitionType, string> = {
  knesset_law: 'חוק של הכנסת',
  government_decision: 'החלטת ממשלה',
  public_appointment: 'מינוי ציבורי',
  security_military: 'ביטחון / צה״ל',
  religion_state: 'דת ומדינה',
  human_rights: 'זכויות אדם',
  freedom_of_expression: 'חופש ביטוי',
  other: 'אחר',
};

export const petitionTypeIcons: Record<PetitionType, string> = {
  knesset_law: '📜',
  government_decision: '🏛️',
  public_appointment: '👤',
  security_military: '🛡️',
  religion_state: '✡️',
  human_rights: '⚖️',
  freedom_of_expression: '🗣️',
  other: '📋',
};
