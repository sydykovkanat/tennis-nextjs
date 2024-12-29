'use client';

import React from 'react';
import styles from './main-logo-cards.module.css';
import {cn} from '@/shared/lib';
import {
    useMainLogoCards
} from '@/shared/components/shared/footer/admin/components/main-logo/main-logo-cards/use-main-logo-cards';
import {API_URL} from '@/shared/constants';
import {Loader} from '@/shared/components/shared';

export const MainLogoCards = () => {
    const { logos, itemsLoading, handleLogoClick } = useMainLogoCards();

    return (
        <div className={cn(styles.containerMainLogoItem)}>
            {itemsLoading ? (
                <Loader/>
            ) :  logos?.map((logo) => (
                <div
                    key={logo._id}
                    className={cn(styles.cardMainLogo, 'dark:bg-[#1F2937]')}
                    onClick={() => handleLogoClick(logo._id, logo.logo)}
                >
                        <div>
                            <img className={cn(styles.image)} src={API_URL + '/' + logo.logo} alt={logo._id}/>
                        </div>

                    </div>
                    ))}
                </div>
            );
            };

