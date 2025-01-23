'use client';

import { Loader } from '@/shared/components/shared';
import { useNavbarLogo } from '@/shared/components/shared/navbar/use-navbar-logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui';
import { API_URL, CURRENT_YEAR_FULL, NAVIGATION_ITEMS } from '@/shared/constants';
import { cn, useAppSelector } from '@/shared/lib';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';
import { FooterElementsData } from '@/shared/types/footer.types';
import { ChevronUpIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import React from 'react';
import { SocialIcon } from 'react-social-icons';

import styles from './footer.module.css';

interface Props {
  dataItems: FooterElementsData[];
}

export const Footer: React.FC<Props> = ({ dataItems }) => {
  const userPermission = useAppSelector(selectUserPermission);
  const { currentLogo, loading } = useNavbarLogo();

  return (
    <div className={cn(styles.footer, 'dark:bg-gray-900')}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerColumn}>
          <div className={styles.logoWrapper}>
            <Link prefetch={true} href='/' className={styles.logo}>
              {loading ? (
                <Loader />
              ) : (
                <img className={styles.logo} src={API_URL + '/' + (currentLogo || 'kslt.svg')} alt='КСЛТ' />
              )}
            </Link>
          </div>
          <div className={styles.copyright}>
            <p>Copyright © {CURRENT_YEAR_FULL} KSLT</p>
            <p>All rights reserved</p>
          </div>
          <div className={styles.socialIcons}>
            {dataItems.length > 0 &&
              dataItems[0].socialNetwork.map((item) => (
                <div key={item._id} className={styles.socialIcon}>
                  <SocialIcon
                    bgColor='#373A40'
                    target={item.isMail ? '_self' : '_blank'}
                    url={item.isMail ? `mailto:${item.value}` : item.value}
                    fgColor='#fff'
                    style={{ height: '32px', width: '32px' }}
                    network={item.name}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className={styles.infoColumns}>
          <div className={styles.infoColumn}>
            <h1 className={styles.heading}>О нас</h1>
            <ul className={styles.linksList}>
              {NAVIGATION_ITEMS.map((itemMenu, id) => (
                <li key={id}>
                  <Link prefetch={true} href={itemMenu.link} className={styles.link}>
                    {itemMenu.name}
                  </Link>
                </li>
              ))}

              {dataItems.length > 0 && dataItems[0].menuPosition.length > 0 && userPermission >= 1 && (
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className={styles.dropdownTrigger}>
                      Положение
                      <ChevronUpIcon className={styles.dropdownIcon} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className={cn(styles.dropdownContent, 'dark:bg-gray-900')}>
                      {dataItems.length > 0 &&
                        dataItems[0].menuPosition.map((menuItem) => (
                          <DropdownMenuItem
                            key={menuItem._id}
                            className={cn(styles.dropdownItem, 'hover:dark:bg-gray-800')}
                          >
                            <a href={menuItem.value} target='_blank' className={styles.dropdownLink}>
                              {menuItem.name}
                            </a>
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.infoColumn}>
            <h1 className={styles.heading}>Условия</h1>
            <ul className={styles.linksList}>
              <li>
                <a target='_blank' href={dataItems.length > 0 ? dataItems[0].publicOffer : ''} className={styles.link}>
                  Публичная оферта
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.partnerColumn}>
            <h1 className={cn(styles.headingMainPartner)}>Генеральный партнер</h1>
            <img
              src={
                dataItems.length > 0 && dataItems[0].mainPartnerImage
                  ? `${API_URL}/${dataItems[0].mainPartnerImage}`
                  : ''
              }
              alt='Ген.партнер'
              className={styles.partnerImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
