import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
// import type { Metadata } from 'next';
// import { Roboto_Mono } from 'next/font/google';
import {
  SWRProvider,
  ViewportScaleProvider,
} from './providers';
// import { Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
// import { cn } from '@/utils/helpers';
import { Toaster } from '@/components/ui/sonner';

// const roboto = Roboto_Mono({ weight: '400', subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'AI Tutor - Learning. Reimagined.',
//   metadataBase: new URL(
//     process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
//   ),
//   description:
//     "AI Tutor is your always-on, always-engaged learning companion. You can chat with AI Tutor about any topic, whenever you want. It's designed to help you build critical skills and follow your curiosity.",
//   authors: [{ name: 'Plastic Labs', url: 'https://plasticlabs.ai' }],
//   openGraph: {
//     title: 'AI Tutor',
//     description:
//       "AI Tutor is your always-on, always-engaged learning companion. You can chat with AI Tutor about any topic, whenever you want. It's designed to help you build critical skills and follow your curiosity.",
//     siteName: 'AI Tutor',
//     type: 'website',
//     url: 'https://chat.ai-tutor.com',
//     images: [
//       {
//         url: '/opengraph-image.jpg',
//         width: 1800,
//         height: 1600,
//         alt: 'AI Tutor Preview',
//       },
//     ],
//     locale: 'en_US',
//   },
//   robots: {
//     index: false,
//     follow: true,
//     nocache: true,
//     googleBot: {
//       index: true,
//       follow: false,
//       noimageindex: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   manifest: '/site.webmanifest',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-[100dvh]">
      <body className="h-[100dvh] font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme-preference"
          disableTransitionOnChange
        >
            <SWRProvider>
              <div className="h-full flex flex-col min-h-0">
                <ViewportScaleProvider />
                {children}
              </div>
            </SWRProvider>
        </ThemeProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
