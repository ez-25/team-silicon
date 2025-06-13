import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';
import MainLayout from '@/components/layout/MainLayout';
import { Providers } from '@/shared/providers/providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'EZ-Template Dashboard',
  description:
    'Frontend project with Turborepo, NextJS, MUI, Highcharts, React-Flow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <MainLayout>
            <Providers>{children}</Providers>
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
