'use client';

import { useAppDispatch } from '@/shared/hooks/hooks';
import { register } from '@/shared/lib/features/users/users-thunks';
import { RegisterMutation } from '@/shared/types/auth.types';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRegister = async (registerMutation: RegisterMutation) => {
    try {
      await dispatch(register(registerMutation)).unwrap();
      router.push('/', {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { handleRegister };
};
