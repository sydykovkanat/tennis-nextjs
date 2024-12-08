'use client';

import React from 'react';
import { CarouselNext, CarouselPrevious } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import styles from './image-modal.module.css';

export const ActionButtons = () => {
  return (
    <>
      <CarouselPrevious className={cn(styles.actionButton, 'left-10')} />
      <CarouselNext className={cn(styles.actionButton, 'right-10')} />
    </>
  );
};
