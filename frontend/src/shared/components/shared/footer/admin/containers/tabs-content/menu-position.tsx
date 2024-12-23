'use client';

import { Loader, MenuPositionCard, MenuPositionCreateForm } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { Grid2X2PlusIcon } from 'lucide-react';

import styles from './tab-content.module.css';
import { useTabsContent } from './use-tabs-content';

export const MenuPosition = () => {
  const { menuPositionData, menuPositionFetching } = useTabsContent();

  return (
    <div className={styles.menuPositionContainer}>
      {menuPositionFetching ? (
        <div className={styles.menuPositionLoader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.menuPositionCreateButtonContainer}>
            <MenuPositionCreateForm>
              <Button className={styles.menuPositionButton}>
                Добавить пункт в положение
                <Grid2X2PlusIcon />
              </Button>
            </MenuPositionCreateForm>
          </div>

          {(!menuPositionFetching && menuPositionData.length === 0) ||
          (menuPositionData.length > 0 && menuPositionData[0].menuPosition.length === 0) ? (
            <small className={styles.menuPositionNoItemsMessage}>
              Пунктов в меню не найдено.
              <MenuPositionCreateForm>
                <button className={styles.menuPositionAddButton}>Добавить пункт в меню.</button>
              </MenuPositionCreateForm>
            </small>
          ) : (
            <div className={styles.menuPositionCardContainer}>
              {menuPositionData.length > 0 &&
                menuPositionData[0].menuPosition.map((item) => <MenuPositionCard key={item._id} menuItem={item} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
};
