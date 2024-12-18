'use client';

import { Confirm, Loader, MenuPositionEditForm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { selectItemDeleting } from '@/shared/lib/features/footer/footers-slice';
import { deleteMenuPosition, getFooterItems } from '@/shared/lib/features/footer/footers-thunks';
import { MenuPositionFields } from '@/shared/types/footer.types';
import { LinkIcon } from '@heroicons/react/24/outline';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

import React from 'react';

import styles from './cards.module.css';

interface Props {
  item: MenuPositionFields;
}

export const MenuPositionCard: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const menuPositionDeleting = useAppSelector(selectItemDeleting);

  const handleDelete = async () => {
    try {
      await dispatch(deleteMenuPosition(item._id)).unwrap();
      await dispatch(getFooterItems());
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return (
    <Card className={cn(styles.menuPositionCard, 'dark:bg-[#1F2937]')}>
      <div className={styles.menuPositionCardHeader}>
        <div className={styles.menuPositionCardTitleContainer}>
          <LinkIcon className={styles.menuPositionCardIcon} />
          <h3 className={styles.menuPositionCardTitle}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h3>
        </div>

        <div className={styles.menuPositionCardActions}>
          <Confirm onOk={handleDelete}>
            <Button disabled={Boolean(menuPositionDeleting)} size={'sm'} data-test-id='delete'>
              {menuPositionDeleting === item._id ? <Loader /> : <Trash />}
            </Button>
          </Confirm>
          <MenuPositionEditForm id={item._id} />
        </div>
      </div>
    </Card>
  );
};
