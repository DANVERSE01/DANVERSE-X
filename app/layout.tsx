import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://danverse.pages.dev'),
  title: {
    default: 'DANVERSE - AI Cinematic Studio',
    template: '%s | DANVERSE',
  },
  description: 'Premium AI-powered creative services for cinematic productions, visual effects, and digital content creation. Transform your vision into reality.',
  keywords: [
    'AI',
    'Cinematic',
    'Studio',
    'Visual Effects',
    'VFX',
    'Video Production',
    'AI Art',
    'Digital Content',
    'Creative Services',
    'Motion Graphics',
  ],
  authors: [{ name: 'DANVERSE Team', url: 'https://danverse.pages.dev' }],
  creator: 'DANVERSE',
  publisher: 'DANVERSE',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://danverse.pages.dev',
    siteName: 'DANVERSE',
    title: 'DANVERSE - AI Cinematic Studio',
    description: 'Premium AI-powered creative services for cinematic productions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DANVERSE - AI Cinematic Studio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DANVERSE - AI Cinematic Studio',
    description: 'Premium AI-powered creative services for cinematic productions.',
    images: ['/og-image.png'],
    creator: '@danverse_ai',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
