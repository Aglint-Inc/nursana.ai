import './globals.css';

import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';

import Providers from './providers';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Nursana',
  description: 'Connecting Nurses with the right opportunities',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Nursana – Connecting Nurses with the Right Opportunities',
    description:
      'Discover top nursing jobs with AI-powered interviews and resume analysis.',
    url: defaultUrl,
    siteName: 'Nursana',
    images: [
      {
        url: `${defaultUrl}/og-image.png`, 
        width: 1200,
        height: 630,
        alt: 'Nursana homepage preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nursana – Connecting Nurses with the Right Opportunities',
    description:
      'Discover top nursing jobs with AI-powered interviews and resume analysis.',
    images: [`${defaultUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center">
            <Providers>{children}</Providers>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}