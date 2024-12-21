'use client';

import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectResetPasswordError, selectResetPasswordLoading } from '@/shared/lib/features/users/users-slice';
import { resetPassword } from '@/shared/lib/features/users/users-thunks';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { type ChangeEvent, type FormEvent, useState } from 'react';

export const useResetPassword = () => {
  const router = useRouter();
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
      router.push('/login');
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
