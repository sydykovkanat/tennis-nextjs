'use client';

import { AdminCarouselDialog, Title } from '@/shared/components/shared';
import { cn } from '@/shared/lib';

import React from 'react';

import styles from './admin-carousel-header.module.css';

interface CarouselHeaderProps {
  className?: string;
}

export const AdminCarouselHeader: React.FC<CarouselHeaderProps> = ({ className }) => {
  return (
    <>
      <div className={cn(styles.containerForHeader, className)}>
        <header className={cn(styles.header, className)}>
          <div>
            <Title variant={'h1'} className={cn(styles.mainText, className)}>
              Карусель
            </Title>
            <small className={cn(styles.subText, className)}>Управление фотографиями главной карусели</small>
          </div>
          <AdminCarouselDialog mode={'add'} />
        </header>
      </div>
    </>
  );
};
