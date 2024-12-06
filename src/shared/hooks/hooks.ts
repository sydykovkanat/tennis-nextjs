import { addTokenInterceptors } from '@/shared/lib/helpers/axios-api';
import { AppDispatch, RootState, store } from '@/shared/lib/store';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = useStore.withTypes<AppStore>();

export const useAxiosInterceptors = () => {
  useEffect(() => {
    addTokenInterceptors(store);
  }, []);
};
