'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectRatingMemberUpdating } from '@/shared/lib/features/rating-members/rating-members-slice';
import { fetchRatingMembers, updateRatingMember } from '@/shared/lib/features/rating-members/rating-members-thunks';
import { RatingMemberMutation } from '@/shared/types/rating-member.types';
import { GlobalError } from '@/shared/types/user.types';
import { toast } from 'sonner';

import { useState } from 'react';

export const useRatingMemberEdit = (id: string) => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(selectRatingMemberUpdating);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onFormSubmit = async (state: RatingMemberMutation) => {
    try {
      await dispatch(updateRatingMember({ id, ratingMemberMutation: state })).unwrap();
      await dispatch(fetchRatingMembers());
      handleClose();
      toast.success('Участник рейтинга обновлен успешно');
    } catch (error) {
      handleClose();
      const backendError = error as GlobalError;
      toast.error(backendError.error || 'Что-то пошло не так при обновлении!');
    }
  };

  return { isEditing, open, setOpen, handleClose, onFormSubmit };
};
