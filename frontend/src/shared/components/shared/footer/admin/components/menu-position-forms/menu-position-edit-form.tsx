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
import {
  selectItemUpdating,
  selectItemsData,
  selectMenuPositionLink,
} from '@/shared/lib/features/footer/footers-slice';
import { getFooterItems, getOneMenuPosition, updateMenuPosition } from '@/shared/lib/features/footer/footers-thunks';
import { LinkDataMutation } from '@/shared/types/footer.types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

import React, { FormEvent, useEffect, useRef, useState } from 'react';

import styles from './menu-position-forms.module.css';

interface Props {
  id: string;
}

export const MenuPositionEditForm: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const menuPositionData = useAppSelector(selectItemsData);
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

  useEffect(() => {
    if (open) {
      dispatch(getOneMenuPosition(id));
    }
  }, [dispatch, id, open]);

  useEffect(() => {
    if (open && oneMenuPositionData) {
      const menu = oneMenuPositionData.menuPosition[0];
      setMenuPosition((prevState) => ({
        ...prevState,
        name: menu.name,
        value: menu.value,
      }));
    }
  }, [open, oneMenuPositionData]);

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
        await dispatch(updateMenuPosition({ id, data: menuPosition })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setMenuPosition({
          name: '',
          value: '',
        });
        toast.success('Пункт в меню успешно обновлен.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление пункта в меню.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'} data-test-id='edit'>
          <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать пункт в меню</DialogTitle>
          <DialogDescription>Заполните форму перед обновлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={styles.formContainer}>
              {isBlocked && (
                <small className={styles.errorMessage}>
                  Пункт в меню положения `{menuPosition.name}` уже существует.
                </small>
              )}
              <Label htmlFor={'menu-position-name'}>Название пункта в меню</Label>
              <Input
                name='name'
                value={menuPosition.name}
                onChange={inputChangeHandler}
                placeholder={'Введите название пункта'}
                id={'menu-position-name'}
              />
              <Label htmlFor={'menu-position-link'}>Ссылка на страницу</Label>
              <Input
                type='url'
                name='value'
                value={menuPosition.value}
                onChange={inputChangeHandler}
                placeholder={'Введите адрес ссылки на страницу'}
                id={'menu-position-link'}
              />
            </div>
            <div className={styles.formActions}>
              <Button
                disabled={menuPosition.name.trim().length === 0 || menuPosition.value.trim().length === 0 || isBlocked}
                size={'sm'}
              >
                Сохранить {menuPositionUpdating && <Loader size={'sm'} theme={'light'} />}
              </Button>
              <DialogClose ref={closeRef} asChild>
                <Button type={'button'} variant={'outline'} data-test-id='edit'>
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
