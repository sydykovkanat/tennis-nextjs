'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectRatings, selectRatingsFetching } from '@/shared/lib/features/rating/rating-slice';
import { fetchRatings } from '@/shared/lib/features/rating/rating-thunks';

import { useEffect } from 'react';

export const useRating = () => {
  const dispatch = useAppDispatch();
  const ratings = useAppSelector(selectRatings);
  const ratingsFetching = useAppSelector(selectRatingsFetching);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  const maleRatings = ratings.filter((rating) => rating.chapter === 'male');
  const femaleRatings = ratings.filter((rating) => rating.chapter === 'female');
  const mixedRatings = ratings.filter((rating) => rating.chapter === 'mixed');

  return { ratings, ratingsFetching, maleRatings, femaleRatings, mixedRatings };
};
