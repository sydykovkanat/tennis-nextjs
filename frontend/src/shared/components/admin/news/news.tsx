'use client';

import { AdminNewsPage, useNewsForm } from '@/shared/components/shared';
import { NewsForm } from '@/shared/components/shared/news/admin/news-form';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Grid2X2PlusIcon } from 'lucide-react';

import React from 'react';

import styles from './admin-news.module.css';

export const News = () => {
  const { open, toggleOpen } = useNewsForm();

  return (
    <>
      <div className={cn(styles.header)}>
        <div>
          <h2 className={cn(styles.title)}>Управление новостями</h2>
          <small className={cn(styles.subtitle)}>Страница для управления новостями</small>
        </div>

        <Button icon={Grid2X2PlusIcon} onClick={toggleOpen}>
          Добавить новость
        </Button>
        {open && <NewsForm open={open} setOpen={toggleOpen} />}
      </div>
      <AdminNewsPage />
    </>
  );
};
