import { Judge } from '@/types';

export const judges: Judge[] = [
  {
    id: 'j1',
    name: 'אסתר חיות',
    image: '',
    tags: ['זכויות אדם', 'פעילות שיפוטית', 'ביקורת חוקתית'],
    profile: {
      // הובילה את פסיקת הסבירות 8-7; מתונה-ליברלית, לא קיצונית
      rightsProtection: 0.75,
      governmentDeference: 0.35,
      securityWeight: 0.45,
      religiousConsideration: 0.35,
      activismLevel: 0.75,
    },
  },
  {
    id: 'j2',
    name: 'יצחק עמית',
    image: '',
    tags: ['מינהל ציבורי', 'זכויות יסוד', 'ביקורת שיפוטית'],
    profile: {
      // נשיא בית המשפט העליון הנוכחי; הצביע לבטל תיקון הסבירות; ליברלי חזק
      rightsProtection: 0.80,
      governmentDeference: 0.30,
      securityWeight: 0.50,
      religiousConsideration: 0.25,
      activismLevel: 0.80,
    },
  },
  {
    id: 'j3',
    name: 'נעם סולברג',
    image: '',
    tags: ['שמרנות שיפוטית', 'דת ומדינה', 'ריסון שיפוטי'],
    profile: {
      // השמרן הקיצוני ביותר; דחה כל סמכות לביקורת על חוקי יסוד; מתנחל דתי-לאומי
      rightsProtection: 0.20,
      governmentDeference: 0.80,
      securityWeight: 0.85,
      religiousConsideration: 0.75,
      activismLevel: 0.10,
    },
  },
  {
    id: 'j4',
    name: 'דפנה ברק-ארז',
    image: '',
    tags: ['משפט ציבורי', 'זכויות נשים', 'שקיפות ממשלתית'],
    profile: {
      // אקדמאית חוקתית בולטת; הצביעה לבטל תיקון הסבירות; ליברלית חזקה
      rightsProtection: 0.85,
      governmentDeference: 0.25,
      securityWeight: 0.40,
      religiousConsideration: 0.20,
      activismLevel: 0.82,
    },
  },
  {
    id: 'j5',
    name: 'ענת ברון',
    image: '',
    tags: ['זכויות חברתיות', 'שוויון', 'פרשנות ליברלית'],
    profile: {
      // ליברלית עקבית; כינתה את ההפיכה המשפטית "דרך למשטר טוטליטרי"
      rightsProtection: 0.80,
      governmentDeference: 0.25,
      securityWeight: 0.40,
      religiousConsideration: 0.25,
      activismLevel: 0.78,
    },
  },
  {
    id: 'j6',
    name: 'יאל וילנר',
    image: '',
    tags: ['משפט פלילי', 'זכויות נאשמים', 'הליך הוגן'],
    profile: {
      // שמרנית מתונה; מונתה ע"י שקד; הצביעה נגד ביטול תיקון הסבירות
      rightsProtection: 0.40,
      governmentDeference: 0.65,
      securityWeight: 0.55,
      religiousConsideration: 0.45,
      activismLevel: 0.25,
    },
  },
  {
    id: 'j7',
    name: 'חאלד כבוב',
    image: '',
    tags: ['שוויון אזרחי', 'זכויות מיעוטים', 'אנטי-אפליה'],
    profile: {
      // ליברלי; הצביע לבטל תיקון הסבירות; התנגד לענישה קולקטיבית של משפחות מחבלים
      rightsProtection: 0.72,
      governmentDeference: 0.35,
      securityWeight: 0.35,
      religiousConsideration: 0.30,
      activismLevel: 0.65,
    },
  },
  {
    id: 'j8',
    name: 'עופר גרוסקופף',
    image: '',
    tags: ['משפט מסחרי', 'רגולציה', 'ריסון שיפוטי'],
    profile: {
      // ליברלי מתון; הצביע לבטל תיקון הסבירות; משפטן כלכלי אקדמי
      rightsProtection: 0.68,
      governmentDeference: 0.40,
      securityWeight: 0.40,
      religiousConsideration: 0.20,
      activismLevel: 0.60,
    },
  },
  {
    id: 'j9',
    name: 'גילה כנפי-שטייניץ',
    image: '',
    tags: ['מינהל ציבורי', 'ביקורת שיפוטית', 'זכויות אדם'],
    profile: {
      // שמרנית מתונה; הצביעה נגד ביטול תיקון הסבירות; לא אידיאולוגית קיצונית
      rightsProtection: 0.42,
      governmentDeference: 0.62,
      securityWeight: 0.55,
      religiousConsideration: 0.45,
      activismLevel: 0.25,
    },
  },
  {
    id: 'j10',
    name: 'אלכס שטיין',
    image: '',
    tags: ['שמרנות', 'דיני ראיות', 'ריסון שיפוטי'],
    profile: {
      // פוזיטיביסט משפטי; ביקר אקטיביזם שיפוטי בפומבי; הצביע נגד ביטול תיקון הסבירות
      rightsProtection: 0.40,
      governmentDeference: 0.70,
      securityWeight: 0.55,
      religiousConsideration: 0.30,
      activismLevel: 0.15,
    },
  },
  {
    id: 'j11',
    name: 'יוסף אלרון',
    image: '',
    tags: ['ביטחון לאומי', 'ריסון שיפוטי', 'שמרנות'],
    profile: {
      // שמרן; הצביע נגד ביטול תיקון הסבירות; מקבל ביקורת שיפוטית רק במצבי קיצון
      rightsProtection: 0.45,
      governmentDeference: 0.68,
      securityWeight: 0.55,
      religiousConsideration: 0.40,
      activismLevel: 0.20,
    },
  },
  {
    id: 'j12',
    name: 'רונן סופר',
    image: '',
    tags: ['פרשנות חוקתית', 'זכויות יסוד', 'משפט ציבורי'],
    profile: {
      // שם לא מאומת כשופט בג"ץ — ייתכן שמדובר ברות רונן (מונתה 2022, ליברלית)
      rightsProtection: 0.70,
      governmentDeference: 0.35,
      securityWeight: 0.40,
      religiousConsideration: 0.25,
      activismLevel: 0.65,
    },
  },
  {
    id: 'j13',
    name: 'עמית איזנמן',
    image: '',
    tags: ['כלכלה ומשפט', 'רגולציה', 'פרשנות טקסטואלית'],
    profile: {
      // שם לא מאומת כשופט בג"ץ — ערכים מרכזיים לפי הערכה
      rightsProtection: 0.50,
      governmentDeference: 0.55,
      securityWeight: 0.50,
      religiousConsideration: 0.42,
      activismLevel: 0.40,
    },
  },
];
