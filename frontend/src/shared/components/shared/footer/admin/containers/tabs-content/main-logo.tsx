'use client';

import { MainLogoCards, MainLogoForm } from '@/shared/components/shared';
import { cn } from '@/shared/lib';

import React from 'react';

import styles from './tab-content.module.css';

export const MainLogo = () => {
  return (
    <div className={cn(styles.containerForHeader)}>
      <header className={cn(styles.headerMainLogoContainer)}>
        <MainLogoForm />
      </header>
      <div>
        <MainLogoCards />
      </div>
    </div>
  );
};
