import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { login } from '@/shared/lib/features/users/users-thunks';
import { LoginMutation } from '@/shared/types/auth.types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const handleLogin = async (loginMutation: LoginMutation) => {
    try {
      await dispatch(login(loginMutation)).unwrap();
      toast.success(`Вы успешно вошли в систему ${user && `- ${user.fullName}!`}`);
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка входа. Проверьте данные и попробуйте снова.');
    }
  };

  return { handleLogin };
};
