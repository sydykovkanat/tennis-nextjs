'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectTournamentUpdating } from '@/shared/lib/features/tournaments/tournamentsSlice';
import { fetchTournaments, updateTournament } from '@/shared/lib/features/tournaments/tournamentsThunks';
import { TournamentMutation } from '@/shared/types/tournament.types';
import { GlobalError } from '@/shared/types/user.types';
import { toast } from 'sonner';

import { useState } from 'react';

export const useTournamentEdit = (id: string) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectTournamentUpdating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (state: TournamentMutation) => {
    try {
      await dispatch(updateTournament({ id, tournamentMutation: state })).unwrap();
      await dispatch(fetchTournaments());
      handleClose();
      toast.success('Турнир обновлен успешно');
    } catch (error) {
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при обновлении!');
    }
  };

  return {
    isEditing,
    open,
    setOpen,
    handleClose,
    onFormSubmit,
  };
};
