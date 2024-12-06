'use client';

import { NavbarMobile } from '@/shared/components/shared';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/components/ui';
import { NAVIGATION_ITEMS } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { useAppSelector } from '@/shared/lib/store';
import { FooterElementsData } from '@/shared/types/footer.types';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';

import styles from './navbar.module.css';

const NavBarDropDown = dynamic(() => import('./nav-bar-drop-down').then((mod) => mod.default), { ssr: false });

interface Props {
  dataItems: FooterElementsData[];
}

export const Navbar: React.FC<Props> = ({ dataItems }) => {
  const [mounted, setMounted] = useState(false);

  const user = useAppSelector(selectUser);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          <Link href='/' className={styles.logoWrapper}>
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
            {user ? (
              <NavBarDropDown />
            ) : (
              <Link className={cn(styles.underlineAccent, 'text-white')} href='/login'>
                Авторизация
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
