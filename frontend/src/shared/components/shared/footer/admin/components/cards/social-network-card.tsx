'use client';

import { Confirm, Loader, SocialNetworkEditForm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { SocialNetworkFields } from '@/shared/types/footer.types';
import { Trash } from 'lucide-react';

import React from 'react';
import { SocialIcon } from 'react-social-icons';

import styles from './cards.module.css';
import { useCards } from './use-cards';

interface Props {
  socialItem: SocialNetworkFields;
}

export const SocialNetworkCard: React.FC<Props> = ({ socialItem }) => {
  const { handleDelete, socialNetworkDeleting } = useCards([socialItem, undefined]);

  return (
    <Card className={cn(styles.card, 'dark:bg-[#1F2937]')}>
      <div className={styles.cardHeader}>
        <div className={styles.networkInfo}>
          <SocialIcon
            network={socialItem.name}
            bgColor='#393F43'
            fgColor='#fff'
            className={styles.networkIcon}
            style={{ height: 30, width: 30, marginRight: '8px' }}
          />
          <h3 className={styles.networkName}>{socialItem.name.charAt(0).toUpperCase() + socialItem.name.slice(1)}</h3>
        </div>

        <div className={styles.actions}>
          <Confirm onOk={handleDelete}>
            <Button disabled={Boolean(socialNetworkDeleting)} size={'sm'} data-test-id='delete'>
              {socialNetworkDeleting === socialItem._id ? <Loader /> : <Trash />}
            </Button>
          </Confirm>
          <SocialNetworkEditForm id={socialItem._id} />
        </div>
      </div>
    </Card>
  );
};
