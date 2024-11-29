import React, { type PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/utils';
import styles from './container.module.css';

interface Props extends PropsWithChildren {
  className?: string;
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};
