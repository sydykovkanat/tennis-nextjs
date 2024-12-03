'use client';

import { Container } from '@/shared/components/shared';
import styles from '@/shared/components/shared/personal-account/personal-account.module.css';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectCurrentUser, selectUser } from '@/shared/lib/features/users/users-slice';
import { fetchOneUser } from '@/shared/lib/features/users/users-thunks';
import { useRouter } from 'next/navigation';

import React from 'react';

import { Button } from '../../ui/button';

const PersonalAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();

  React.useEffect(() => {
    if (!user) return router.push('/login');

    dispatch(fetchOneUser(user._id));
  }, [dispatch, user, router]);

  return (
    currentUser && (
      <>
        <Container className={'w-full'}>
          <div className={styles.accountWrapper} style={{ boxShadow: '2px 0 89px 0 rgba(0, 0, 0, 0.1)' }}>
            <header className={styles.accountHeader}>
              <div>
                <h1>Личный кабинет</h1>
                <small>Ваша персональная информация и управление данными</small>
              </div>

              <Button>Редактировать</Button>
            </header>

            <main className='mt-2 flex flex-col max-w-2xl'>
              <div className='mb-3 flex flex-col'>
                <h2 className='text-xl dark:text-black font-medium'>{currentUser.fullName}</h2>
                <span className='text-[#64B32C]'>{currentUser.category.name}</span>
              </div>

              <div className='space-y-2 flex flex-col'>
                <div className='flex flex-wrap'>
                  <h3 className='font-medium w-full dark:text-black  sm:w-1/3'>Почта</h3>
                  <span className='text-muted-foreground w-full sm:w-2/3 break-words'>{currentUser.email}</span>
                </div>

                <div className='flex flex-wrap'>
                  <h3 className='font-medium w-full dark:text-black  sm:w-1/3'>Телефон</h3>
                  <span className='text-muted-foreground w-full sm:w-2/3'>{currentUser.telephone}</span>
                </div>

                <div className='flex flex-wrap'>
                  <h3 className='font-medium w-full dark:text-black  sm:w-1/3'>День рождения</h3>
                  <span className='text-muted-foreground w-full sm:w-2/3'>{currentUser.dateOfBirth}</span>
                </div>

                <div className='flex flex-wrap'>
                  <h3 className='font-medium w-full dark:text-black  sm:w-1/3'>Пол</h3>
                  <span className='text-muted-foreground w-full sm:w-2/3'>
                    {currentUser.gender === 'male' ? 'Муж.' : 'Жен.'}
                  </span>
                </div>

                {currentUser.role === 'admin' && (
                  <div className='flex flex-wrap'>
                    <h3 className='font-medium w-full dark:text-black  sm:w-1/3'>Роль</h3>
                    <span className='text-muted-foreground w-full sm:w-2/3'>
                      {currentUser.role === 'admin' ? 'Админ' : 'Пользователь'}
                    </span>
                  </div>
                )}
              </div>
            </main>
          </div>
        </Container>
      </>
    )
  );
};

export default PersonalAccount;
