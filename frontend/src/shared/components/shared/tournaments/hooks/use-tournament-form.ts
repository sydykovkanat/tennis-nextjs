'use client';

import { useFormState } from '@/shared/components/shared/tournaments/hooks/use-form-state';
import { useTournamentFormLogic } from '@/shared/components/shared/tournaments/hooks/use-tournament-form-logic';
import { useTournamentsDelete } from '@/shared/components/shared/tournaments/hooks/use-tournaments-delete';
import { useValidation } from '@/shared/components/shared/tournaments/hooks/use-validation';
import { CURRENT_YEAR_FULL, NEXT_YEAR } from '@/shared/constants';
import { Tournament, TournamentMutation } from '@/shared/types/tournament.types';

import React from 'react';

const emptyState: TournamentMutation = {
  name: '',
  participants: '',
  eventDate: '',
  category: '',
  rank: '',
  regulationsDoc: null,
  resultsLink: '',
  registrationLink: '',
  tournamentYear: '',
};

export const useTournamentForm = (
  setOpen?: (open: boolean) => void,
  existingTournament?: Tournament,
  tournamentsLastYearExist?: boolean,
  id?: string,
) => {
  const initialState = existingTournament
    ? {
        ...existingTournament,
        participants: existingTournament.participants.toString(),
        tournamentYear: existingTournament.tournamentYear.toString(),
      }
    : emptyState;

  const { state, setState, handleChangeSelect, handleChange, fileInputChangeHandler, handleDateChange } =
    useFormState(initialState);

  const {
    handleSubmit: submitLogic,
    handleClose,
    isCreating,
    isEditing,
  } = useTournamentFormLogic(state, setOpen, existingTournament, id);

  const { showWarning, isFormInvalid } = useValidation(state, tournamentsLastYearExist, isCreating, isEditing);

  const { handleDeleteByYear } = useTournamentsDelete();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (state.tournamentYear === NEXT_YEAR.toString() && tournamentsLastYearExist) {
      await handleDeleteByYear(CURRENT_YEAR_FULL.toString());
    }

    await submitLogic();

    setState(initialState);
  };

  return {
    state,
    setState,
    handleChangeSelect,
    handleChange,
    fileInputChangeHandler,
    handleDateChange,
    handleClose,
    showWarning,
    isFormInvalid,
    handleSubmit,
  };
};
