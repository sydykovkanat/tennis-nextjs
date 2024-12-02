import { Category } from '@/shared/types/category.types';

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
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
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
}
