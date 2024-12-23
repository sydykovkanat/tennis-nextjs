import { Cup, Medal, UseRewards } from '@/shared/components/shared';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Reward } from '@/shared/types/reward.types';

import React from 'react';

import styles from './reward-item.module.css';

interface Props {
  reward: Reward;
}

export const RewardItem: React.FC<Props> = ({ reward }) => {
  const { getIconClass } = UseRewards();

  return (
    <Popover>
      <PopoverTrigger className={cn(styles.popoverTrigger)}>
        <div className={cn(styles.reward)}>
          {reward.icon === 'medal' ? (
            <Medal className={getIconClass(reward.place)} />
          ) : (
            <Cup className={getIconClass(reward.place)} />
          )}
          <p className={cn(styles.place)}>{reward.place.toString()} место</p>
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