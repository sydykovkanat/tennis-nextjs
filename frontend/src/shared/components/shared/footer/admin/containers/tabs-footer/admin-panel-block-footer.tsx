'use client';

import { MainLogo, MainPartner, MenuPosition, PublicOffer, SocialNetwork } from '@/shared/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import { ListTabsName } from '../../constants';
import styles from './admin-panel-block-footer.module.css';
import { useFooterTabs } from './use-footer-tabs';

export const AdminPanelBlockFooter = () => {
  const { footerTab, handleFooterTabChange } = useFooterTabs();

  return (
    <>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Подвал сайта</h2>
          <small className={styles.subtitle}>Элементы управления контентом и его созданием</small>
        </div>
      </div>
      <Tabs defaultValue='social-network' value={footerTab} onValueChange={handleFooterTabChange}>
        <TabsList className={cn(styles.tabsList, 'dark:bg-[#1F2937]')}>
          {ListTabsName.map((item, id) => (
            <TabsTrigger key={id} className={styles.tabsTrigger} value={item.value}>
              {item.name}
            </TabsTrigger>
          ))}
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
        <TabsContent value='main-logo'>
          <MainLogo />
        </TabsContent>
      </Tabs>
    </>
  );
};
