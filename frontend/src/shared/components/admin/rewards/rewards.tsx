import { Loader, RewardForm, useRewardForm, useRewards } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Grid2X2PlusIcon } from 'lucide-react';

import React from 'react';

interface Props {
  id: string;
}

export const Rewards: React.FC<Props> = ({ id }) => {
  const { rewards, rewardsFetching } = useRewards({ id });
  const { open, setOpen } = useRewardForm();

  return (
    <>
      <div className={'flex'}>
        <Button icon={Grid2X2PlusIcon} className={'ml-auto'} onClick={() => setOpen(true)}>
          Добавить награду
        </Button>
        {open && <RewardForm open={open} setOpen={setOpen} userId={id} />}
      </div>

      {rewardsFetching ? <Loader /> : <div className={cn()}></div>}
    </>
  );
};
