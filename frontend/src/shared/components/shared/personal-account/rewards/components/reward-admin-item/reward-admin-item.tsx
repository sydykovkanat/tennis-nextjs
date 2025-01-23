'use client';

import { Confirm, IconComponent, RewardForm, useRewardForm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib';
import { Reward } from '@/shared/types/reward.types';
import { Pencil, Trash } from 'lucide-react';

import React from 'react';

import contentStyles from './../reward-item/reward-item.module.css';
import styles from './reward-admin-item.module.css';

interface Props {
  reward: Reward;
}

export const RewardAdminItem: React.FC<Props> = ({ reward }) => {
  const { rewardRemoving, handleRemove } = useRewardForm({ userId: reward.user, rewardId: reward._id });
  const { open, setOpen } = useRewardForm();

  return (
    <Card className={cn(styles.card, 'dark:bg-[#1F2937]')}>
      <CardContent className={cn(styles.cardContent)}>
        <IconComponent name={reward.icon} place={reward.place || 1} />
        <div className={cn(styles.textContent)}>
          <small className={contentStyles.createdAt}>{reward.createdAt}</small>
          {reward.place && <p className={cn(contentStyles.place)}>{reward.place.toString()} место</p>}
          {reward.nomination && <p>В номинации &#34;{reward.nomination}&#34;</p>}
        </div>
        <div className={styles.cardActions}>
          <Button icon={Pencil} onClick={() => setOpen(true)} />
          {open && <RewardForm isEdit userId={reward.user} rewardId={reward._id} open={open} setOpen={setOpen} />}

          <Confirm onOk={handleRemove}>
            <Button disabled={rewardRemoving === reward._id} icon={Trash} />
          </Confirm>
        </div>
      </CardContent>
    </Card>
  );
};
