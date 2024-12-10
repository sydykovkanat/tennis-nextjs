'use client';

import { Footer } from '@/shared/components/shared';
import { Navbar } from '@/shared/components/shared/navbar/navbar';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectItemsData } from '@/shared/lib/features/footer/footers-slice';
import { getFooterItems } from '@/shared/lib/features/footer/footers-thunks';

import React, { useEffect } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const footerItemsData = useAppSelector(selectItemsData);

  useEffect(() => {
    dispatch(getFooterItems());
  }, [dispatch]);

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
