import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import TanstackProvider from '@/providers/tanstackProvider';
import { Toaster } from 'react-hot-toast';
import ReduxProvider from '@/providers/reduxProvider';
import AuthProviders from '@/providers/authProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Easy Shopper Site | Beranda',
  description: 'Welcome to Easy Shopper',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <ReduxProvider>
            <AuthProviders>
              <Toaster />
              {/* <Header /> */}
              {children}
              {/* <Footer /> */}
            </AuthProviders>
          </ReduxProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
