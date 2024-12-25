'use client';

import { useAdminUsersList } from '@/shared/components/shared';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { formatTelephone } from '@/shared/lib';
import { selectCategories, selectCategoriesFetching } from '@/shared/lib/features/categories/category-slice';
import {
  selectCurrentUser,
  selectRegisterError,
  selectRegisterLoading,
  selectUpdating,
  selectUpdatingError,
} from '@/shared/lib/features/users/users-slice';
import { addUser, fetchUsers, updateCurrentUserInfo } from '@/shared/lib/features/users/users-thunks';
import { UserMutation } from '@/shared/types/user.types';
import { ValidationError } from '@/shared/types/user.types';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';

export const initialState: UserMutation = {
  telephone: '',
  password: '',
  category: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
  email: '',
  role: '',
};

export const useUsersForm = () => {
  const dispatch = useAppDispatch();
  const { handleTabChange } = useAdminUsersList();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesFetching);
  const loading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const [newUser, setNewUser] = useState(initialState);
  const loadingUpdateUser = useAppSelector(selectUpdating);
  const errorUpdateUser = useAppSelector(selectUpdatingError);
  const currentUser = useAppSelector(selectCurrentUser);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'dd.MM.yyyy');
      updateRegisterField('dateOfBirth', formattedDate);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'telephone') {
      const formattedPhone = formatTelephone(value);

      setNewUser((prev) => ({ ...prev, telephone: formattedPhone }));
      return;
    }

    updateRegisterField(id, value);
  };

  const handleSelectChange = (value: string, id: string) => {
    let field: string;
    if (id === 'role') {
      field = id;
    } else if (id === 'gender') {
      field = id;
    } else if (id === 'category') {
      field = id;
    } else {
      throw new Error(`Unknown id: ${id}`);
    }

    updateRegisterField(field, value);
  };

  const updateRegisterField = (field: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValidAdmin = () => {
    return (
      Object.values(newUser).every((value) => value.trim() !== '') &&
      newUser.telephone.length === 12 &&
      newUser.dateOfBirth.length === 10
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (newUser.id) {
        await dispatch(updateCurrentUserInfo(newUser)).unwrap();
        toast.success('Профиль успешно обновлен!');
      } else {
        await dispatch(addUser(newUser)).unwrap();
        toast.success('Профиль успешно создан');
      }

      await dispatch(
        fetchUsers({
          fullName: '',
          telephone: '',
          category: 'all',
          page: 1,
          role: newUser.role,
        }),
      );

      if (newUser.role) {
        const updateRoleForTab = newUser.role === 'moderator' ? 'moderators' : 'users';
        handleTabChange(updateRoleForTab);
      }

      setNewUser(initialState);
      closeRef.current?.click();
    } catch (e) {
      const error = e as ValidationError;
      if (error) {
        if (error.errors) {
          Object.values(error.errors).forEach((error) => {
            if (error?.message) {
              toast.error(error.message);
            }
          });
        } else {
          toast.error(error.message || 'Произошла ошибка');
        }
      } else {
        console.error(e);
      }
    }
  };


  return {
    isDialogOpen,
    setIsDialogOpen,
    closeRef,
    newUser,
    setNewUser,
    categories,
    categoriesLoading,
    error,
    loading,
    handleDateChange,
    handleChange,
    handleSelectChange,
    updateRegisterField,
    isFormValidAdmin,
    initialState,
    dispatch,
    handleSubmit,
    loadingUpdateUser,
    errorUpdateUser,
    currentUser,
  };
};
