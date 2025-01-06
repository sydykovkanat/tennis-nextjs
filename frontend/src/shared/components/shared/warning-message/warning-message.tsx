import { cn } from '@/shared/lib';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './warning-message.module.css';

interface Props {
  message: string;
  className?: string;
  variant?: 'error' | 'warning';
}

export const WarningMessage: React.FC<Props> = ({ message, className, variant = 'warning' }) => {
  const variantClasses = {
    error: styles.warningError,
    warning: styles.warningWarning,
  };
  const variantClass = variantClasses[variant];

  return (
    <div className={cn(styles.messageContainer, variantClass, className)}>
      <ExclamationCircleIcon className={styles.messageIcon} />
      <small>
        <strong>Предупреждение:</strong> {message}
      </small>
    </div>
  );
};
