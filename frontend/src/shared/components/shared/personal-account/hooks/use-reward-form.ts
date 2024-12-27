'use client';

import { RewardMutation } from '@/shared/types/reward.types';

import React, { useState } from 'react';

interface Props {
  userId?: string;
}

export const useRewardForm = ({ userId }: Props = {}) => {
  const initialState: RewardMutation = {
    user: userId ? userId : '',
    tournament: '',
    place: 0,
    nomination: '',
    icon: '',
  };

  const [reward, setReward] = useState<RewardMutation>(initialState);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReward((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePlaceChange = (value: string) => {
    setReward((prev) => ({
      ...prev,
      place: Number(value),
    }));
  };

  const handleIconChange = (icon: string) => {
    setReward((prev) => ({
      ...prev,
      icon,
    }));
  };

  return { open, setOpen, reward, setReward, handleChange, handlePlaceChange, handleIconChange, initialState };
};
