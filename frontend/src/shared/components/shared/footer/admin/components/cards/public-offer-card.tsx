'use client';

import { Card } from '@/shared/components/ui';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './cards.module.css';

interface Props {
  publicOfferText: string;
}

export const PublicOfferCard: React.FC<Props> = ({ publicOfferText }) => {
  return (
    <Card className={styles.publicOfferCard}>
      <div className={styles.publicOfferCardHeader}>
        <div className={styles.publicOfferCardTextContainer}>
          <DocumentTextIcon className={styles.publicOfferCardIcon} />
          <span className={styles.publicOfferCardText}>{publicOfferText}</span>
        </div>
      </div>
    </Card>
  );
};
