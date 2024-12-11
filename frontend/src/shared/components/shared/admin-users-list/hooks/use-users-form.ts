'use client';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectCategories, selectCategoriesFetching } from '@/shared/lib/features/categories/category-slice';
import { selectRegisterError, selectRegisterLoading } from '@/shared/lib/features/users/users-slice';
import { UserMutation } from '@/shared/types/user.types';
import { format } from 'date-fns';
import { formatTelephone } from '@/shared/lib';
import { addUser, fetchUsers } from '@/shared/lib/features/users/users-thunks';
import { toast } from 'sonner';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesFetching);
  const loading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const [newUser, setNewUser] = useState(initialState);

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
    const isFilled =
      Object.values(newUser).every((value) => value.trim() !== '') &&
      confirmPassword.trim() !== '' &&
      newUser.telephone.length === 12 &&
      newUser.dateOfBirth.length === 10;
    const passwordsMatch = newUser.password === confirmPassword;

    return isFilled && passwordsMatch;
  };

  const addUserAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(addUser(newUser)).unwrap();
    await dispatch(
      fetchUsers({
        fullName: '',
        telephone: '',
        category: 'all',
        page: 1,
        role: newUser.role,
      }),
    );
    setConfirmPassword('');
    setNewUser(initialState);
    toast.success('Профиль успешно создан');
    closeRef.current?.click();
  };



  return {
    isDialogOpen,
    setIsDialogOpen,
    confirmPassword,
    setConfirmPassword,
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
    addUserAdmin
  };
};