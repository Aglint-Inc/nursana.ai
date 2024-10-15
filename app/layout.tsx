import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";

import Providers from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Narsura AI",
  description: "Connecting Nurses with the right opportunities",
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
          <main className="min-h-screen flex flex-col items-center">
            <Providers>{children}</Providers>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
