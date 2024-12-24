'use client';

import { Confirm, Loader, MenuPositionEditForm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { MenuPositionFields } from '@/shared/types/footer.types';
import { LinkIcon } from '@heroicons/react/24/outline';
import { Trash } from 'lucide-react';

import React from 'react';

import styles from './cards.module.css';
import { useCards } from './use-cards';

interface Props {
  menuItem: MenuPositionFields;
}

export const MenuPositionCard: React.FC<Props> = ({ menuItem }) => {
  const { handleDelete, menuPositionDeleting } = useCards([undefined, menuItem]);

  return (
    <Card className={cn(styles.menuPositionCard, 'dark:bg-[#1F2937]')}>
      <div className={styles.menuPositionCardHeader}>
        <div className={styles.menuPositionCardTitleContainer}>
          <LinkIcon className={styles.menuPositionCardIcon} />
          <h3 className={styles.menuPositionCardTitle}>
            {menuItem.name.charAt(0).toUpperCase() + menuItem.name.slice(1)}
          </h3>
        </div>

        <div className={styles.menuPositionCardActions}>
          <Confirm onOk={handleDelete}>
            <Button disabled={Boolean(menuPositionDeleting)} size={'sm'} data-test-id='delete'>
              {menuPositionDeleting === menuItem._id ? <Loader /> : <Trash />}
            </Button>
          </Confirm>
          <MenuPositionEditForm id={menuItem._id} />
        </div>
      </div>
    </Card>
  );
};
