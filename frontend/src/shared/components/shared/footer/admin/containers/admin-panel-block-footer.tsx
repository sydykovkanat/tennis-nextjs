'use client';

import { MainPartner, MenuPosition, PublicOffer, SocialNetwork } from '@/shared/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import { useEffect, useState } from 'react';

import styles from './admin-panel-block-footer.module.css';

export const AdminPanelBlockFooter = () => {
  const [footerTab, setFooterTab] = useState<string>('social-network');

  useEffect(() => {
    const savedFooterTab = sessionStorage.getItem('footerTab');
    if (savedFooterTab) {
      setFooterTab(savedFooterTab);
    }
  }, []);

  const handleFooterTabChange = (newTab: string) => {
    setFooterTab(newTab);
    sessionStorage.setItem('footerTab', newTab);
  };

  return (
    <>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Подвал сайта</h2>
          <small className={styles.subtitle}>Элементы управления контентом и его созданием.</small>
        </div>
      </div>
      <Tabs defaultValue='social-network' value={footerTab} onValueChange={handleFooterTabChange}>
        <TabsList className={cn(styles.tabsList, 'dark:bg-[#1F2937]')}>
          <TabsTrigger
            className={cn(
              styles.tabsTrigger,
              footerTab === 'social-network' && 'dark:bg-gray-700',
              'focus:dark:bg-gray-700',
            )}
            value='social-network'
          >
            Социальные сети
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              styles.tabsTrigger,
              footerTab === 'menu-position' && 'dark:bg-gray-700',
              'focus:dark:bg-gray-700',
            )}
            value='menu-position'
          >
            Меню положение
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              styles.tabsTrigger,
              footerTab === 'public-offer' && 'dark:bg-gray-700',
              'focus:dark:bg-gray-700',
            )}
            value='public-offer'
          >
            Публичная оферта
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              styles.tabsTrigger,
              footerTab === 'main-partner' && 'dark:bg-gray-700',
              'focus:dark:bg-gray-700',
            )}
            value='main-partner'
          >
            Ген.партнер
          </TabsTrigger>
        </TabsList>
        <TabsContent value='social-network'>
          <SocialNetwork />
        </TabsContent>
        <TabsContent value='menu-position'>
          <MenuPosition />
        </TabsContent>
        <TabsContent value='public-offer'>
          <PublicOffer />
        </TabsContent>
        <TabsContent value='main-partner'>
          <MainPartner />
        </TabsContent>
      </Tabs>
    </>
  );
};
