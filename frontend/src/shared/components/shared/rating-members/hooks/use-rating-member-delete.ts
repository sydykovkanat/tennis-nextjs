import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectRatingMemberDeleting } from '@/shared/lib/features/rating-members/rating-members-slice';
import { deleteRatingMember, fetchRatingMembers } from '@/shared/lib/features/rating-members/rating-members-thunks';
import { toast } from 'sonner';

export const useRatingMemberDelete = () => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectRatingMemberDeleting);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteRatingMember(id)).unwrap();
      await dispatch(fetchRatingMembers());
      toast.success('Удаление прошло успешно!');
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так!');
    }
  };

  return { handleDelete, isDeleting };
};
