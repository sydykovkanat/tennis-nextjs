'use client';

import { toggleAddTournament } from '@/actions/tournamentHistory';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Filters } from '@/shared/types/root.types';
import { Heart } from 'lucide-react';

import React, { useEffect, useState } from 'react';

import { useFetchUser } from '../../personal-account/hooks';
import styles from './toggle-button.module.css';

interface ToggleTournamentHistoryProps {
  tournamentId: string;
}

export const ToggleTournamentHistory: React.FC<ToggleTournamentHistoryProps> = ({ tournamentId }) => {
  const user = useFetchUser();
  const [filters, setFilters] = useState<Filters>({
    query: {
      userId: '',
    },
  });

  useEffect(() => {
    if (user?._id) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        query: {
          ...prevFilters.query,
          userId: user._id,
        },
      }));
    }
  }, [user?._id]);

  return (
    <Button
      icon={Heart}
      onClick={() => toggleAddTournament(filters, tournamentId)}
      className={cn(styles.toggleButton)}
    />
  );
};
