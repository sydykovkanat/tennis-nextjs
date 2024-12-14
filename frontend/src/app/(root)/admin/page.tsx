'use client';

import { Calendar, Carousel, Category, Footer, News, Partners, Rating, Top, Users } from '@/shared/components/admin';
import { Container } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { ADMIN_PAGES } from '@/shared/config/pages';
import { cn } from '@/shared/lib';

import React, { Suspense } from 'react';

import styles from './admin.module.css';

export default function Page() {
  return (
    <Suspense>
      <Container>
        <h1 className={cn(styles.title)}>Панель Администратора</h1>
        <Tabs orientation={'vertical'} defaultValue={'partners'}>
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
