// app/layout.tsx
import './globals.css';
import { Space_Grotesk, Inter } from 'next/font/google';
import RobotBackground from '@/components/RobotBackground';
import NebulaLayer from '@/components/NebulaLayer';
import { ReactNode } from 'react';

// Load fonts
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

// Define metadata including favicon
export const metadata = {
  title: 'DANVERSE - AI Cinematic Studio',
  description: 'AI Cinematic Studio for brands - Premium digital services',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'DANVERSE - AI Cinematic Studio',
    description: 'Premium AI-powered creative services',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DANVERSE - AI Cinematic Studio',
    description: 'Premium AI-powered creative services',
  },
} as const;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-[color:var(--bg-0)] text-[color:var(--text)]">
        {/* Full-screen interactive robot background */}
        <RobotBackground />
        {/* Cinematic nebula layer */}
        <NebulaLayer />
        {/* Main content wrapper */}
        <main className="relative z-[2] pointer-events-none min-h-screen">
          {/* Wrap interactive elements in pointer-events-auto so they can be clicked */}
          <div className="pointer-events-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
