import { ThemeProvider } from 'next-themes';

import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { fontMono, fontSans } from '@/lib/fonts';

import { AppHeader } from '@/components/app-header';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${fontSans.variable} ${fontMono.variable} bg-bg relative flex min-h-screen flex-col font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <AppHeader />
          <div className="mx-10 flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
