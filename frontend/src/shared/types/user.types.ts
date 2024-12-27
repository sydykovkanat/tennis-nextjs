import { Category } from '@/shared/types/category.types';

export interface RegisterMutation {
  telephone: string;
  email: string;
  password: string;
  dateOfBirth: string;
  fullName: string;
  gender: string;
  category: string;
}

export interface User {
  _id: string;
  telephone: string;
  fullName: string;
  gender: 'male' | 'female';
  category: Category;
  dateOfBirth: string;
  email: string;
  isActive: boolean;
  token: string;
  role: 'admin' | 'moderator' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface UserMutation {
  id?: string;
  telephone: string;
  email: string;
  password?: string;
  dateOfBirth: string;
  fullName: string;
  gender: string;
  category: string;
  role?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
  messageIsActive?: string;
  messageTelephone?: string;
  messageMatching?: string;
  messagePassword?: string;
}

export interface UsersResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: User[];
}

export interface UsersFilter {
  category?: string;
  telephone?: string;
  fullName?: string;
  page: number;
  role?: string;
}

export type RegisterMutationWithoutCoupleFields = Omit<RegisterMutation, 'password' | 'category'>;

export interface UserPermissionLevel {
  permissionLevel: number;
}
