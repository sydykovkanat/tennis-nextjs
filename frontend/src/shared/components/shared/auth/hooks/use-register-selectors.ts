import { useAppSelector } from '@/shared/hooks/hooks';
import { selectRegisterError, selectRegisterLoading } from '@/shared/lib/features/users/users-slice';

export const useRegisterSelectors = () => {
  const registerLoading = useAppSelector(selectRegisterLoading);
  const registerError = useAppSelector(selectRegisterError);

  return { registerLoading, registerError };
};
