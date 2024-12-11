'use client';

import { Card } from '@/shared/components/ui';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { API_URL } from '@/shared/constants';

import React from 'react';

import styles from './cards.module.css';

interface Props {
  image: string;
}

export const MainPartnerCard: React.FC<Props> = ({ image }) => {
  return (
    <Card className={styles.mainPartnerCard}>
      <div className={styles.mainPartnerCardHeader}>
        <div className={styles.mainPartnerCardImageContainer}>
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <img src={`${API_URL}/${image}`} alt='Логотип партнера' className={styles.mainPartnerCardImage} />
              </TooltipTrigger>
              <TooltipContent className={styles.mainPartnerCardTooltipContent}>
                <img
                  alt='Логотип компании'
                  className={styles.mainPartnerCardTooltipImage}
                  src={`${API_URL}/${image}`}
                />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className={styles.mainPartnerCardText}>Предпросмотр изображения ген.партнера</span>
        </div>
      </div>
    </Card>
  );
};
