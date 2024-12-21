'use client';

import { UserEdit } from '@/shared/components/shared';
import { useDialog, useFetchUser } from '@/shared/components/shared/personal-account/hooks';
import styles from '@/shared/components/shared/personal-account/personal-account.module.css';
import { Button } from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { Pencil } from 'lucide-react';

import React from 'react';

export const PersonalData = () => {
  const { open, setOpen } = useDialog();
  useFetchUser();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    currentUser && (
      <div className='overflow-x-hidden'>
        <main className={cn(styles.mainWrapper)}>
          <div className={cn(styles.fullNameDiv)}>
            <h2 className={cn(styles.fullName)}>{currentUser.fullName}</h2>
            <span className={cn(styles.greenText)}>{currentUser.category.name}</span>
          </div>

          <div className={cn(styles.divWrapper, 'mb-5')}>
            <div className={cn(styles.textWrapper)}>
              <h3 className={cn(styles.title)}>Почта</h3>
              <span className={cn(styles.subtitle)}>{currentUser.email}</span>
            </div>

            <div className={cn(styles.textWrapper)}>
              <h3 className={cn(styles.title)}>Телефон</h3>
              <span className={cn(styles.subtitle)}>{currentUser.telephone}</span>
            </div>

            <div className={cn(styles.textWrapper)}>
              <h3 className={cn(styles.title)}>Дата рождения</h3>
              <span className={cn(styles.subtitle)}>{currentUser.dateOfBirth}</span>
            </div>

            <div className={cn(styles.textWrapper)}>
              <h3 className={cn(styles.title)}>Пол</h3>
              <span className={cn(styles.subtitle)}>{currentUser.gender === 'male' ? 'Мужской' : 'Женский'}</span>
            </div>
          </div>

          <div className={cn('flex justify-between')}>
            <Button
              icon={Pencil}
              onClick={() => setOpen(true)}
              className={cn(
                'text-inherit bg-transparent border border-black rounded-lg dark:text-white dark:border-white hover:text-white dark:hover:bg-inherit',
              )}
            >
              Редактировать
            </Button>
          </div>
          {open && <UserEdit user={currentUser} open={open} setOpen={setOpen} />}
        </main>
      </div>
    )
  );
};
