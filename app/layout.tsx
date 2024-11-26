import './globals.css';

import { GeistSans } from 'geist/font/sans';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';

import ScriptAppolo from './_common/components/ScriptAppolo';
import Providers from './providers';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Nursana',
  description:
    'Empowering nurses to connect with top healthcare opportunities. Upload Your Resume, take AI-driven interviews, and let Nursana.ai match you with the perfect job.',
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
        url: `${defaultUrl}/og-image.png?v=1`,
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

const PostHogPageView = dynamic(
  () => import('./_common/components/PostHogPageView'),
  {
    ssr: false,
  },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ScriptAppolo />
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          disableTransitionOnChange
        >
          <main className='flex flex-col items-center overflow-hidden'>
            <Providers>
              <PostHogPageView />
              {children}
            </Providers>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
