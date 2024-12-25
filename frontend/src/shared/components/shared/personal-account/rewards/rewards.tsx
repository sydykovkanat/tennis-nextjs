'use client';

import { CustomPagination, Loader, RewardItem, useRewards } from '@/shared/components/shared';
import { cn } from '@/shared/lib';

import styles from './rewards.module.css';

export const Rewards = () => {
  const { rewards, rewardsFetching } = useRewards();

  return (
    <div>
      {rewardsFetching ? (
        <Loader />
      ) : (
        <>
          <h2 className={cn(styles.title, 'dark:text-white')}>Награды</h2>
          <div className={styles.container}>
            {rewards.map((reward) => (
              <RewardItem reward={reward} key={reward._id} />
            ))}
          </div>
          {<CustomPagination total={1} />}
        </>
      )}
    </div>
  );
};
