import { useAppDispatch } from '@/shared/hooks/hooks';
import { formatTelephone } from '@/shared/lib';
import { fetchOneUser, updateUserInfo } from '@/shared/lib/features/users/users-thunks';
import { User } from '@/shared/types/user.types';
import { format } from 'date-fns';
import { toast } from 'sonner';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

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

  const updateField = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'telephone') {
      const formattedPhone = formatTelephone(value);

      setUserInfo((prev) => ({ ...prev, telephone: formattedPhone }));
      return;
    }

    updateField(id, value);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'dd.MM.yyyy');
      updateField('dateOfBirth', formattedDate);
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

  return { userInfo, updateField, handleChange, handleSubmit, resetUserInfo, handleDateChange };
};
