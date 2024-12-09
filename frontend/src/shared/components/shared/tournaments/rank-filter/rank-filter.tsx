'use client';

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import styles from './rank-filter.module.css';

export const RankFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRank = searchParams.get('rank') || 'all';
  const [selectedRank, setSelectedRank] = useState(initialRank);

  const handleRankChange = (rank: string) => {
    setSelectedRank(rank);
    const params = new URLSearchParams(searchParams);
    params.set('rank', rank);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    setSelectedRank(searchParams.get('rank') || 'all');
  }, [searchParams]);

  return (
    <Tabs value={selectedRank} onValueChange={handleRankChange}>
      <TabsList className={styles.tabsList}>
        {[
          { value: 'all', label: 'Все' },
          { value: 'male', label: 'Мужские' },
          { value: 'female', label: 'Женские' },
          { value: 'mixed', label: 'Микст' },
        ].map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className={styles.tabsTriggers}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
