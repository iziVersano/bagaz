# בג״צומטר

סימולטור סאטירי/אינטראקטיבי להרכב שופטים ותוצאה משוערת של עתירה לבית המשפט העליון.

## הרצה מקומית

```bash
npm install
npm run dev
```

האפליקציה תפתח בכתובת: http://localhost:3000

## בנייה לייצור

```bash
npm run build
npm start
```

## מבנה תיקיות

```
src/
  app/           - Next.js App Router (layout, page, globals.css)
  components/    - רכיבי UI (JudgeCard, ResultCard, CaseSliders, ...)
  data/          - נתונים סטטיים (שופטים, סוגי עתירות)
  lib/           - לוגיקת סימולציה
  types/         - TypeScript types
```

## הצהרת אחריות

זהו סימולטור אינטראקטיבי/סאטירי המבוסס על מאפיינים כלליים בלבד.
אין מדובר בתחזית משפטית אמיתית או בייצוג של עמדת שופט כלשהו.
