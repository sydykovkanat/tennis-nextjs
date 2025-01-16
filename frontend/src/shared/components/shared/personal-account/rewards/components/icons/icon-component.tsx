'use client';

import { Cup, useRewards } from '@/shared/components/shared';

import React from 'react';

interface Props {
  name: string;
  place: number;
}

export const IconComponent: React.FC<Props> = ({ name, place }) => {
  const { iconVariants, getIconClass } = useRewards();

  const IconComponent = iconVariants[name] || Cup;
  return <IconComponent className={getIconClass(place)} />;
};
