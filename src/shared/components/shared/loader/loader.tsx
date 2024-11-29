import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Loader as LoaderIcon } from 'lucide-react';
import styles from './loader.module.css';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  absolute?: boolean;
  fixed?: boolean;
}

export const Loader: React.FC<Props> = ({
  className,
  size = 'sm',
  theme = 'dark',
  absolute = false,
  fixed = false,
}) => {
  const sizeClass = size === 'sm' ? 'size-5' : size === 'md' ? 'size-6' : 'size-7';
  const themeClass = theme === 'light' ? 'text-muted' : 'text-muted-foreground';

  return (
    <div className={cn({ absolute, fixed }, (absolute || fixed) && styles.container)}>
      <LoaderIcon className={cn(styles.loader, sizeClass, themeClass, className)} />
    </div>
  );
};
