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
import { selectItemUpdating } from '@/shared/lib/features/footer/footers-slice';
import { getFooterItems, updateMainPartnerImage } from '@/shared/lib/features/footer/footers-thunks';
import { MainPartnerForm } from '@/shared/types/footer.types';
import { toast } from 'sonner';

import React, { type FormEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';

import styles from './main-partner-form.module.css';

export const MainPartnerEditForm: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const mainPartnerUpdating = useAppSelector(selectItemUpdating);
  const [mainPartner, setMainPartner] = useState<MainPartnerForm>({
    image: null,
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      setMainPartner({
        image: null,
      });
    }
  }, [open]);

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setMainPartner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (mainPartner.image !== null) {
        closeRef.current?.click();
        await dispatch(updateMainPartnerImage({ mainPartnerImageLink: mainPartner.image })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setMainPartner({
          image: null,
        });
        toast.success('Изображение успешно обновлено.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновление изображения.');
    }
  };

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
