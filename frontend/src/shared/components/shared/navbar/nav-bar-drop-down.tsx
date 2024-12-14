'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { logout } from '@/shared/lib/features/users/users-thunks';
import { ArrowRightStartOnRectangleIcon, Cog6ToothIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import styles from './navbar.module.css';

const NavBarDropDown = () => {
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setDropDown(false);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger onClick={() => setDropDown(true)}>
          <UserCircleIcon className={styles.userCircleIconNavBar} />
        </DropdownMenuTrigger>
        {dropDown && (
          <DropdownMenuContent className='dark:bg-gray-900'>
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='hover:dark:bg-gray-800' onClick={() => setDropDown(false)}>
              <Link prefetch={true} className={styles.navigationMenuDropDown} href='/personal-account'>
                <UserIcon className={styles.iconMenuDropDown} />
                Личный кабинет
              </Link>
            </DropdownMenuItem>
            {user?.role === 'admin' && (
              <DropdownMenuItem className='hover:dark:bg-gray-800' onClick={() => setDropDown(false)}>
                <Link prefetch={true} className={styles.navigationMenuDropDown} href='/admin' id={'admin'}>
                  <Cog6ToothIcon className={styles.iconMenuDropDown} />
                  Панель администратора
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className={cn(styles.navigationMenuDropDown, 'hover:dark:bg-gray-800')}
            >
              <ArrowRightStartOnRectangleIcon />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};

export default NavBarDropDown;
