import { useAppSelector } from '@/shared/hooks/hooks';
import { selectLoginError, selectLoginLoading, selectUser } from '@/shared/lib/features/users/users-slice';

export const useLoginSelectors = () => {
  const loginError = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const user = useAppSelector(selectUser);

  return { loginError, loginLoading, user };
};
