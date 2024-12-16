'use client';

import { Calendar, Carousel, Category, Footer, News, Partners, Rating, Top, Users } from '@/shared/components/admin';
import { Container } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { ADMIN_PAGES } from '@/shared/config/pages';
import { cn } from '@/shared/lib';
import { useRouter, useSearchParams } from 'next/navigation';

import React, { Suspense, useEffect, useState } from 'react';

import styles from './admin.module.css';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultTab = 'calendar';
  const [currentTab, setCurrentTab] = useState(searchParams.get('tab') || defaultTab);

  useEffect(() => {
    if (currentTab) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('tab', currentTab);
      router.replace(newUrl.toString(), { scroll: false });
    }
  }, [currentTab, router]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <Suspense>
      <Container>
        <h1 className={cn(styles.title)}>Панель Администратора</h1>
        <Tabs value={currentTab} orientation={'vertical'} defaultValue={defaultTab} onValueChange={handleTabChange}>
          <ScrollArea className={cn(styles.scroll)}>
            <TabsList className={cn(styles.tabsList, 'dark:bg-[#1F2937]')}>
              {ADMIN_PAGES.map((page, i) => (
                <TabsTrigger key={i} value={page.value}>
                  {page.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation={'horizontal'} />
          </ScrollArea>
          <TabsContent value={'calendar'}>
            <Calendar />
          </TabsContent>
          <TabsContent value={'carousel'}>
            <Carousel />
          </TabsContent>
          <TabsContent value={'rating'}>
            <Rating />
          </TabsContent>
          <TabsContent value={'news'}>
            <News />
          </TabsContent>
          <TabsContent value={'footer'}>
            <Footer />
          </TabsContent>
          <TabsContent value={'partners'}>
            <Partners />
          </TabsContent>
          <TabsContent value={'top'}>
            <Top />
          </TabsContent>
          <TabsContent value={'category'}>
            <Category />
          </TabsContent>
          <TabsContent value={'users'}>
            <Users />
          </TabsContent>
        </Tabs>
      </Container>
    </Suspense>
  );
}
