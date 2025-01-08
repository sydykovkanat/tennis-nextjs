'use client';

import { Cup, Medal } from '@/shared/components/shared';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { cn, deleteEmptyQueryStrings } from '@/shared/lib';
import {
  selectRewardFetchError,
  selectRewards,
  selectRewardsFetching,
} from '@/shared/lib/features/rewards/rewards-slice';
import { fetchRewards } from '@/shared/lib/features/rewards/rewards-thunks';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { Filters, Query } from '@/shared/types/root.types';

import { FC, useEffect } from 'react';

interface Props {
  id?: string;
}

export const useRewards = ({ id }: Props = {}) => {
  const dispatch = useAppDispatch();
  const rewards = useAppSelector(selectRewards);
  const fetchError = useAppSelector(selectRewardFetchError);
  const rewardsFetching = useAppSelector(selectRewardsFetching);
  const currentUser = useAppSelector(selectCurrentUser);
  const iconVariants: { [key: string]: FC<{ className?: string }> } = {
    medal: Medal,
    cup: Cup,
  };

  useEffect(() => {
    const userId = id ? id : !id && currentUser ? currentUser?._id : undefined;

    if (Array.isArray(rewards) && !rewards.length) {
      const queryObj: Query | undefined = userId ? { userId } : undefined;

      const validatedQuery = queryObj && deleteEmptyQueryStrings(queryObj);
      const data: Filters = { query: validatedQuery };

      dispatch(fetchRewards(data));
    }
  }, [dispatch, rewards, currentUser, id]);

  const getIconClass = (place: number) => cn(place > 1 ? 'text-[#F9DD54]' : 'text-[#F9AC2F]', 'cursor-pointer');

  return { rewards, fetchError, rewardsFetching, getIconClass, iconVariants };
};
