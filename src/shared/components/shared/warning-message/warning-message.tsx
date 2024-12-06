import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './warning-message.module.css';

export const WarningMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className={styles.messageContainer}>
    <ExclamationCircleIcon className={styles.messageIcon} />
    <small>
      <strong>Предупреждение:</strong> {message}
    </small>
  </div>
);
