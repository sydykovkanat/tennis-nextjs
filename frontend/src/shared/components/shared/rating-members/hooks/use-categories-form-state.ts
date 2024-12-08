'use client';

import React, { useState } from 'react';

export const useCategoriesFormState = (initialValues: Record<string, string>) => {
  const [state, setState] = useState(initialValues);

  const resetForm = (newValues: Record<string, string>) => {
    setState(newValues);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    state,
    handleChange,
    resetForm,
  };
};
