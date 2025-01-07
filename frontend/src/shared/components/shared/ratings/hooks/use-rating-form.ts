'use client';

import { useAppSelector } from '@/shared/hooks/hooks';
import { selectRatingsCreating } from '@/shared/lib/features/rating/rating-slice';
import { RatingMutation } from '@/shared/types/rating.types';

import React from 'react';

const initialState: RatingMutation = {
  year: '',
  chapter: '',
};

export const useRatingForm = (onSubmit: (rating: RatingMutation) => void) => {
  const [ratingMutation, setRatingMutation] = React.useState<RatingMutation>(initialState);
  const ratingsCreating = useAppSelector(selectRatingsCreating);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const year = Number(value);

    if (value.length > 4 || isNaN(year) || year > new Date().getFullYear()) return;

    setRatingMutation((prev) => ({
      ...prev,
      year: value.trim(),
    }));
  };

  const handleSelectChange = (value: string, id: string) => {
    const name = id === 'month' ? 'month' : 'chapter';
    setRatingMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...ratingMutation });
    setRatingMutation(initialState);
  };

  const isFormValid = ratingMutation.year.length === 4 && ratingMutation.chapter;

  return {
    ratingMutation,
    handleYearChange,
    handleSelectChange,
    handleSubmit,
    isFormValid,
    ratingsCreating,
  };
};
