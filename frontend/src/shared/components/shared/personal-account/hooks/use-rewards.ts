'use client';

import { Cup, Medal, Racket } from '@/shared/components/shared';
import { cn } from '@/shared/lib';

import { FC } from 'react';

export const useRewards = () => {
  const iconVariants: { [key: string]: FC<{ className?: string }> } = {
    medal: Medal,
    cup: Cup,
    racket: Racket,
  };

  const getIconClass = (place: number) => cn(place > 1 ? 'text-[#F9DD54]' : 'text-[#F9AC2F]', 'cursor-pointer');

  return { getIconClass, iconVariants };
};
