'use client';

import React from 'react';
import styles from './main-logo-cards.module.css';
import {cn} from '@/shared/lib';
import {
    useMainLogoCards
} from '@/shared/components/shared/footer/admin/components/main-logo/main-logo-cards/use-main-logo-cards';
import {API_URL} from '@/shared/constants';
import {Confirm, Loader} from '@/shared/components/shared';
import {Button} from '@/shared/components/ui';
import {Trash} from 'lucide-react';

export const MainLogoCards = () => {
    const { logos, itemsLoading, handleLogoClick, handleDeleteLogo } = useMainLogoCards();

    return (
        <div className={cn(styles.containerMainLogoItem)}>
            {itemsLoading ? (
                <Loader/>
            ) :  logos?.map((logo) => (
                <div key={logo._id}
                     className={cn(styles.cardMainLogo, 'dark:bg-[#1F2937]',)}
                     onClick={() => handleLogoClick(logo._id)}
                     data-test-id='update-logo-header'
                >
                    <div>
                        <img className={cn(styles.image)}
                             src={API_URL + '/' + logo.logo}
                             alt={logo._id}
                        />
                    </div>

                    <Confirm onOk={() => handleDeleteLogo(logo._id)}>
                        <div className={cn(styles.btnDelete)} onClick={(e) => {
                            e.stopPropagation();
                        }}>
                            <Button  data-test-id='delete-logo-header'> <Trash/> </Button>
                        </div>
                    </Confirm>

                </div>

            ))}
        </div>
    );
};

