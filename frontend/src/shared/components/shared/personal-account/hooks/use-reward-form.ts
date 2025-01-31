'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  selectReward,
  selectRewardCreateError,
  selectRewardRemoving,
  selectRewardUpdateError,
} from '@/shared/lib/features/rewards/rewards-slice';
import { fetchOneReward, removeReward } from '@/shared/lib/features/rewards/rewards-thunks';
import { RewardMutation } from '@/shared/types/reward.types';
import { toast } from 'sonner';

import React, { useEffect, useState } from 'react';

interface Props {
  userId?: string;
  rewardId?: string;
  isEdit?: boolean;
}

export const useRewardForm = ({ userId, rewardId, isEdit }: Props = {}) => {
  const initialState: RewardMutation = {
    user: userId ? userId : '',
    tournament: '',
    place: '',
    nomination: undefined,
    icon: '',
  };

  const [reward, setReward] = useState<RewardMutation>(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const createError = useAppSelector(selectRewardCreateError);
  const updateError = useAppSelector(selectRewardUpdateError);
  const fetchedReward = useAppSelector(selectReward);
  const rewardRemoving = useAppSelector(selectRewardRemoving);

  useEffect(() => {
    if (rewardId && isEdit) {
      dispatch(fetchOneReward(rewardId)).unwrap();
    }
  }, [rewardId, dispatch, isEdit]);

  useEffect(() => {
    if (fetchedReward && isEdit) {
      setReward(fetchedReward);
    }
  }, [fetchedReward, setReward, isEdit]);

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
      if (rewardId && userId) {
        await dispatch(removeReward({ rewardId, userId })).unwrap();
      }
      toast.success('Награда успешно удалена!');
    } catch (e) {
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
    createError,
    updateError,
  };
};
