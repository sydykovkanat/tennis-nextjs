import { useFormState } from '@/shared/components/shared/tournaments/hooks/use-form-state';
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
  onSubmit: (tournament: TournamentMutation) => void,
  existingTournament?: Tournament,
  tournamentsLastYearExist?: boolean,
  isLoading?: boolean,
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

  const { showWarning, isFormInvalid } = useValidation(state, tournamentsLastYearExist, isLoading);

  const { handleDeleteByYear } = useTournamentsDelete();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (state.tournamentYear === NEXT_YEAR.toString() && tournamentsLastYearExist) {
      await handleDeleteByYear(CURRENT_YEAR_FULL.toString());
    }

    onSubmit({
      ...state,
    });

    setState(initialState);
  };

  return {
    state,
    setState,
    handleChangeSelect,
    handleChange,
    fileInputChangeHandler,
    handleDateChange,
    showWarning,
    isFormInvalid,
    handleSubmit,
  };
};
