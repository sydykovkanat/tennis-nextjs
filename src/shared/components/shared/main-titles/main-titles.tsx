import { cn } from '@/shared/lib/utils';

import React from 'react';

import styles from './main-titles.module.css';

interface Props {
  className?: string;
}

export const MainTitles: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(styles.container, className)}>
      <h1 className={styles.title}>Кыргызстанское сообщество любителей тенниса</h1>
      <h2 className={styles.subtitle}>Искусство становиться первым!</h2>
    </div>
  );
};
