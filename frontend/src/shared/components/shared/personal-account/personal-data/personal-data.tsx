'use client';

import { UserEdit } from '@/shared/components/shared';
import { useDialog, useFetchUser } from '@/shared/components/shared/personal-account/hooks';
import { Button } from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { Pencil } from 'lucide-react';

import styles from './personal-data.module.css';

export const PersonalData = () => {
  const { open, setOpen } = useDialog();
  useFetchUser();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    currentUser && (
      <main className={cn(styles.mainWrapper)}>
        <div className={cn(styles.divWrapper)}>
          <div className={cn(styles.fullNameDiv)}>
            <h2 className={cn(styles.fullName)}>{currentUser.fullName}</h2>
            <span className={cn(styles.category)}>{currentUser.category.name}</span>
          </div>

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

        <div className={cn(styles.actionsWrapper)}>
          <Button
            icon={Pencil}
            onClick={() => setOpen(true)}
            className={cn(styles.editButton, 'dark:text-white dark:border-white dark:hover:bg-inherit')}
          >
            Редактировать
          </Button>
        </div>

        {open && <UserEdit user={currentUser} open={open} setOpen={setOpen} />}
      </main>
    )
  );
};
