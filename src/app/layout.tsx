import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'בג״צומטר — סימולטור הרכב שופטים',
  description: 'סימולטור אינטראקטיבי/סאטירי לתחזית תוצאת עתירה לבית המשפט העליון',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <body className="bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
