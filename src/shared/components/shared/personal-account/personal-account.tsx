'use client';

import { Container, GradientCircle, UserEdit, userCircles } from '@/shared/components/shared';
import { useFetchUser } from '@/shared/components/shared/personal-account/hooks';
import styles from '@/shared/components/shared/personal-account/personal-account.module.css';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { addTokenInterceptors } from '@/shared/lib/helpers/axios-api';
import { store, useAppSelector } from '@/shared/lib/store';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import React from 'react';

import { Button } from '../../ui/button';

addTokenInterceptors(store);

const PersonalAccount: React.FC = () => {
  useFetchUser();
  const currentUser = useAppSelector(selectCurrentUser);
  if (!currentUser) return null;
  return (
    currentUser && (
      <>
        <Container className={'w-full'}>
          {userCircles.map((circle, id) => (
            <GradientCircle key={id} {...circle} />
          ))}
          <div className={styles.accountWrapper} style={{ boxShadow: '2px 0 89px 0 rgba(0, 0, 0, 0.1)' }}>
            <header className={styles.accountHeader}>
              <div>
                <h1>Личный кабинет</h1>
                <small>Ваша персональная информация и управление данными</small>
              </div>
              <UserEdit user={currentUser}>
                <Button icon={PencilSquareIcon}>Редактировать</Button>
              </UserEdit>
            </header>

            <main className='mt-2 flex flex-col max-w-2xl'>
              <div className='mb-3 flex flex-col'>
                <h2 className='text-xl dark:text-black font-medium'>{currentUser.fullName}</h2>
                <span className='text-[#64B32C]'>{currentUser.category.name}</span>
              </div>

              <div className='space-y-2 flex flex-col'>
                <div className='flex flex-wrap'>
                  <h3 className={styles.title}>Почта</h3>
                  <span className={styles.subtitle}>{currentUser.email}</span>
                </div>

                <div className='flex flex-wrap'>
                  <h3 className={styles.title}>Телефон</h3>
                  <span className={styles.subtitle}>{currentUser.telephone}</span>
                </div>

                <div className='flex flex-wrap'>
                  <h3 className={styles.title}>День рождения</h3>
                  <span className={styles.subtitle}>{currentUser.dateOfBirth}</span>
                </div>

                <div className='flex flex-wrap'>
                  <h3 className={styles.title}>Пол</h3>
                  <span className={styles.subtitle}>{currentUser.gender === 'male' ? 'Муж.' : 'Жен.'}</span>
                </div>

                {currentUser.role === 'admin' && (
                  <div className='flex flex-wrap'>
                    <h3 className={styles.title}>Роль</h3>
                    <span className={styles.subtitle}>{currentUser.role === 'admin' ? 'Админ' : 'Пользователь'}</span>
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
