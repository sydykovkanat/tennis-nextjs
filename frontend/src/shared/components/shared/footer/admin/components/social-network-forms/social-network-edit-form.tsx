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
import { getOneSocialNetwork } from '@/shared/lib/features/footer/footers-thunks';
import { Pencil } from 'lucide-react';

import React, { useEffect } from 'react';

import styles from './social-network-forms.module.css';
import { useSocialNetwork } from './use-social-network';

interface Props {
  id: string;
}

export const SocialNetworkEditForm: React.FC<Props> = ({ id }) => {
  const {
    dispatch,
    socialOneNetworkData,
    socialNetworkUpdating,
    socialNetwork,
    setSocialNetwork,
    open,
    setOpen,
    closeRef,
    inputChangeHandler,
    handleSubmit,
  } = useSocialNetwork(id);

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
  }, [open, socialOneNetworkData, setSocialNetwork]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'} data-test-id='edit'>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {socialNetwork.name === 'email' ? 'Редактировать электронную почту' : 'Редактировать социальную сеть'}
          </DialogTitle>
          <DialogDescription className={styles.dialogDescription}>Заполните форму перед обновлением</DialogDescription>
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
              <Button disabled={socialNetwork.name.trim().length === 0 || socialNetwork.value.trim().length === 0}>
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
