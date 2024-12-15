import { cn } from '@/shared/lib/helpers/utils';

import React from 'react';

import styles from './main-titles.module.css';

interface Props {
  className?: string;
  title: string;
  subtitle?: string;
  titleSize?: 'small' | 'medium' | 'large';
  subtitleSize?: 'small' | 'medium' | 'large';
}

export const MainTitles: React.FC<Props> = ({
  className,
  title,
  subtitle,
  titleSize = 'large',
  subtitleSize = 'large',
}) => {
  return (
    <div className={cn(styles.container, className)}>
      <h1
        className={cn(styles.title, 'dark:text-white', {
          'mb-2': subtitle,
          'text-xl sm:text-2xl lg:text-3xl xl:text-4xl': titleSize === 'small',
          'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl': titleSize === 'medium',
          'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl': titleSize === 'large',
        })}
      >
        {title}
      </h1>
      <h2
        className={cn(styles.subtitle, {
          'text-sm sm:text-lg': subtitleSize === 'small',
          'text-base sm:text-xl': subtitleSize === 'medium',
          'text-lg sm:text-2xl': subtitleSize === 'large',
        })}
      >
        {subtitle}
      </h2>
    </div>
  );
};
