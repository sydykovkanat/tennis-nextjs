'use client';

import { Confirm, Loader } from '@/shared/components/shared';
import { useMainLogoCards } from '@/shared/components/shared/footer/admin/components/main-logo/main-logo-cards/use-main-logo-cards';
import { Button } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { Trash } from 'lucide-react';

import React from 'react';

import styles from './main-logo-cards.module.css';

export const MainLogoCards = () => {
  const { logos, itemsLoading, handleLogoClick, handleDeleteLogo, logoId } = useMainLogoCards();

  return (
    <div className={cn(logos.length === 0 ? styles.containerMainLogoItemNoText : styles.containerMainLogoItem)}>
      {itemsLoading ? (
        <div>
          <Loader />
        </div>
      ) : logos.length === 0 ? (
        <small className={styles.noLogoText}> Логотипы не были найдены </small>
      ) : (
        logos.map((logo) => (
          <div
            key={logo._id}
            className={cn(styles.cardMainLogo, 'dark:bg-[#1F2937]', logo._id === logoId && styles.selectedLogo)}
            onClick={() => handleLogoClick(logo._id)}
            data-test-id='update-logo-header'
          >
            <div className={cn(styles.blockImage)}>
              <img className={cn(styles.image)} src={API_URL + '/' + logo.logo} alt={logo._id} />
            </div>

            <Confirm onOk={() => handleDeleteLogo(logo._id)}>
              <div
                className={cn(styles.btnDelete)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Button data-test-id='delete-logo-header'>
                  <Trash />
                </Button>
              </div>
            </Confirm>
          </div>
        ))
      )}
    </div>
  );
};
