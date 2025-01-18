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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';

import React, { PropsWithChildren } from 'react';
import { SocialIcon } from 'react-social-icons';

import { SocialNetworkIcons } from '../../constants';
import styles from './social-network-forms.module.css';
import { useSocialNetwork } from './use-social-network';

export const SocialNetworkCreateForm: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    setSocialNetwork,
    socialNetwork,
    closeRef,
    isBlocked,
    inputChangeHandler,
    setOpen,
    open,
    socialNetworkCreating,
    handleSubmit,
  } = useSocialNetwork();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {socialNetwork.name === 'email' ? 'Добавить электронную почту' : 'Добавить социальную сеть'}
          </DialogTitle>
          <DialogDescription className={styles.dialogDescription}>Заполните форму перед добавлением</DialogDescription>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              {isBlocked && (
                <small className={styles.errorMessage}>Социальная сеть {socialNetwork.name} уже существует</small>
              )}
              <Select
                value={socialNetwork.name}
                onValueChange={(name) => setSocialNetwork((prevState) => ({ ...prevState, name: name }))}
              >
                <SelectTrigger className={'dark:border-gray-300 focus:dark:border-transparent'}>
                  <SelectValue placeholder='Выберите социальную сеть' />
                </SelectTrigger>
                <SelectContent>
                  {SocialNetworkIcons.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
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
