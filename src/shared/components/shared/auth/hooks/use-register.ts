'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { register } from '@/shared/lib/features/users/users-thunks';
import { RegisterMutation } from '@/shared/types/auth.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const handleRegister = async (registerMutation: RegisterMutation) => {
    try {
      await dispatch(register(registerMutation)).unwrap();
      toast.success(`Вы успешно зарегистрировались ${user && `- ${user.fullName}!`}`);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return { handleRegister };
};
