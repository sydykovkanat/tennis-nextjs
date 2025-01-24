'use client';

import { CustomPagination, Loader, RewardItem, getRewards } from '@/shared/components/shared';
import { cn, useAppDispatch, useAppSelector } from '@/shared/lib';
import {
  selectRewardFetchError,
  selectRewards,
  selectRewardsFetching,
  selectRewardsPages,
} from '@/shared/lib/features/rewards/rewards-slice';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import styles from './rewards.module.css';

export const Rewards = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const rewards = useAppSelector(selectRewards);
  const rewardsError = useAppSelector(selectRewardFetchError);
  const pages = useAppSelector(selectRewardsPages);
  const rewardsFetching = useAppSelector(selectRewardsFetching);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    getRewards({ dispatch, userId: currentUser?._id, searchParams });
  }, [dispatch, currentUser, searchParams]);

  return (
    <div>
      {rewardsFetching ? (
        <Loader />
      ) : (
        <>
          <h2 className={cn(styles.title, 'dark:text-white')}>Награды</h2>
          {!rewards.length ? (
            <p>{rewardsError?.error}</p>
          ) : (
            <div className={styles.container}>
              {rewards.map((reward) => (
                <RewardItem reward={reward} key={reward._id} />
              ))}
            </div>
          )}
        </>
      )}
      {pages > 1 && <CustomPagination total={pages} entity='rewards' />}
    </div>
  );
};
