import { geistSans } from '@/shared/fonts/geist';
import { cn } from '@/shared/lib/utils';
import type { Metadata } from 'next';

import React from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | KSLT',
    default: 'KSLT',
  },
  description: 'Кыргызстанское сообщество любителей тенниса!',
  icons: [
    {
      rel: 'icon',
      url: '/kslt.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn('antialiased')} style={geistSans.style}>
        {children}
      </body>
    </html>
  );
}
