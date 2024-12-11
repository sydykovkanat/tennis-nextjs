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
import { selectItemUpdating, selectItemsData } from '@/shared/lib/features/footer/footers-slice';
import { getFooterItems, updatePublicOffer } from '@/shared/lib/features/footer/footers-thunks';
import { toast } from 'sonner';

import React, { type FormEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';

import styles from './public-offer-form.module.css';

export const PublicOfferEditForm: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const publicOfferData = useAppSelector(selectItemsData);
  const publicOfferUpdating = useAppSelector(selectItemUpdating);
  const [publicOffer, setPublicOffer] = useState<string>('');
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && publicOfferData) {
      setPublicOffer(publicOfferData[0].publicOffer);
    }
  }, [open, publicOfferData]);

  useEffect(() => {
    if (!open) {
      setPublicOffer('');
    }
  }, [open]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicOffer(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (publicOffer.trim().length !== 0) {
        closeRef.current?.click();
        await dispatch(updatePublicOffer({ publicOfferLink: publicOffer })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setPublicOffer('');
        toast.success('Публичная оферта успешно обновлена.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление публичной оферты.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать публичную оферту</DialogTitle>
          <DialogDescription>Заполните форму перед обновлением.</DialogDescription>
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
              <Button disabled={publicOffer.trim().length === 0} size={'sm'}>
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
