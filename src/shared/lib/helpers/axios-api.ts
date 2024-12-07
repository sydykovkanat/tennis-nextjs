import { RootState } from '@/shared/lib/store';
import { Store } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export const addTokenInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((request) => {
    const token = store.getState().users.user?.token;
    request.headers.set('Authorization', `Bearer ${token}`);
    return request;
  });
};
