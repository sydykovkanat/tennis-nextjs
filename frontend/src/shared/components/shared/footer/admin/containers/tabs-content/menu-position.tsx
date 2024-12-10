'use client';

import { Loader, MenuPositionCard, MenuPositionCreateForm } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { selectItemsData, selectItemsFetching } from '@/shared/lib/features/footer/footers-slice';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import styles from './tab-content.module.css';

export const MenuPosition = () => {
  const menuPositionData = useAppSelector(selectItemsData);
  const menuPositionFetching = useAppSelector(selectItemsFetching);

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
                <SquaresPlusIcon />
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
                menuPositionData[0].menuPosition.map((item) => <MenuPositionCard key={item._id} item={item} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
};
