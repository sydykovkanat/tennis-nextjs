import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  selectItemCreating,
  selectItemUpdating,
  selectItemsData,
  selectMenuPositionLink,
} from '@/shared/lib/features/footer/footers-slice';
import { createMenuPosition, getFooterItems, updateMenuPosition } from '@/shared/lib/features/footer/footers-thunks';
import { LinkDataMutation } from '@/shared/types/footer.types';
import { toast } from 'sonner';

import React, { FormEvent, useEffect, useRef, useState } from 'react';

export const useMenuPosition = (id?: string) => {
  const dispatch = useAppDispatch();
  const menuPositionData = useAppSelector(selectItemsData);
  const menuPositionCreating = useAppSelector(selectItemCreating);
  const oneMenuPositionData = useAppSelector(selectMenuPositionLink);
  const menuPositionUpdating = useAppSelector(selectItemUpdating);

  const [menuPosition, setMenuPosition] = useState<LinkDataMutation>({
    name: '',
    value: '',
  });

  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedMenu = menuPositionData?.[0]?.menuPosition?.map((item) => item.name.toLowerCase()) ?? [];
  const isBlocked = blockedMenu.includes(menuPosition.name.toLowerCase());
  const validateForm = menuPosition.name.trim().length !== 0 && menuPosition.value.trim().length !== 0 && !isBlocked;

  useEffect(() => {
    if (!open) {
      setMenuPosition({
        name: '',
        value: '',
      });
    }
  }, [open]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMenuPosition((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (validateForm) {
        closeRef.current?.click();

        if (id) {
          await dispatch(updateMenuPosition({ id, data: menuPosition })).unwrap();
        } else {
          await dispatch(createMenuPosition(menuPosition)).unwrap();
        }
        await dispatch(getFooterItems()).unwrap();
        setMenuPosition({
          name: '',
          value: '',
        });
        toast.success(id ? 'Пункт в меню успешно обновлен.' : 'Пункт в меню успешно добавлен.');
      }
    } catch (error) {
      console.error(error);
      toast.error(id ? 'Ошибка при обновление пункта в меню.' : 'Ошибка при добавление пункта в меню.');
    }
  };

  return {
    dispatch,
    menuPositionCreating,
    menuPosition,
    open,
    setMenuPosition,
    setOpen,
    inputChangeHandler,
    closeRef,
    isBlocked,
    oneMenuPositionData,
    menuPositionUpdating,
    handleSubmit,
  };
};
