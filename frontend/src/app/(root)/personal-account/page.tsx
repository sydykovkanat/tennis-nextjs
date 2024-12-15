'use client';

import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import React from 'react';

const UserCabinet = dynamic(() => import('@/shared/components/shared/personal-account/personal-account'), {
  ssr: false,
});

export default function Page() {
  const user = useAppSelector(selectUser);

  if (!user) {
    redirect('/404');
  }
  return <UserCabinet />;
}
