'use client';

import { AdminCalendar } from '@/shared/components/shared';
import { useTournaments } from '@/shared/components/shared/tournaments/hooks';

import React from 'react';

interface Props {
  searchParams: { rank?: string };
}

export default function CalendarPage({ searchParams }: Props) {
  const rank = searchParams.rank || 'all';
  const { tournaments } = useTournaments(rank);

  return (
    <>
      <AdminCalendar tournaments={tournaments} />
    </>
  );
}
