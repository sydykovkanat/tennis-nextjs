import { addTokenInterceptors } from '@/shared/lib/helpers/axios-api';
import { store } from '@/shared/lib/store';

import { useEffect } from 'react';

export const useAxiosInterceptors = () => {
  useEffect(() => {
    addTokenInterceptors(store);
  }, []);
};
