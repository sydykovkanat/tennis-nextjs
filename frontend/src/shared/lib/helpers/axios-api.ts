import { API_URL } from '@/shared/constants';
import { RootState } from '@/shared/hooks/hooks';
import { unsetUser } from '@/shared/lib/features/users/users-slice';
import axios from 'axios';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Store } from 'redux';

export const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addTokenInterceptors = (store: Store<RootState>, router: AppRouterInstance) => {
  axiosApi.interceptors.request.use((request) => {
    const token = store.getState().users.user?.token;
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
    return request;
  });

  axiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        store.dispatch(unsetUser());
        router.push('/');
      }
      return Promise.reject(error);
    },
  );
};
