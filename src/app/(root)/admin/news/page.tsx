'use client';

import { AdminNewsPage } from '@/shared/components/shared';
import React from 'react';

export default function Page() {
  return (
    <>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-6'>
        <h1 className='text-2xl font-medium'>Управление новостями</h1>

        {/*<NewsForm />*/}
      </div>
      <AdminNewsPage />
    </>
  );
}
