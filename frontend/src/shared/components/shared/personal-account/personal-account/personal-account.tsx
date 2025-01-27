'use client';

import {
  Container,
  GradientCircle,
  PersonalData,
  Rewards,
  SavedTournaments,
  useTabsWithRewards,
  userCircles,
} from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import { Suspense } from 'react';

import styles from './personal-account.module.css';

const PersonalAccount = () => {
  const { currentTab, handleTabChange } = useTabsWithRewards();

  return (
    <Suspense>
      <Container>
        {userCircles.map((circle, id) => (
          <GradientCircle key={id} {...circle} />
        ))}

        <h1 className={cn(styles.title)}>Личный кабинет</h1>
        <Tabs value={currentTab} orientation={'vertical'} defaultValue={currentTab} onValueChange={handleTabChange}>
          <ScrollArea className={cn(styles.tabsScroll)}>
            <TabsList className={cn(styles.tabsList)}>
              <TabsTrigger value='personalData' className={cn(styles.tabsTrigger, 'dark:text-white')}>
                Мои данные
              </TabsTrigger>
              <TabsTrigger value='rewards' className={cn(styles.tabsTrigger, 'dark:text-white')}>
                Награды
              </TabsTrigger>
              <TabsTrigger value='tournaments' className={cn(styles.tabsTrigger, 'dark:text-white')}>
                Турниры
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation={'horizontal'} />
          </ScrollArea>
          <div className={cn(styles.box, 'dark:bg-[#1F2937]')}>
            <TabsContent value={'personalData'}>
              <PersonalData />
            </TabsContent>
            <TabsContent value={'rewards'}>
              <Rewards />
            </TabsContent>
            <TabsContent value={'tournaments'}>
              <SavedTournaments />
            </TabsContent>
          </div>
        </Tabs>
      </Container>
    </Suspense>
  );
};

export default PersonalAccount;
