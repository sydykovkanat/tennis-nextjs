import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  selectRatingMemberCreating,
  selectRatingMemberUpdating,
} from '@/shared/lib/features/rating-members/rating-members-slice';
import {
  createRatingMember,
  fetchRatingMembers,
  updateRatingMember,
} from '@/shared/lib/features/rating-members/rating-members-thunks';
import { RatingMember, RatingMemberMutation } from '@/shared/types/rating-member.types';
import { GlobalError } from '@/shared/types/user.types';
import { toast } from 'sonner';

export const useRatingMemberFormLogic = (
  state: RatingMemberMutation,
  setOpen?: (open: boolean) => void,
  existingMember?: RatingMember,
  id?: string,
) => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectRatingMemberCreating);
  const isEditing = useAppSelector(selectRatingMemberUpdating);

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (existingMember && id) {
        await dispatch(updateRatingMember({ id, ratingMemberMutation: state })).unwrap();
        toast.success('Участник рейтинга обновлен успешно');
      } else {
        await dispatch(createRatingMember(state)).unwrap();
        toast.success('Участник рейтинга создан успешно');
      }
      await dispatch(fetchRatingMembers());
    } catch (error) {
      const backendError = error as GlobalError;
      toast.error(backendError.error || `Что-то пошло не так при ${existingMember ? 'редактировании' : 'создании'}!`);
    } finally {
      handleClose();
    }
  };

  return { handleSubmit, handleClose, isCreating, isEditing };
};
