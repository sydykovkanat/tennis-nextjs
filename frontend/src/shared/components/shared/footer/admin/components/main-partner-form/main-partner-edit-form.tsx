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

import styles from './main-partner-form.module.css';
import { useMainPartner } from './use-main-partner';

export const MainPartnerEditForm: React.FC<PropsWithChildren> = ({ children }) => {
  const { mainPartnerUpdating, mainPartner, onChangeFileInput, handleSubmit, open, setOpen, closeRef } =
    useMainPartner();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='dark:bg-[#1F2937]'>
        <DialogHeader>
          <DialogTitle>Редактировать изображение</DialogTitle>
          <DialogDescription>Заполните форму перед обновлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={styles.formContainer}>
              <Label htmlFor={'image'}>Изображение партнера</Label>
              <Input id='image' accept='image/*' type='file' name='image' onChange={onChangeFileInput} />
            </div>
            <div className={styles.formActions}>
              <Button disabled={mainPartner.image === null} size={'sm'}>
                Сохранить {mainPartnerUpdating && <Loader size={'sm'} theme={'light'} />}
              </Button>
              <DialogClose ref={closeRef} asChild>
                <Button type={'button'} variant={'outline'}>
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
