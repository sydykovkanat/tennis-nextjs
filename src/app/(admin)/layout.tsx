import { geistSans } from '@/shared/fonts/geist';
import { cn } from '@/shared/lib/helpers/utils';
import type { Metadata } from 'next';

import React from 'react';

import '../globals.css';

export const metadata: Metadata = {
  title: 'KSLT - Управление',
  description: 'Кыргызское сообщество любителей тенниса!',
  icons: [
    {
      rel: 'icon',
      url: '/kslt.svg',
    },
  ],
};

export default function AdminLayout({
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
