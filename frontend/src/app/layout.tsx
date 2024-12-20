import StoreProvider from '@/app/store-provider';
import { Toaster } from '@/shared/components/ui';
import { geistSans } from '@/shared/fonts/geist';
import { ThemeProvider } from '@/shared/lib';
import { cn } from '@/shared/lib/helpers/utils';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';

import React from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | КСЛТ',
    default: 'КСЛТ — Кыргызстанское сообщество любителей тенниса | Теннис в Кыргызстане',
  },
  description: 'Сообщество любителей тенниса в Кыргызстане: календарь турниров, рейтинг участников, свежие новости и события. Всё о теннисе в Кыргызстане',
  keywords: 'Кыргызстан теннис, Кыргызстанское сообщество любителей тенниса, КСЛТ',
  openGraph: {
    title: 'КСЛТ — Кыргызстанское сообщество любителей тенниса | Теннис в Кыргызстане',
    description: 'Сообщество любителей тенниса в Кыргызстане: календарь турниров, рейтинг участников, свежие новости и события. Всё о теннисе в Кыргызстане',
    images: 'https://tennis.kg/kslt.svg',
    type: 'website',
  },
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
    <html lang='ru'>
      <body className={cn('antialiased')} style={geistSans.style}>
        <StoreProvider>
          <NextTopLoader color={'#64B32C'} height={1} />
          <ThemeProvider attribute='class' defaultTheme='system'>
            {children}
          </ThemeProvider>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
