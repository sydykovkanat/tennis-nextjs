'use client';

import { TournamentMutation } from '@/shared/types/tournament.types';
import { format } from 'date-fns';

import React, { useState } from 'react';

export const useFormState = (initialState: TournamentMutation) => {
  const [state, setState] = useState<TournamentMutation>(initialState);

  const handleChangeSelect = (value: string, name: string) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    const formattedValue = id === 'participants' ? value.replace(/[^0-9]/g, '') : value;

    const validatedValue =
      id === 'participants' && formattedValue !== '' && parseInt(formattedValue, 10) < 1 ? '1' : formattedValue;

    setState((prev) => ({
      ...prev,
      [id]: validatedValue,
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

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'dd.MM.yy');
      const tournamentYear = date.getFullYear();

      setState((prevState) => ({
        ...prevState,
        eventDate: formattedDate,
        tournamentYear: tournamentYear.toString(),
      }));
    }
  };

  return { state, setState, handleChangeSelect, handleChange, fileInputChangeHandler, handleDateChange };
};
