'use client';

import { Container, GradientCircle, PersonalData, userCircles } from '@/shared/components/shared';
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import React, { useEffect, useState } from 'react';

const PersonalAccount = () => {
  const [currentTab, setCurrentTab] = useState<string>('personalData');

  useEffect(() => {
    const savedTab = sessionStorage.getItem('personalAccount');
    if (savedTab) {
      setCurrentTab(savedTab);
    }
  }, []);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    sessionStorage.setItem('personalAccount', newTab);
  };

  return (
    <Container className={'w-full'}>
      {userCircles.map((circle, id) => (
        <GradientCircle key={id} {...circle} />
      ))}
      <div
        className={cn('bg-white p-[25px] sm:p-[40px] rounded-lg dark:bg-[#1F2937]')}
        style={{ boxShadow: '2px 0 89px 0 rgba(0, 0, 0, 0.1)' }}
      >
        <div className={cn()}>
          <h1 className={cn('text-xl xs:text-2xl font-medium leading-none border-b pb-2 mb-4')}>Личный кабинет</h1>

          <Tabs value={currentTab} orientation={'vertical'} defaultValue={currentTab} onValueChange={handleTabChange}>
            <ScrollArea className={cn('max-w-max pb-3')}>
              <TabsList className={cn('flex items-center gap-1 bg-zinc-200/30 border dark:bg-[#1F2937]')}>
                <TabsTrigger value='personalData'>Мои данные</TabsTrigger>
                <TabsTrigger value='rewards'>Награды</TabsTrigger>
              </TabsList>
            </ScrollArea>

            <TabsContent value={'personalData'}>
              <PersonalData />
            </TabsContent>
            <TabsContent value={'rewards'}>
              <div>Hello world!</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Container>
  );
};

export default PersonalAccount;
