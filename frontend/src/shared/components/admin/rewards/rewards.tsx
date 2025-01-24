'use client';

import {
  CustomPagination,
  Loader,
  RewardAdminItem,
  RewardForm,
  getRewards,
  useRewardForm,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { cn, useAppDispatch, useAppSelector } from '@/shared/lib';
import {
  selectRewardFetchError,
  selectRewards,
  selectRewardsFetching,
  selectRewardsPages,
} from '@/shared/lib/features/rewards/rewards-slice';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { Grid2X2PlusIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import React, { useEffect } from 'react';

interface Props {
  id: string;
}

export const Rewards: React.FC<Props> = ({ id }) => {
  const { open, setOpen } = useRewardForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const rewards = useAppSelector(selectRewards);
  const rewardsError = useAppSelector(selectRewardFetchError);
  const pages = useAppSelector(selectRewardsPages);
  const rewardsFetching = useAppSelector(selectRewardsFetching);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    getRewards({ dispatch, userId: currentUser?._id, searchParams, limit: 6 });
  }, [dispatch, currentUser, searchParams]);

  return (
    <>
      <div className={'flex mb-5'}>
        <Button icon={Grid2X2PlusIcon} className={'ml-auto'} onClick={() => setOpen(true)}>
          Добавить награду
        </Button>
        {open && <RewardForm open={open} setOpen={setOpen} userId={id} />}
      </div>

      {rewardsFetching ? (
        <Loader />
      ) : (
        <>
          {!rewards.length ? (
            <p>{rewardsError?.error}</p>
          ) : (
            <div className={cn('grid grid-cols-1 gap-y-2.5')}>
              {rewards.map((reward) => (
                <RewardAdminItem key={reward._id} reward={reward} />
              ))}
            </div>
          )}
        </>
      )}
      {pages > 1 && <CustomPagination total={pages} entity='rewards' />}
    </>
  );
};
