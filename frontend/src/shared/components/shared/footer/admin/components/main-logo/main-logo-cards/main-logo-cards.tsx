'use client';

import React from 'react';
import styles from './main-logo-cards.module.css';
import {cn} from '@/shared/lib';
import {
    useMainLogoCards
} from '@/shared/components/shared/footer/admin/components/main-logo/main-logo-cards/use-main-logo-cards';
import {API_URL} from '@/shared/constants';
import {Loader} from '@/shared/components/shared';
import {Button} from '@/shared/components/ui';
import {Trash} from 'lucide-react';

export const MainLogoCards = () => {
    const { logos, itemsLoading, handleLogoClick, activeLogoId } = useMainLogoCards();

    return (
        <div className={cn(styles.containerMainLogoItem)}>
            {itemsLoading ? (
                <Loader/>
            ) :  logos?.map((logo) => (
                <div key={logo._id} className={cn(styles.cardMainLogo, 'dark:bg-[#1F2937]',)}>
                    <div onClick={() => handleLogoClick(logo._id, logo.logo)}>
                        <img className={cn(styles.image, activeLogoId === logo._id && 'border-2 dark:bg-[#1F2937]')}
                             src={API_URL + '/' + logo.logo}
                             alt={logo._id}
                        />
                    </div>

                    <div className={cn(styles.btnDelete)}>
                        <Button> <Trash/> </Button>
                    </div>
                </div>

            ))}
        </div>
    );
};

