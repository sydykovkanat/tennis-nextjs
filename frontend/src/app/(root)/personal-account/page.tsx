'use client';

import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import React, { useEffect } from 'react';

const UserCabinet = dynamic(() => import('@/shared/components/shared/personal-account/personal-account'), {
  ssr: false,
});

export default function Page() {
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      redirect('/404');
    }
  }, [user]);

  return <UserCabinet />;
}
