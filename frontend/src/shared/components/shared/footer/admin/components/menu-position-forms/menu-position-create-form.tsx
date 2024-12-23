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

import React, { PropsWithChildren } from 'react';

import styles from './menu-position-forms.module.css';
import { useMenuPosition } from './use-menu-position';

export const MenuPositionCreateForm: React.FC<PropsWithChildren> = ({ children }) => {
  const { menuPositionCreating, menuPosition, open, setOpen, inputChangeHandler, handleSubmit, closeRef, isBlocked } =
    useMenuPosition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'}>
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
