'use client';

import { Title } from '@/shared/components/shared';
import { DialogInHeaderForAdminCarousel } from '@/shared/components/shared';
import { cn } from '@/shared/lib';

import React from 'react';

import styles from './header-carousel.module.css';

interface CarouselHeaderProps {
  className?: string;
}

export const HeaderCarouselForAdmin: React.FC<CarouselHeaderProps> = ({ className }) => {
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
          <DialogInHeaderForAdminCarousel />
        </header>
      </div>
    </>
  );
};
