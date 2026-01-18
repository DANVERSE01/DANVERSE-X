// app/layout.tsx
import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import RobotBackground from "@/components/RobotBackground";
import NebulaLayer from "@/components/NebulaLayer";

// Load fonts
const display = Space_Grotesk({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-display" });
const body    = Inter({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-body" });

// Define metadata including favicon
export const metadata = {
  title: 'DANVERSE',
  description: 'AI Cinematic Studio for brands',
  icons: {
    icon: '/danverse-logo.svg',
    apple: '/danverse-logo.svg',
    shortcut: '/danverse-logo.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-[color:var(--bg-0)] text-[color:var(--text)]">
        {/* Full-screen interactive robot background */}
        <RobotBackground />
        {/* Cinematic nebula layer with pointer-events-none */}
        <NebulaLayer />

        {/* Main content wrapper: pointer-events-none so the canvas stays interactive */}
        <main className="relative z-[2] pointer-events-none min-h-screen">
          {/* Wrap interactive elements in pointer-events-auto so they can be clicked */}
          <div className="pointer-events-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
