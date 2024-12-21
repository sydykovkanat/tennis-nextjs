'use client';

import { UseRewards } from '@/shared/components/shared';
import { cn } from '@/shared/lib';

export const Rewards = () => {
  const { rewards, rewardsFetching } = UseRewards();
  console.log(rewards);


  return (
    <>
      <h2 className={cn('text-xl dark:text-black font-semibold')}>Награды</h2>
      <p></p>
    </>
  );
};
