'use client';

import { formatTelephone } from '@/shared/lib';
import { RegisterMutation } from '@/shared/types/auth.types';
import { format } from 'date-fns';

import { ChangeEvent, useState } from 'react';

export const useRegisterForm = (initialState: RegisterMutation) => {
  const [registerMutation, setRegisterMutation] = useState<RegisterMutation>(initialState);
  const [isAgree, setIsAgree] = useState({
    rules: false,
    personalData: false,
  });

  const handleAgree = (type: 'rules' | 'personalData') => {
    setIsAgree((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setRegisterMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setRegisterMutation((prev) => ({
      ...prev,
      dateOfBirth: format(date, 'yyyy-MM-dd'),
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    let { value } = event.target;

    if (id === 'telephone') {
      value = formatTelephone(value);
    }

    setRegisterMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const isFormValid = Boolean(
    registerMutation.telephone.length === 12 &&
      registerMutation.password &&
      isAgree.rules &&
      isAgree.personalData &&
      registerMutation.email &&
      registerMutation.fullName &&
      registerMutation.gender &&
      registerMutation.category &&
      registerMutation.dateOfBirth,
  );

  return {
    registerMutation,
    handleChange,
    isFormValid,
    handleDateChange,
    handleSelectChange,
    handleAgree,
    isAgree,
  };
};
