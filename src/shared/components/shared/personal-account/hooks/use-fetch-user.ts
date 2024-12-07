import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { fetchOneUser } from '@/shared/lib/features/users/users-thunks';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export const useFetchUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      dispatch(fetchOneUser(user._id));
    }
  }, [dispatch, user, router]);

  return user;
};
