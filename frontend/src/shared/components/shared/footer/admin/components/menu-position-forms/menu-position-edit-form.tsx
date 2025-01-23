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
import { getOneMenuPosition } from '@/shared/lib/features/footer/footers-thunks';
import { Pencil } from 'lucide-react';

import React, { useEffect } from 'react';

import styles from './menu-position-forms.module.css';
import { useMenuPosition } from './use-menu-position';

interface Props {
  id: string;
}

export const MenuPositionEditForm: React.FC<Props> = ({ id }) => {
  const {
    dispatch,
    menuPosition,
    open,
    setOpen,
    setMenuPosition,
    inputChangeHandler,
    closeRef,
    isBlocked,
    oneMenuPositionData,
    menuPositionUpdating,
    handleSubmit,
  } = useMenuPosition(id);

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
  }, [open, oneMenuPositionData, setMenuPosition]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'} data-test-id='edit'>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать пункт в меню</DialogTitle>
          <DialogDescription className={styles.dialogDescription}>Заполните форму перед обновлением</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={styles.formContainer}>
              {isBlocked && (
                <small className={styles.errorMessage}>
                  Пункт в меню положения `{menuPosition.name}` уже существует
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
