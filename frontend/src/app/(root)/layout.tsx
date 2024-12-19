'use client';

import { Footer } from '@/shared/components/shared';
import { Navbar } from '@/shared/components/shared/navbar/navbar';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectItemsData } from '@/shared/lib/features/footer/footers-slice';
import { getFooterItems } from '@/shared/lib/features/footer/footers-thunks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { getPermissionForUser } from '@/shared/lib/features/users/users-thunks';
import type { Metadata } from 'next';

import React, { useEffect } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const footerItemsData = useAppSelector(selectItemsData);

  useEffect(() => {
    if (user) {
      dispatch(getPermissionForUser(user._id));
    }
    dispatch(getFooterItems());
  }, [dispatch, user]);

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
