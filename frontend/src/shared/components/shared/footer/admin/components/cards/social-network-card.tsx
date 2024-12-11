'use client';

import { Confirm, Loader, SocialNetworkEditForm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectItemDeleting } from '@/shared/lib/features/footer/footers-slice';
import { deleteOneSocialNetwork, getFooterItems } from '@/shared/lib/features/footer/footers-thunks';
import { SocialNetworkFields } from '@/shared/types/footer.types';
import { TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

import React from 'react';
import { SocialIcon } from 'react-social-icons';

import styles from './cards.module.css';

interface Props {
  item: SocialNetworkFields;
}

export const SocialNetworkCard: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const socialNetworkDeleting = useAppSelector(selectItemDeleting);

  const handleDelete = async () => {
    try {
      await dispatch(deleteOneSocialNetwork(item._id)).unwrap();
      await dispatch(getFooterItems());
    } catch (error) {
      console.error(error);
      toast.error('Что-то пошло не так, попробуйте еще раз.');
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.networkInfo}>
          <SocialIcon
            network={item.name}
            bgColor='#393F43'
            fgColor='#fff'
            className={styles.networkIcon}
            style={{ height: 30, width: 30, marginRight: '8px' }}
          />
          <h3 className={styles.networkName}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h3>
        </div>

        <div className={styles.actions}>
          <Confirm onOk={handleDelete}>
            <Button disabled={Boolean(socialNetworkDeleting)} size={'sm'} data-test-id='delete'>
              {socialNetworkDeleting === item._id ? <Loader /> : <TrashIcon />}
            </Button>
          </Confirm>
          <SocialNetworkEditForm id={item._id} />
        </div>
      </div>
    </Card>
  );
};
