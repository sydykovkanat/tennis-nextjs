import { API_URL } from '@/shared/constants';
import { RootState } from '@/shared/hooks/hooks';
import axios from 'axios';
import { Store } from 'redux';

export const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addTokenInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((request) => {
    const token = store.getState().users.user?.token;
    request.headers.set('Authorization', `Bearer ${token}`);
    return request;
  });
};
