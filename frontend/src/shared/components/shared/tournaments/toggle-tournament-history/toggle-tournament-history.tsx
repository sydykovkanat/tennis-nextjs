'use client';

import { toggleAddTournament } from '@/actions/tournamentHistory';
import { Button } from '@/shared/components/ui';
import { cn, useAppDispatch } from '@/shared/lib';
import { fetchTournamentHistory } from '@/shared/lib/features/tournament-history/tournament-history-thunks';
import { Filters } from '@/shared/types/root.types';
import { Heart } from 'lucide-react';

import React, { useEffect, useState } from 'react';

import { useFetchUser } from '../../personal-account/hooks';
import styles from './toggle-button.module.css';

interface ToggleTournamentHistoryProps {
  tournamentId: string;
  isHistory?: boolean;
}

export const ToggleTournamentHistory: React.FC<ToggleTournamentHistoryProps> = ({
  tournamentId,
  isHistory = false,
}) => {
  const dispatch = useAppDispatch();
  const user = useFetchUser();
  const [userId, setUserId] = useState<string | null>(null);
  const [isCoolDown, setIsCoolDown] = useState(false);

  useEffect(() => {
    if (user?._id) {
      setUserId(user._id);
    }
  }, [user?._id]);

  const handleClick = async () => {
    if (!userId || isCoolDown) return;

    setIsCoolDown(true);
    const filters: Filters = { query: { userId } };

    try {
      await toggleAddTournament(filters, tournamentId);
      if (isHistory) {
        await dispatch(fetchTournamentHistory(filters));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsCoolDown(false), 1500);
    }
  };

  return <Button icon={Heart} onClick={handleClick} disabled={isCoolDown} className={cn(styles.toggleButton)} />;
};
