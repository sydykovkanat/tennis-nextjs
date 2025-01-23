'use client';

import { CarouselNext, CarouselPrevious } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import React from 'react';

import styles from './image-modal.module.css';

export const ActionButtons = () => {
  return (
    <>
      <CarouselPrevious className={cn(styles.actionButton, 'left-10')} aria-label={'carousel-prev'} />
      <CarouselNext className={cn(styles.actionButton, 'right-10')} aria-label={'carousel-next'} />
    </>
  );
};
