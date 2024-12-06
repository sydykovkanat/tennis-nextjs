'use client';

import { Loader } from '@/shared/components/shared';
import { NavigationItems } from '@/shared/components/shared/navbar/menu-items';
import NavBarDropDown from '@/shared/components/shared/navbar/nav-bar-drop-down';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/components/ui/navigation-menu';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { useAppSelector } from '@/shared/lib/store';
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
          <Link href='/' className={styles.logoWrapper}>
            <img className={styles.logo} src='/kslt.svg' alt='КСЛТ' />
          </Link>

          <div className={styles.headerMainNavInner}>
            <ul className={styles.headerMainNav}>
              {NavigationItems.map((itemMenu, id) => (
                <li key={id}>
                  <Link
                    className={`${pathname === itemMenu.link ? styles.mainNavLinkActive : styles.mainNavLink}`}
                    href={itemMenu.link}
                  >
                    {itemMenu.name}
                  </Link>
                </li>
              ))}
              {dataItems.length > 0 && (
                <li>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className='text-white'>Положение</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className={styles.navigationMenuContent}>
                            {dataItems[0].menuPosition.map((menuItem) => (
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
              )}
            </ul>
          </div>

          <div className={styles.navigationMenu}>
            {isHydrated ? (
              user ? (
                <NavBarDropDown />
              ) : (
                <Link className='text-white underline' href='/login'>
                  Авторизация
                </Link>
              )
            ) : (
              <div className={'size-6 grid place-items-center'}>
                <Loader theme={'light'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
