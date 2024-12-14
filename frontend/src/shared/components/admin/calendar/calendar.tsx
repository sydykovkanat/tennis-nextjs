'use client';

import { AdminCalendar } from '@/shared/components/shared';
import { useTournaments } from '@/shared/components/shared/tournaments/hooks';
import { useSearchParams } from 'next/navigation';

import React from 'react';

export const Calendar: React.FC = () => {
  const searchParams = useSearchParams();
  const rank = searchParams.get('rank') || 'all';
  const { tournaments } = useTournaments(rank);

  return <AdminCalendar tournaments={tournaments} />;
};
