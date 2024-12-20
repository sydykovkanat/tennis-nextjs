'use client';

import { resetPassword } from '@/features/users/usersThunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectResetPasswordError, selectResetPasswordLoading } from '@/shared/lib/features/users/users-slice';
import { toast } from 'sonner';

import { type ChangeEvent, type FormEvent, useState } from 'react';

// import { useNavigate, useParams } from 'react-router-dom';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useParams() as { token: string };
  const resetPasswordLoading = useAppSelector(selectResetPasswordLoading);
  const resetPasswordError = useAppSelector(selectResetPasswordError);
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setPasswords({ ...passwords, [id]: value });
  };

  const passwordMatch = passwords.password !== passwords.confirmPassword;

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      await dispatch(resetPassword({ password: passwords.password, token })).unwrap();
      toast.success('Пароль успешно изменен.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error(resetPasswordError?.error || 'Что-то пошло не так.');
    }
  };

  return {
    resetPasswordLoading,
    resetPasswordError,
    passwords,
    passwordMatch,
    setPasswords,
    handleChange,
    handleSubmit,
  };
};
