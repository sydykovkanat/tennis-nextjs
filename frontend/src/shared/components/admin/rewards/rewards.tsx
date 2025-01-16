'use client';

import {
  CustomPagination,
  Loader,
  RewardAdminItem,
  RewardForm,
  useRewardForm,
  useRewards,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Grid2X2PlusIcon } from 'lucide-react';

import React from 'react';

interface Props {
  id: string;
}

export const Rewards: React.FC<Props> = ({ id }) => {
  const { rewards, fetchError, rewardsFetching } = useRewards();
  const { open, setOpen } = useRewardForm();

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
      ) : rewards.length ? (
        <div className={cn('grid grid-cols-1 gap-y-2.5')}>
          {rewards.map((reward) => (
            <RewardAdminItem key={reward._id} reward={reward} />
          ))}
          <CustomPagination total={5} />
        </div>
      ) : (
        <p>{fetchError?.error}</p>
      )}
    </>
  );
};
