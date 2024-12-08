import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectSelectedRank, selectTournamentDeleting } from '@/shared/lib/features/tournaments/tournamentsSlice';
import {
  deleteTournament,
  deleteTournamentsByYear,
  fetchTournaments,
} from '@/shared/lib/features/tournaments/tournamentsThunks';
import { toast } from 'sonner';

export const useTournamentsDelete = () => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectTournamentDeleting);
  const selectedRank = useAppSelector(selectSelectedRank);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTournament(id)).unwrap();
      await dispatch(fetchTournaments(selectedRank));
      toast.success('Удаление прошло успешно!');
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так!');
    }
  };

  const handleDeleteByYear = async (year: string) => {
    try {
      await dispatch(deleteTournamentsByYear(year)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return { isDeleting, handleDelete, handleDeleteByYear };
};
