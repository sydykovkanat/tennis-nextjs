'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { cn, deleteEmptyQueryStrings } from '@/shared/lib';
import { selectRewards, selectRewardsFetching } from '@/shared/lib/features/rewards/rewards-slice';
import { fetchRewards } from '@/shared/lib/features/rewards/rewards-thunks';
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

  const getIconClass = (place: number) => cn(place > 1 ? 'text-[#F9DD54]' : 'text-[#F9AC2F]', 'cursor-pointer');

  return { rewards, rewardsFetching, getIconClass };
};
