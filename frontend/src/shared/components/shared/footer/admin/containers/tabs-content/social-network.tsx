'use client';

import { Loader, SocialNetworkCard, SocialNetworkCreateForm } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { selectItemsData, selectItemsFetching } from '@/shared/lib/features/footer/footers-slice';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import styles from './tab-content.module.css';

export const SocialNetwork = () => {
  const socialNetworkData = useAppSelector(selectItemsData);
  const socialNetworkFetching = useAppSelector(selectItemsFetching);

  return (
    <div className={styles.socialNetworkContainer}>
      {socialNetworkFetching ? (
        <div className={styles.socialNetworkLoader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.socialNetworkCreateFormContainer}>
            <SocialNetworkCreateForm>
              <Button className={styles.socialNetworkButton}>
                Добавить социальную сеть <SquaresPlusIcon />
              </Button>
            </SocialNetworkCreateForm>
          </div>

          {(!socialNetworkFetching && socialNetworkData.length === 0) ||
          (socialNetworkData.length > 0 && socialNetworkData[0].socialNetwork.length === 0) ? (
            <small className={styles.socialNetworkNoDataMessage}>
              Социальные сети не найдены.
              <SocialNetworkCreateForm>
                <button className={styles.socialNetworkAddButton}>Добавить социальную сеть</button>
              </SocialNetworkCreateForm>
            </small>
          ) : (
            <div className={styles.socialNetworkCardContainer}>
              {socialNetworkData.length > 0 &&
                socialNetworkData[0].socialNetwork.map((item) => <SocialNetworkCard key={item._id} item={item} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
};