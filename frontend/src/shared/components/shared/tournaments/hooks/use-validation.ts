import { NEXT_YEAR } from '@/shared/constants';
import { TournamentMutation } from '@/shared/types/tournament.types';

export const useValidation = (state: TournamentMutation, tournamentsLastYearExist?: boolean, isLoading?: boolean) => {
  const showWarning = state.tournamentYear === NEXT_YEAR.toString() && tournamentsLastYearExist;

  const isFormInvalid =
    isLoading ||
    !state.name ||
    !state.rank ||
    !state.participants ||
    !state.eventDate ||
    !state.eventDate ||
    !state.category ||
    !state.registrationLink;

  return { showWarning, isFormInvalid };
};
