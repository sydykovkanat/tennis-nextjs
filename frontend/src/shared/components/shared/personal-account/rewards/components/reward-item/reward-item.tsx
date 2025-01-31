'use client';

import { IconComponent } from '@/shared/components/shared';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Reward } from '@/shared/types/reward.types';

import React from 'react';

import styles from './reward-item.module.css';

interface Props {
  reward: Reward;
}

export const RewardItem: React.FC<Props> = ({ reward }) => {
  return (
    <Popover>
      <PopoverTrigger className={cn(styles.popoverTrigger)}>
        <div className={cn(styles.reward)}>
          <IconComponent name={reward.icon} place={reward.place || 1} />
          <p className={cn(styles.info)}>{reward.place ? `${reward.place.toString()} место` : reward.nomination}</p>
        </div>
      </PopoverTrigger>

      <PopoverContent className={styles.popover}>
        <div className={cn(styles.card)}>
          <small className={styles.createdAt}>{reward.createdAt}</small>
          <h3 className={cn(styles.tournament, 'dark:text-cr-green-700')}>Турнир &#34;{reward.tournament}&#34;</h3>
          {reward.nomination && <p>В номинации &#34;{reward.nomination}&#34;</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
};
