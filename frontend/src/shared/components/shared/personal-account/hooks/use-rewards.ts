'use client';

import { Cup, Medal, Racket } from '@/shared/components/shared';
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

// interface Props {
//   id?: string;
// }
// { id }: Props = {}
export const useRewards = () => {
  const dispatch = useAppDispatch();
  const rewards = useAppSelector(selectRewards);
  const fetchError = useAppSelector(selectRewardFetchError);
  const rewardsFetching = useAppSelector(selectRewardsFetching);
  const currentUser = useAppSelector(selectCurrentUser);
  const iconVariants: { [key: string]: FC<{ className?: string }> } = {
    medal: Medal,
    cup: Cup,
    racket: Racket,
  };

  useEffect(() => {
    const userId = currentUser?._id;

    if (userId && Array.isArray(rewards) && !rewards.length) {
      const queryObj: Query | undefined = { userId };

      const validatedQuery = queryObj && deleteEmptyQueryStrings(queryObj);
      const data: Filters = { query: validatedQuery };

      dispatch(fetchRewards(data));
    }
  }, [dispatch, rewards, currentUser]);

  const getIconClass = (place: number) => cn(place > 1 ? 'text-[#F9DD54]' : 'text-[#F9AC2F]', 'cursor-pointer');

  return { rewards, fetchError, rewardsFetching, getIconClass, iconVariants };
};
