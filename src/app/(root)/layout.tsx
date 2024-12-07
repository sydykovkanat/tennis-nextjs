import { getFooterItems } from '@/actions/footer';
import { Footer } from '@/shared/components/shared';
import { Navbar } from '@/shared/components/shared/navbar/navbar';

import React from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerItemsData = await getFooterItems();

  return (
    <div className='flex flex-col min-h-dvh'>
      <header className='max-h-24 mb-16 sm:mb-24'>
        <Navbar dataItems={footerItemsData} />
      </header>
      <main className='grow'>{children}</main>
      <footer className='mt-auto pt-[218px]'>
        <Footer dataItems={footerItemsData} />
      </footer>
    </div>
  );
}
