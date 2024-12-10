'use client';

import { MainPartner, MenuPosition, PublicOffer, SocialNetwork } from '@/shared/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';

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
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Подвал сайта</h1>
          <small className={styles.subtitle}>Элементы управления контентом и его созданием.</small>
        </div>
      </header>
      <Tabs defaultValue='social-network' value={footerTab} onValueChange={handleFooterTabChange}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger className={styles.tabsTrigger} value='social-network'>
            Социальные сети
          </TabsTrigger>
          <TabsTrigger className={styles.tabsTrigger} value='menu-position'>
            Меню положение
          </TabsTrigger>
          <TabsTrigger className={styles.tabsTrigger} value='public-offer'>
            Публичная оферта
          </TabsTrigger>
          <TabsTrigger className={styles.tabsTrigger} value='main-partner'>
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
