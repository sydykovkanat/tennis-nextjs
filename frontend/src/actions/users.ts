import { axiosApi } from '@/shared/lib/helpers/axios-api';

export const getUsers = async () => {
  const { data: users } = await axiosApi.get('/users');

  return users;
};

export const getOneUser = async (id: string) => {
  const { data: user } = await axiosApi.get(`/users/${id}`);

  return user;
};
