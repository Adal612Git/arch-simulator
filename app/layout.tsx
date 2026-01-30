import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display'
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Arch Simulator',
  description: 'Digital Twin de Arquitectura Empresarial'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-ink text-white">
        {children}
      </body>
    </html>
  );
}
