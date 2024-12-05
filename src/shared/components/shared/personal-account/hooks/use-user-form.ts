import { useAppDispatch } from '@/shared/hooks/hooks';
import { fetchOneUser, updateUserInfo } from '@/shared/lib/features/users/users-thunks';
import { User } from '@/shared/types/user.types';
import { format } from 'date-fns';
import { toast } from 'sonner';

import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (user) {
      setUserInfo({
        telephone: user.telephone,
        fullName: user.fullName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
      });
    }
  }, [user]);

  const updateField = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      updateField('dateOfBirth', format(date, 'dd.MM.yyyy'));
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

  return { userInfo, updateField, handleDateChange, handleSubmit };
};
