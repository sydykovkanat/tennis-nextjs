'use client';

import { useAppDispatch } from '@/shared/hooks/hooks';
import { login } from '@/shared/lib/features/users/users-thunks';
import { LoginMutation } from '@/shared/types/auth.types';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (loginMutation: LoginMutation) => {
    try {
      await dispatch(login(loginMutation)).unwrap();
      router.push('/', {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { handleLogin };
};
