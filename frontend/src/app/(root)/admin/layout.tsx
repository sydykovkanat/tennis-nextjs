'use client';

import { Container } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { ADMIN_PAGES } from '@/shared/config/pages';
import { cn } from '@/shared/lib';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';

import styles from './admin.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState<string>('partners');
  const router = useRouter();

  useEffect(() => {
    const savedTab = sessionStorage.getItem('adminPanelTab');
    if (savedTab) {
      setCurrentTab(savedTab);
      void router.push(`/admin/${savedTab}`);
    } else {
      void router.push('/admin/partners');
    }
  }, [router]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    sessionStorage.setItem('adminPanelTab', newTab);
  };

  return (
    <Container>
      <h1 className={cn(styles.title)}>Панель Администратора</h1>
      <Tabs value={currentTab} onValueChange={handleTabChange} orientation={'vertical'} defaultValue={'partners'}>
        <ScrollArea className={cn(styles.scroll)}>
          <TabsList className={cn(styles.tabsList, 'dark:bg-[#1F2937]')}>
            {ADMIN_PAGES.map((page, i) => (
              <Link key={i} href={page.url}>
                <TabsTrigger
                  className={cn('focus:dark:bg-gray-700', currentTab === page.value && 'dark:bg-gray-700')}
                  value={page.value}
                >
                  {page.name}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
        {ADMIN_PAGES.map((page, i) => (
          <TabsContent value={page.value} key={i}>
            {children}
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  );
}
