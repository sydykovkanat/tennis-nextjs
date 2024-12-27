'use client';

import React from 'react';
import styles from './main-logo-cards.module.css';
import {cn} from '@/shared/lib';
import {
    useMainLogoCards
} from '@/shared/components/shared/footer/admin/components/main-logo/main-logo-cards/use-main-logo-cards';

export const MainLogoCards = () => {
    const { itemData } = useMainLogoCards();
    console.log(itemData[0]?.mainLogo);
    return (
        <div className={cn(styles.containerMainLogoItem, 'dark:bg-[#1F2937]')}>
            hello
        </div>
    );
};

