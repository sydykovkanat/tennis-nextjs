import { useRankFilter } from '@/shared/components/shared/tournaments/hooks/use-rank-filter';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectTournamentCreating, selectTournamentUpdating } from '@/shared/lib/features/tournaments/tournamentsSlice';
import {
  createTournament,
  fetchTournaments,
  updateTournament,
} from '@/shared/lib/features/tournaments/tournamentsThunks';
import { Tournament, TournamentMutation } from '@/shared/types/tournament.types';
import { GlobalError } from '@/shared/types/user.types';
import { toast } from 'sonner';

export const useTournamentFormLogic = (
  state: TournamentMutation,
  setOpen?: (open: boolean) => void,
  existingTournament?: Tournament,
  id?: string,
) => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectTournamentCreating);
  const isEditing = useAppSelector(selectTournamentUpdating);
  const { selectedRank } = useRankFilter();

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (existingTournament && id) {
        await dispatch(updateTournament({ id, tournamentMutation: state })).unwrap();
        toast.success('Турнир обновлен успешно');
      } else {
        await dispatch(createTournament(state)).unwrap();
        toast.success('Турнир создан успешно');
      }
      await dispatch(fetchTournaments(selectedRank));
    } catch (error) {
      const backendError = error as GlobalError;
      toast.error(
        backendError.error || `Что-то пошло не так при ${existingTournament ? 'редактировании' : 'создании'}!`,
      );
    } finally {
      handleClose();
    }
  };

  return { handleSubmit, handleClose, isCreating, isEditing };
};
