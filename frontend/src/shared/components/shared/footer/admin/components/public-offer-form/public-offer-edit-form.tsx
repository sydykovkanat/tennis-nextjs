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

import styles from './public-offer-form.module.css';
import { usePublicOffer } from './use-public-offer';

export const PublicOfferEditForm: React.FC<PropsWithChildren> = ({ children }) => {
  const { publicOfferUpdating, publicOffer, open, setOpen, closeRef, inputChangeHandler, handleSubmit } =
    usePublicOffer();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать публичную оферту</DialogTitle>
          <DialogDescription className={styles.dialogDescription}>Заполните форму перед обновлением</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={styles.formContainer}>
              <Label htmlFor={'public-offer'}>Ссылка на оферту</Label>
              <Input
                type='url'
                name='publicOffer'
                value={publicOffer}
                onChange={inputChangeHandler}
                placeholder={'Введите URL публичной оферты'}
                id={'public-offer'}
              />
            </div>
            <div className={styles.formActions}>
              <Button disabled={publicOffer.trim().length === 0}>
                Сохранить {publicOfferUpdating && <Loader size={'sm'} theme={'light'} />}
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
