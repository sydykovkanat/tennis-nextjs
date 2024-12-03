'use client';

import { NavigationItems } from '@/shared/components/shared/navbar/menu-items';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { logout } from '@/shared/lib/features/users/users-thunks';
import { FooterElementsData } from '@/shared/types/footer.types';
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';

import styles from './navbar.module.css';

interface Props {
  footerItemsData: FooterElementsData[];
}

export const NavbarMobile: React.FC<Props> = ({ footerItemsData }) => {
  const pathname = usePathname();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPosition, setIsOpenPosition] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const toggleStatePosition = () => {
    setIsOpenPosition((prevState) => !prevState);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Bars3Icon className={styles.mobileMenuIconBurger} />
      </SheetTrigger>
      <SheetContent className='w-full bg-cr-shark border-0 p-[20px] xs:max-w-[400px]'>
        <SheetTitle className={styles.mobileMenuTitle}>Заголовок диалогового окна</SheetTitle>
        <SheetDescription className={styles.mobileMenuDescription}>Описание диалогового окна</SheetDescription>
        <SheetClose asChild>
          <button aria-label='Закрыть' className={styles.mobileMenuIconCloseTrigger}>
            <XMarkIcon className={styles.mobileMenuIconClone} />
          </button>
        </SheetClose>
        <Link href='/' className={styles.mobileMenuLogoWrapper}>
          <img className={styles.mobileMenuLogo} src='/kslt.svg' alt='КСЛТ' />
        </Link>

        <ul className={styles.mobileMenuUl}>
          {NavigationItems.map((itemMenu, id) => (
            <li key={id} className={styles.mobileMenuLi}>
              <Link
                className={`${pathname === itemMenu.link ? styles.mobileMenuLinkActive : styles.mobileMenuLink}`}
                href={itemMenu.link}
              >
                {itemMenu.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.mobileMenuPosition}>
          {footerItemsData.length > 0 && footerItemsData[0].menuPosition.length > 0 && (
            <div onClick={toggleStatePosition} className={styles.mobileMenuPositionActive}>
              Положение
              <ChevronDownIcon
                className={`${styles.mobileMenuPositionIcon} ${isOpenPosition ? styles.mobileMenuPositionIconActive : styles.mobileMenuPositionIconDisable}`}
              />
            </div>
          )}
          <ul
            className={`${styles.mobileMenuPositionUl} ${
              isOpenPosition ? styles.mobileMenuPositionUlActive : styles.mobileMenuPositionUlDisable
            }`}
          >
            {footerItemsData.length > 0 &&
              footerItemsData[0].menuPosition.map((menuItem) => (
                <li key={menuItem._id}>
                  <a className={styles.mobileMenuPositionULink} target='_blank' href={menuItem.value}>
                    {menuItem.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <ul>
          <li>
            {!user && (
              <Link
                className={`${pathname === '/login' ? styles.mobileMenuLinkActive : styles.mobileMenuLink}`}
                href='/login'
              >
                <span className={cn(styles.underlineAccent, styles.mobileMenuLiActionsText)}>Авторизация</span>
              </Link>
            )}
          </li>
          {user && (
            <li className={styles.mobileMenuLiActions}>
              <Link
                className={`${pathname === '/personal-account' ? styles.mobileMenuLinkActive : styles.mobileMenuLink}`}
                href='/personal-account'
              >
                <span className={styles.mobileMenuLiActionsText}>Личный кабинет</span>
              </Link>
            </li>
          )}
          {user?.role === 'admin' && (
            <li className={styles.mobileMenuLiActions}>
              <Link
                className={`${pathname === '/admin' ? styles.mobileMenuLinkActive : styles.mobileMenuLink}`}
                href='/admin'
              >
                <span className={styles.mobileMenuLiActionsText}>Панель администратора</span>
              </Link>
            </li>
          )}
          {user && (
            <li className={styles.mobileMenuExit} onClick={handleLogout}>
              <span className={cn(styles.underlineAccent, styles.mobileMenuLiActionsText, 'text-white')}>Выйти</span>
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
