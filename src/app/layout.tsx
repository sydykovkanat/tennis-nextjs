import StoreProvider from '@/app/store-provider';
import { Toaster } from '@/shared/components/ui';
import { geistSans } from '@/shared/fonts/geist';
import { cn } from '@/shared/lib/helpers/utils';
import type { Metadata } from 'next';

import React from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'KSLT',
  description: 'Кыргызское сообщество любителей тенниса!',
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
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
