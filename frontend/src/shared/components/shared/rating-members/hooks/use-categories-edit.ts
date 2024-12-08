'use client';

import { useCategoriesFormState } from '@/shared/components/shared/rating-members/hooks/use-categories-form-state';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectRatingMembersCategoriesUpdating } from '@/shared/lib/features/rating-members/rating-members-slice';
import { fetchRatingMembers, updateRatingCategories } from '@/shared/lib/features/rating-members/rating-members-thunks';
import { toast } from 'sonner';

import React, { useState } from 'react';

export const useCategoriesEdit = (
  existingMensCategoryTop8: string,
  existingMensCategoryTop3: string,
  existingWomensCategoryTop3: string,
) => {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(selectRatingMembersCategoriesUpdating);
  const { state, handleChange, resetForm } = useCategoriesFormState({
    mensCategoryTop8: existingMensCategoryTop8,
    mensCategoryTop3: existingMensCategoryTop3,
    womensCategoryTop3: existingWomensCategoryTop3,
  });
  const [open, setOpen] = useState(false);
  const isFormInvalid = isUpdating || !state.mensCategoryTop8 || !state.mensCategoryTop3 || !state.womensCategoryTop3;

  const handleOpen = () => {
    resetForm({
      mensCategoryTop8: existingMensCategoryTop8,
      mensCategoryTop3: existingMensCategoryTop3,
      womensCategoryTop3: existingWomensCategoryTop3,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(
        updateRatingCategories({
          mensRatingCategoryTop8: state.mensCategoryTop8,
          mensRatingCategoryTop3: state.mensCategoryTop3,
          womensRatingCategoryTop3: state.womensCategoryTop3,
        }),
      ).unwrap();
      await dispatch(fetchRatingMembers());
      toast.success('Категории рейтингов обновлены успешно');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновлении категорий');
    }
  };

  return { state, handleChange, open, setOpen, isFormInvalid, handleOpen, handleClose, handleSubmit };
};
