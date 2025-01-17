'use client';

import { Loader, NavbarMobile, ThemeSwitcher } from '@/shared/components/shared';
import NavBarDropDown from '@/shared/components/shared/navbar/nav-bar-drop-down';
import { useNavbarLogo } from '@/shared/components/shared/navbar/use-navbar-logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/components/ui';
import { API_URL, NAVIGATION_ITEMS } from '@/shared/constants';
import { cn, useAppSelector } from '@/shared/lib';
import { selectUser, selectUserPermission } from '@/shared/lib/features/users/users-slice';
import { FooterElementsData } from '@/shared/types/footer.types';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';

import styles from './navbar.module.css';

interface Props {
  dataItems: FooterElementsData[];
}

export const Navbar: React.FC<Props> = ({ dataItems }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { theme } = useTheme();
  const user = useAppSelector(selectUser);
  const pathname = usePathname();
  const userPermission = useAppSelector(selectUserPermission);

  const { currentLogo, loading } = useNavbarLogo();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div className={cn(styles.header, 'dark:bg-gray-900')}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          <Link prefetch={true} href='/' className={styles.logoWrapper}>
            {loading ? (
              <Loader />
            ) : (
              <img className={styles.logo} src={API_URL + '/' + (currentLogo || 'kslt.svg')} alt='КСЛТ' />
            )}
          </Link>

          <div className={styles.navBarMobile}>
            <NavbarMobile footerItemsData={dataItems} />
          </div>

          <div className={styles.headerMainNavInner}>
            <ul className={styles.headerMainNav}>
              {NAVIGATION_ITEMS.map((itemMenu, id) => (
                <li key={id}>
                  <Link
                    prefetch={true}
                    className={cn(pathname === itemMenu.link ? styles.mainNavLinkActive : styles.mainNavLink)}
                    href={itemMenu.link}
                  >
                    {itemMenu.name}
                  </Link>
                </li>
              ))}

              {dataItems.length > 0 && dataItems[0].menuPosition.length > 0 && userPermission >= 1 && (
                <li>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={styles.navigationMenuTrigger}>
                          Положение
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className={cn(styles.navigationMenuContent, 'dark:bg-gray-900')}>
                            {dataItems.length > 0 &&
                              dataItems[0].menuPosition.map((menuItem) => (
                                <li
                                  key={menuItem._id}
                                  className={cn(styles.navigationMenuList, 'hover:dark:bg-gray-800')}
                                >
                                  <NavigationMenuLink
                                    className={styles.navigationMenuLink}
                                    href={menuItem.value}
                                    target='_blank'
                                  >
                                    {menuItem.name}
                                  </NavigationMenuLink>
                                </li>
                              ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.navigationMenu}>
            {isHydrated ? (
              <>
                <ThemeSwitcher />
                {user ? (
                  <NavBarDropDown />
                ) : (
                  <Link prefetch={true} className={cn(styles.underlineAccent)} href='/login'>
                    Авторизация
                  </Link>
                )}
              </>
            ) : (
              <div className={styles.loaderStatusAuth}>
                <Loader theme={theme === 'dark' ? 'light' : 'dark'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
