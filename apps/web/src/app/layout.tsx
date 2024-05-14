import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from '@/components/ui/toaster';
import ApplicationWrapper from '@/providers/ApplicationWrapper';
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Management App',
  description: 'Make it easy for your invoice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className,
        )}
      >
        <CookiesProvider>
          <QueryProvider>
            <ApplicationWrapper>
              {children}
              <Toaster />
            </ApplicationWrapper>
          </QueryProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
