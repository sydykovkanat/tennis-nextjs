'use client';

import { Loader } from '@/shared/components/shared';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectItemCreating, selectItemsData } from '@/shared/lib/features/footer/footers-slice';
import { createMenuPosition, getFooterItems } from '@/shared/lib/features/footer/footers-thunks';
import { LinkDataMutation } from '@/shared/types/footer.types';
import { toast } from 'sonner';

import React, { FormEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';

import styles from './menu-position-forms.module.css';

export const MenuPositionCreateForm: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const menuPositionData = useAppSelector(selectItemsData);
  const menuPositionCreating = useAppSelector(selectItemCreating);
  const [menuPosition, setMenuPosition] = useState<LinkDataMutation>({
    name: '',
    value: '',
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedMenu = menuPositionData?.[0]?.menuPosition?.map((item) => item.name.toLowerCase()) ?? [];
  const isBlocked = blockedMenu.includes(menuPosition.name.toLowerCase());

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
      if (menuPosition.name.trim().length !== 0 && menuPosition.value.trim().length !== 0 && !isBlocked) {
        closeRef.current?.click();
        await dispatch(createMenuPosition(menuPosition)).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setMenuPosition({
          name: '',
          value: '',
        });
        toast.success('Пункт в меню успешно добавлен.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при добавление пункта в меню.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить пункт в меню положения</DialogTitle>
          <DialogDescription>Заполните форму перед добавлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={styles.formContainer}>
              {isBlocked && (
                <small className={styles.errorMessage}>
                  Пункт в меню положения `{menuPosition.name}` уже существует.
                </small>
              )}
              <Label htmlFor='menu-position-name'>Название пункта в меню</Label>
              <Input
                name='name'
                value={menuPosition.name}
                onChange={inputChangeHandler}
                placeholder='Введите название пункта'
                id='menu-position-name'
              />
              <Label htmlFor='menu-position-link'>Ссылка на страницу</Label>
              <Input
                type='url'
                name='value'
                value={menuPosition.value}
                onChange={inputChangeHandler}
                placeholder='Введите адрес ссылки на страницу'
                id='menu-position-link'
              />
            </div>
            <div className={styles.formActions}>
              <Button
                disabled={menuPosition.name.trim().length === 0 || menuPosition.value.trim().length === 0 || isBlocked}
                size='sm'
              >
                Добавить {menuPositionCreating && <Loader size='sm' theme='light' />}
              </Button>
              <DialogClose ref={closeRef} asChild>
                <Button type='button' variant='outline'>
                  Отменить
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
