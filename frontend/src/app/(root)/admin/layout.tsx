'use client';

import { Container } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { ADMIN_PAGES } from '@/shared/config/pages';
import { cn } from '@/shared/lib';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';

import styles from './admin.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState<string>('partners');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedTab = sessionStorage.getItem('adminPanelTab');
    const currentQueryParams = searchParams.toString();
    const queryString = currentQueryParams ? `?${currentQueryParams}` : '';

    if (savedTab) {
      setCurrentTab(savedTab);
      void router.push(`/admin/${savedTab}${queryString}`);
    } else {
      void router.push(`/admin/partners${queryString}`);
    }
  }, [router, searchParams]);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    sessionStorage.setItem('adminPanelTab', newTab);
  };

  return (
    <Container>
      <h1 className={cn(styles.title)}>Панель Администратора</h1>
      <Tabs value={currentTab} onValueChange={handleTabChange} orientation={'vertical'} defaultValue={'partners'}>
        <ScrollArea className={cn(styles.scroll)}>
          <TabsList className={cn(styles.tabsList)}>
            {ADMIN_PAGES.map((page, i) => (
              <Link key={i} href={page.url}>
                <TabsTrigger value={page.value}>{page.name}</TabsTrigger>
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
