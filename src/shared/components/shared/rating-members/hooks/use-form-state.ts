import { RatingMemberMutation } from '@/shared/types/rating-member.types';

import React, { useState } from 'react';

export const useFormState = (initialState: RatingMemberMutation) => {
  const [state, setState] = useState<RatingMemberMutation>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeSelect = (value: string, name: string) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    state,
    setState,
    handleChange,
    handleChangeSelect,
    fileInputChangeHandler,
  };
};
