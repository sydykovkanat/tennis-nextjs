'use client';

import { useRankFilter } from '@/shared/components/shared/tournaments/hooks';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui';
import { RANK_TABS } from '@/shared/config';
import { cn } from '@/shared/lib';

import React from 'react';

import styles from './rank-filter.module.css';

interface Props {
  className?: string;
}
export const RankFilter: React.FC<Props> = ({ className }) => {
  const { selectedRank, updateRank } = useRankFilter();

  return (
    <Tabs value={selectedRank} onValueChange={updateRank} className={className}>
      <TabsList className={cn(styles.tabsList)}>
        {RANK_TABS.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className={cn(styles.tabsTriggers, 'dark:text-white text-black')}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
