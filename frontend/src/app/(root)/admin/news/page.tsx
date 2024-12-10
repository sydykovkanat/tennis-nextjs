'use client';

import { AdminNewsPage, useNewsForm } from '@/shared/components/shared';
import { NewsForm } from '@/shared/components/shared/news/admin/news-form';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './admin-news.module.css';

export default function Page() {
  const { open, toggleOpen } = useNewsForm();

  return (
    <>
      <div className={cn(styles.header)}>
        <h1 className='text-2xl font-medium'>Управление новостями</h1>

        <Button className={'w-full xs:w-max'} icon={SquaresPlusIcon} onClick={toggleOpen}>
          Добавить новость
        </Button>
        {open && <NewsForm open={open} setOpen={toggleOpen} />}
      </div>
      <AdminNewsPage />
    </>
  );
}
