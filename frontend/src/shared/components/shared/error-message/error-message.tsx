import { cn } from '@/shared/lib';

import React from 'react';

import styles from './error-message.module.css';

interface ErrorMessageProps {
  children: React.ReactNode;
  type?: 'error' | 'warning' | 'info';
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, type = 'error', className }) => {
  const messageClass = cn(
    styles.text,
    type === 'error' && styles.error,
    type === 'warning' && styles.warning,
    type === 'info' && styles.info,
    className,
  );

  return <small className={messageClass}>{children}</small>;
};
