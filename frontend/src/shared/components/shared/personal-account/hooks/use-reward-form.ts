'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectRewardRemoving } from '@/shared/lib/features/rewards/rewards-slice';
import { removeReward } from '@/shared/lib/features/rewards/rewards-thunks';
import { RewardMutation } from '@/shared/types/reward.types';

import React, { useState } from 'react';

interface Props {
  userId?: string;
  rewardId?: string;
}

export const useRewardForm = ({ userId, rewardId }: Props = {}) => {
  const initialState: RewardMutation = {
    user: userId ? userId : '',
    tournament: '',
    place: undefined,
    nomination: '',
    icon: '',
  };

  const [reward, setReward] = useState<RewardMutation>(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const rewardRemoving = useAppSelector(selectRewardRemoving);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReward((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleIconChange = (icon: string) => {
    setReward((prev) => ({
      ...prev,
      icon,
    }));
  };

  const handleRemove = async () => {
    try {
      const { toast } = await import('sonner');
      if (rewardId && userId) {
        await dispatch(removeReward({ rewardId, userId })).unwrap();
      }
      toast.success('Награда успешно удалена!');
    } catch (e) {
      const { toast } = await import('sonner');
      console.error(e);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return {
    open,
    setOpen,
    reward,
    setReward,
    handleChange,
    handleIconChange,
    initialState,
    handleRemove,
    rewardRemoving,
  };
};
