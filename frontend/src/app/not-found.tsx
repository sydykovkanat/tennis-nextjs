'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

import { useEffect } from 'react';

import styles from './not-found.module.css';
import { cn } from '@/shared/lib';

export default function NotFound() {
  const pathName = usePathname();
  useEffect(() => {
    if (pathName !== '/404') {
      redirect('/404');
    }
  }, [pathName]);
  return (
    <div className={styles.content}>
      <div className={styles.innerContainer}>
        <div className={styles.page}>
          <h2 className={cn(styles.title, 'dark:text-white')}>Страница не найдена</h2>
          <p className={cn(styles.description, 'dark:text-white')}>Страница, которую вы ищете, не существует или была перемещена</p>
        </div>
        <div className={styles.button}>
          <Link href={'/'} className={styles.link}>
            Вернуться на главную страницу
          </Link>
        </div>
      </div>
    </div>
  );
}
