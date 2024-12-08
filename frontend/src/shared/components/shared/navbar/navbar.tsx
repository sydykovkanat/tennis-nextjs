'use client';

import { Loader, NavbarMobile } from '@/shared/components/shared';
import NavBarDropDown from '@/shared/components/shared/navbar/nav-bar-drop-down';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/components/ui';
import { NAVIGATION_ITEMS } from '@/shared/constants';
import { cn, useAppSelector } from '@/shared/lib';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { FooterElementsData } from '@/shared/types/footer.types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';

import styles from './navbar.module.css';

interface Props {
  dataItems: FooterElementsData[];
}

export const Navbar: React.FC<Props> = ({ dataItems }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const user = useAppSelector(selectUser);
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          <Link prefetch={true} href='/frontend/public' className={styles.logoWrapper}>
            <img className={styles.logo} src='/kslt.svg' alt='КСЛТ' />
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
              <li>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      {dataItems.length > 0 && dataItems[0].menuPosition.length > 0 && (
                        <NavigationMenuTrigger className='text-white'>Положение</NavigationMenuTrigger>
                      )}
                      <NavigationMenuContent>
                        <ul className={styles.navigationMenuContent}>
                          {dataItems.length > 0 &&
                            dataItems[0].menuPosition.map((menuItem) => (
                              <li key={menuItem._id} className={styles.navigationMenuList}>
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
            </ul>
          </div>

          <div className={styles.navigationMenu}>
            {isHydrated ? (
              user ? (
                <NavBarDropDown />
              ) : (
                <Link prefetch={true} className={cn(styles.underlineAccent, 'text-white')} href='/login'>
                  Авторизация
                </Link>
              )
            ) : (
              <div className={styles.loaderStatusAuth}>
                <Loader theme={'light'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
