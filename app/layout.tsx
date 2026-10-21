import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/language-context';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Luxury Brand & Experience Showcase Platform | AereoStack',
  description:
    'A refined, high-performance showcase platform for bespoke luxury collections, artisanal craftsmanship, and client consultation journeys.',
  openGraph: {
    title: 'Luxury Brand & Experience Showcase Platform | AereoStack',
    description:
      'A refined, high-performance showcase platform for bespoke luxury collections, artisanal craftsmanship, and client consultation journeys.',
    type: 'website',
    siteName: 'AereoStack Maison',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Brand & Experience Showcase Platform | AereoStack',
    description:
      'A refined, high-performance showcase platform for bespoke luxury collections, artisanal craftsmanship, and client consultation journeys.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111111] antialiased selection:bg-[#C5A880] selection:text-black">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
