import { getFooterItems } from '@/actions/footer';
import { Footer, Navbar } from '@/shared/components/shared';

import React, { use } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerItemsData = use(getFooterItems());

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
