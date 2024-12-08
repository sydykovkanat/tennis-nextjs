import { useFormState } from '@/shared/components/shared/rating-members/hooks/use-form-state';
import { useValidation } from '@/shared/components/shared/rating-members/hooks/use-validation';
import { usePlaces } from '@/shared/lib';
import { RatingMember, RatingMemberMutation } from '@/shared/types/rating-member.types';

import React from 'react';

const emptyState: RatingMemberMutation = {
  name: '',
  image: null,
  gender: '',
  place: '',
  ratingType: '',
};

export const useRatingMembersForm = (
  ratingMembers: RatingMember[],
  forWhichGender: 'male' | 'female',
  onSubmit: (ratingMember: RatingMemberMutation) => void,
  existingMember?: RatingMember,
  isLoading?: boolean,
) => {
  const initialState = existingMember
    ? { ...existingMember, place: existingMember.place.toString() }
    : {
        ...emptyState,
        gender: forWhichGender,
        ratingType: forWhichGender === 'female' ? 'womensTop3' : ('' as '' | 'mensTop8' | 'mensTop3' | 'womensTop3'),
      };

  const { state, setState, handleChange, handleChangeSelect, fileInputChangeHandler } = useFormState(initialState);

  const { isFormInvalid, existingName, maxMembersExceeded } = useValidation(
    state,
    ratingMembers,
    existingMember,
    isLoading,
  );

  const places = usePlaces(forWhichGender, state.ratingType);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...state,
    });

    setState(initialState);
  };

  return {
    state,
    places,
    existingName,
    maxMembersExceeded,
    isFormInvalid,
    handleChange,
    handleChangeSelect,
    fileInputChangeHandler,
    handleSubmit,
  };
};
