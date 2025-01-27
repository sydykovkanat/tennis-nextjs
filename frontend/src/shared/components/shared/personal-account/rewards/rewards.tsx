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

import { useEffect, useState } from 'react';

import { useFetchUser } from '../hooks';
import personalStyles from '../personal.module.css';
import styles from './rewards.module.css';

export const Rewards = () => {
  useFetchUser();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const rewards = useAppSelector(selectRewards);
  const rewardsError = useAppSelector(selectRewardFetchError);
  const pages = useAppSelector(selectRewardsPages);
  const rewardsFetching = useAppSelector(selectRewardsFetching);
  const currentUser = useAppSelector(selectCurrentUser);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (userId.length) {
      getRewards({ dispatch, userId, searchParams });
    }
  }, [dispatch, userId, searchParams]);

  return (
    <>
      {rewardsFetching ? (
        <Loader />
      ) : (
        <>
          <h2 className={cn(personalStyles.title, 'dark:text-white')}>Награды</h2>
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
    </>
  );
};
