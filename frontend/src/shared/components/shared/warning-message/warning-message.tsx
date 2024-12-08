import { cn } from '@/shared/lib';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './warning-message.module.css';

interface Props {
  message: string;
  className?: string;
}

export const WarningMessage: React.FC<Props> = ({ message, className }) => {
  return (
    <div className={cn(styles.messageContainer, className)}>
      <ExclamationCircleIcon className={styles.messageIcon} />
      <small>
        <strong>Предупреждение:</strong> {message}
      </small>
    </div>
  );
};
