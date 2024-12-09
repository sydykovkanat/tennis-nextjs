'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectTournamentCreating } from '@/shared/lib/features/tournaments/tournamentsSlice';
import { createTournament, fetchTournaments } from '@/shared/lib/features/tournaments/tournamentsThunks';
import { TournamentMutation } from '@/shared/types/tournament.types';
import { GlobalError } from '@/shared/types/user.types';
import { toast } from 'sonner';

import { useState } from 'react';

export const useTournamentNew = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectTournamentCreating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (state: TournamentMutation) => {
    try {
      await dispatch(createTournament(state)).unwrap();
      await dispatch(fetchTournaments());
      handleClose();
      toast.success('Турнир создан успешно');
    } catch (error) {
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при создании!');
    }
  };

  return { isCreating, open, setOpen, handleClose, onFormSubmit };
};
