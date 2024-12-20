'use client';

import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectForgotPasswordError, selectForgotPasswordLoading } from '@/shared/lib/features/users/users-slice';
import { forgotPassword } from '@/shared/lib/features/users/users-thunks';
import { toast } from 'sonner';

import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';

export const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const forgotError = useAppSelector(selectForgotPasswordError);
  const forgotPasswordLoading = useAppSelector(selectForgotPasswordLoading);
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (disabled) {
      setTimer(30);

      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [disabled]);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      await dispatch(forgotPassword(email)).unwrap();
      toast.success('Ссылка для сброса пароля отправлена на вашу почту.');
      setDisabled(true);
    } catch (error) {
      console.error(error);
      toast.error(forgotError?.error || 'Что-то пошло не так.');
    }
  };

  return {
    forgotError,
    forgotPasswordLoading,
    email,
    handleChange,
    handleSubmit,
    disabled,
    timer,
  };
};
