import { useAppDispatch } from '@/shared/hooks/hooks';
import { fetchOneUser, updateUserInfo } from '@/shared/lib/features/users/users-thunks';
import { User } from '@/shared/types/user.types';
import { isValid, parseISO } from 'date-fns';
import { toast } from 'sonner';

import React, { useCallback, useEffect, useState } from 'react';

interface UseUserFormProps {
  user: User;
  closeDialog: () => void;
}

const initialState = {
  telephone: '',
  fullName: '',
  gender: '',
  email: '',
  dateOfBirth: '',
};

export const useUserForm = ({ user, closeDialog }: UseUserFormProps) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const dispatch = useAppDispatch();

  const resetUserInfo = useCallback(() => {
    setUserInfo({
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

  const updateField = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValid(parseISO(value))) {
      setUserInfo((prev) => ({
        ...prev,
        dateOfBirth: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      await dispatch(updateUserInfo(userInfo)).unwrap();
      await dispatch(fetchOneUser(user._id));
      toast.success('Профиль успешно обновлен');
      closeDialog();
    }
  };

  return { userInfo, updateField, handleSubmit, resetUserInfo, handleDateChange };
};
