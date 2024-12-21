'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { deleteEmptyQueryStrings } from '@/shared/lib';
import { fetchRewards } from '@/shared/lib/features/rewards/rewards-thunks';
import { selectRewards, selectRewardsFetching } from '@/shared/lib/features/rewards/rewards-slice';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { Filters, Query } from '@/shared/types/root.types';

import { useEffect } from 'react';

export const UseRewards = () => {
  const dispatch = useAppDispatch();
  const rewards = useAppSelector(selectRewards);
  const rewardsFetching = useAppSelector(selectRewardsFetching);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (Array.isArray(rewards) && !rewards.length) {
      const queryObj: Query | undefined = currentUser ? { userId: currentUser._id } : undefined;

      const validatedQuery = queryObj && deleteEmptyQueryStrings(queryObj);
      const data: Filters = { query: validatedQuery };

      dispatch(fetchRewards(data));
    }
  }, [dispatch, rewards, currentUser]);

  return { rewards, rewardsFetching };
};
