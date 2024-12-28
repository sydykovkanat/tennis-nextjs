'use client';

import { formatTelephone, validateRegisterForm } from '@/shared/lib';
import { RegisterMutation } from '@/shared/types/auth.types';
import { format } from 'date-fns';

import { ChangeEvent, useState } from 'react';

export const useRegisterForm = (initialState: RegisterMutation) => {
  const [registerMutation, setRegisterMutation] = useState<RegisterMutation>(initialState);
  const [isAgree, setIsAgree] = useState({
    rules: false,
    personalData: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const validateAndSetField = (id: string, value: string) => {
    const error = validateRegisterForm(id, value);

    setFormErrors((prev) => ({
      ...prev,
      [id]: error,
    }));

    setRegisterMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAgree = (type: 'rules' | 'personalData') => {
    const newValue = !isAgree[type];

    setIsAgree((prev) => ({
      ...prev,
      [type]: newValue,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [type]: validateRegisterForm(type, newValue),
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    const formattedValue =
      id === 'telephone'
        ? formatTelephone(value.trim())
        : id === 'fullName'
          ? value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')
          : value.trim();

    setRegisterMutation((prev) => ({
      ...prev,
      [id]: formattedValue,
    }));

    if (isTouched[id]) {
      validateAndSetField(id, formattedValue);
    }
  };

  const handleBlur = (id: string) => {
    setIsTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    const error = validateRegisterForm(id, registerMutation[id as keyof RegisterMutation] || '');

    setFormErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

    setRegisterMutation((prev) => ({
      ...prev,
      dateOfBirth: formattedDate,
    }));

    setFormErrors((prev) => ({
      ...prev,
      dateOfBirth: validateRegisterForm('dateOfBirth', formattedDate),
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setRegisterMutation((prev) => ({
      ...prev,
      [id]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [id]: validateRegisterForm(id, value),
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
      registerMutation.dateOfBirth &&
      !Object.values(formErrors).some((error) => error),
  );

  return {
    registerMutation,
    isFormValid,
    isAgree,
    handleChange,
    handleBlur,
    handleAgree,
    handleDateChange,
    handleSelectChange,
    formErrors,
  };
};
