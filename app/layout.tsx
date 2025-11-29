'use client';

import './globals.css';
import { Inter, Pacifico, Lato, Montserrat, Roboto, Orbitron } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial']
});
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
  fallback: ['cursive']
});
const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  fallback: ['sans-serif']
});
const montserrat = Montserrat({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  fallback: ['sans-serif']
});
const roboto = Roboto({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  fallback: ['sans-serif']
});
const orbitron = Orbitron({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  fallback: ['monospace']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pacifico.variable} ${lato.variable} ${montserrat.variable} ${roboto.variable} ${orbitron.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
