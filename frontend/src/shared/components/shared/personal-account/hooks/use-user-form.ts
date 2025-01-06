import { useAppDispatch } from '@/shared/hooks/hooks';
import { formatTelephone, validateUserForm } from '@/shared/lib';
import { fetchOneUser, updateUserInfo } from '@/shared/lib/features/users/users-thunks';
import { User, UserUpdateInfo } from '@/shared/types/user.types';
import { format } from 'date-fns';
import { toast } from 'sonner';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

interface UseUserFormProps {
  user: User;
  closeDialog: () => void;
}

const initialState: UserUpdateInfo = {
  telephone: '',
  fullName: '',
  gender: '',
  email: '',
  dateOfBirth: '',
};

export const useUserForm = ({ user, closeDialog }: UseUserFormProps) => {
  const [userInfo, setUserInfo] = useState<UserUpdateInfo>(initialState);
  const dispatch = useAppDispatch();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const resetUserInfo = useCallback(() => {
    setUserInfo({
      ...initialState,
      telephone: user.telephone || '',
      fullName: user.fullName || '',
      email: user.email || '',
      dateOfBirth: user.dateOfBirth || '',
      gender: user.gender || '',
    });
  }, [user.dateOfBirth, user.email, user.fullName, user.gender, user.telephone]);

  useEffect(() => {
    resetUserInfo();
  }, [user, resetUserInfo]);

  const validateAndSetField = (id: string, value: string) => {
    const error = validateUserForm(id, value);

    setFormErrors((prev) => ({
      ...prev,
      [id]: error,
    }));

    setUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleBlur = (id: string) => {
    setIsTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    const error = validateUserForm(id, userInfo[id as keyof UserUpdateInfo] || '');

    setFormErrors((prev) => ({
      ...prev,
      [id]: error,
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

    setUserInfo((prev) => ({
      ...prev,
      [id]: formattedValue,
    }));

    if (isTouched[id]) {
      validateAndSetField(id, formattedValue);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

    setUserInfo((prev) => ({
      ...prev,
      dateOfBirth: formattedDate,
    }));
  };

  const isFormValid =
    userInfo.telephone.length === 12 &&
    userInfo.fullName &&
    userInfo.email &&
    userInfo.dateOfBirth &&
    userInfo.gender &&
    !Object.values(formErrors).some((error) => error);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      await dispatch(updateUserInfo(userInfo)).unwrap();
      await dispatch(fetchOneUser(user._id));
      toast.success('Профиль успешно обновлен');
      closeDialog();
    }
  };

  return {
    userInfo,
    validateAndSetField,
    handleChange,
    handleSubmit,
    resetUserInfo,
    handleDateChange,
    isFormValid,
    formErrors,
    handleBlur,
  };
};
