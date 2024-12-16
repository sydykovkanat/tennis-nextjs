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
import { selectItemUpdating, selectOneSocialLink } from '@/shared/lib/features/footer/footers-slice';
import { getFooterItems, getOneSocialNetwork, updateSocialNetwork } from '@/shared/lib/features/footer/footers-thunks';
import { LinkDataMutation } from '@/shared/types/footer.types';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

import React, { type FormEvent, useEffect, useRef, useState } from 'react';

import styles from './social-network-forms.module.css';

interface Props {
  id: string;
}

export const SocialNetworkEditForm: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const socialOneNetworkData = useAppSelector(selectOneSocialLink);
  const socialNetworkUpdating = useAppSelector(selectItemUpdating);
  const [socialNetwork, setSocialNetwork] = useState<LinkDataMutation>({
    name: '',
    value: '',
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      dispatch(getOneSocialNetwork(id));
    }
  }, [dispatch, id, open]);

  useEffect(() => {
    if (open && socialOneNetworkData) {
      const network = socialOneNetworkData.socialNetwork[0];
      setSocialNetwork((prevState) => ({
        ...prevState,
        name: network.name,
        value: network.value,
      }));
    }
  }, [open, socialOneNetworkData]);

  useEffect(() => {
    if (!open) {
      setSocialNetwork({
        name: '',
        value: '',
      });
    }
  }, [open]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSocialNetwork((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      if (socialNetwork.name.trim().length !== 0 && socialNetwork.value.trim().length !== 0) {
        closeRef.current?.click();
        await dispatch(updateSocialNetwork({ id, data: socialNetwork })).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setSocialNetwork({
          name: '',
          value: '',
        });
        toast.success('Социальная сеть успешно обновлена.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при обновлении социальной сети.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'} data-test-id='edit'>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'}>
        <DialogHeader>
          <DialogTitle>
            {socialNetwork.name === 'email' ? 'Редактировать электронную почту' : 'Редактировать социальную сеть'}
          </DialogTitle>
          <DialogDescription>Заполните форму перед обновлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Label htmlFor={'social-network'}>
                {socialNetwork.name === 'email' ? 'Адрес электронной почты' : 'Адрес социальной сети'}
              </Label>
              <Input
                type={socialNetwork.name === 'email' ? 'email' : 'url'}
                name='value'
                value={socialNetwork.value}
                onChange={inputChangeHandler}
                placeholder={
                  socialNetwork.name === 'email' ? 'Введите адрес электронной почты' : 'Введите URL социальной сети'
                }
                id={'social-network'}
              />
            </div>
            <div className={styles.formActions}>
              <Button
                disabled={socialNetwork.name.trim().length === 0 || socialNetwork.value.trim().length === 0}
                size={'sm'}
              >
                Сохранить {socialNetworkUpdating && <Loader size={'sm'} theme={'light'} />}
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
