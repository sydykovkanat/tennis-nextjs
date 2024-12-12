'use client';

import { getUpdatedSearchParams } from '@/shared/lib';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export const useRankFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRank = searchParams.get('rank') || 'all';
  const [selectedRank, setSelectedRank] = useState(initialRank);

  const updateRank = (rank: string) => {
    setSelectedRank(rank);
    const newUrl = getUpdatedSearchParams(searchParams, 'rank', rank);
    router.push(newUrl);
  };

  useEffect(() => {
    setSelectedRank(searchParams.get('rank') || 'all');
  }, [searchParams]);

  return { selectedRank, updateRank };
};
