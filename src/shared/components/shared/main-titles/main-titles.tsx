import { cn } from '@/shared/lib/utils';

import React from 'react';

import styles from './main-titles.module.css';

interface Props {
  className?: string;
  title: string;
  subtitle?: string;
}

export const MainTitles: React.FC<Props> = ({ className, title, subtitle }) => {
  return (
    <div className={cn(styles.container, className)}>
      <h1
        className={cn(styles.title, {
          'mb-10': subtitle,
        })}
      >
        {title}
      </h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
    </div>
  );
};
