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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectItemCreating, selectItemsData } from '@/shared/lib/features/footer/footers-slice';
import { createSocialNetwork, getFooterItems } from '@/shared/lib/features/footer/footers-thunks';
import { LinkDataMutation, SocialNetworkIconsValue } from '@/shared/types/footer.types';
import { toast } from 'sonner';

import React, { type FormEvent, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { SocialIcon } from 'react-social-icons';

import styles from './social-network-forms.module.css';

const SocialNetworkIcons: SocialNetworkIconsValue[] = [
  { name: 'instagram' },
  { name: 'telegram' },
  { name: 'facebook' },
  { name: 'email' },
  { name: 'whatsapp' },
];

export const SocialNetworkCreateForm: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const socialNetworkData = useAppSelector(selectItemsData);
  const socialNetworkCreating = useAppSelector(selectItemCreating);
  const [socialNetwork, setSocialNetwork] = useState<LinkDataMutation>({
    name: '',
    value: '',
  });
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedSocial = socialNetworkData?.[0]?.socialNetwork?.map((item) => item.name.toLowerCase()) ?? [];
  const isBlocked = blockedSocial.includes(socialNetwork.name.toLowerCase());

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
      if (socialNetwork.name.trim().length !== 0 && socialNetwork.value.trim().length !== 0 && !isBlocked) {
        closeRef.current?.click();
        await dispatch(createSocialNetwork(socialNetwork)).unwrap();
        await dispatch(getFooterItems()).unwrap();
        setSocialNetwork({
          name: '',
          value: '',
        });
        toast.success('Социальная сеть успешно добавлена.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при добавлении социальной сети.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'}>
        <DialogHeader>
          <DialogTitle>
            {socialNetwork.name === 'email' ? 'Добавить электронную почту' : 'Добавить социальную сеть'}
          </DialogTitle>
          <DialogDescription>Заполните форму перед добавлением.</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              {isBlocked && (
                <small className={styles.errorMessage}>Социальная сеть {socialNetwork.name} уже существует.</small>
              )}
              <Select
                value={socialNetwork.name}
                onValueChange={(name) => setSocialNetwork((prevState) => ({ ...prevState, name: name }))}
              >
                <SelectTrigger className={'dark:border-gray-300 focus:dark:border-transparent'}>
                  <SelectValue placeholder='Выберите социальную сеть' />
                </SelectTrigger>
                <SelectContent className={'dark:bg-gray-900'}>
                  {SocialNetworkIcons.map((icon) => (
                    <SelectItem className={'hover:dark:bg-gray-800 focus:dark:bg-gray-800'} key={icon.name} value={icon.name}>
                      <SocialIcon
                        network={icon.name}
                        bgColor='#393F43'
                        fgColor='#fff'
                        style={{ height: 20, width: 20, marginRight: '5px' }}
                      />
                      {icon.name.charAt(0).toUpperCase() + icon.name.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor={'social-network'}>
                {socialNetwork.name === 'email' ? 'Адрес электронной почты' : 'Адрес социальной сети'}
              </Label>
              <Input
                name='value'
                type={socialNetwork.name === 'email' ? 'email' : 'url'}
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
                disabled={
                  socialNetwork.name.trim().length === 0 || socialNetwork.value.trim().length === 0 || isBlocked
                }
                size={'sm'}
              >
                Добавить {socialNetworkCreating && <Loader size={'sm'} theme={'light'} />}
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
