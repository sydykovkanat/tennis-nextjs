import StoreProvider from '@/app/store-provider';
import { Toaster } from '@/shared/components/ui';
import { geistSans } from '@/shared/fonts/geist';
import { cn } from '@/shared/lib/helpers/utils';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

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
        <StoreProvider>
          <NextTopLoader color={'#64B32C'} height={1} />
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
