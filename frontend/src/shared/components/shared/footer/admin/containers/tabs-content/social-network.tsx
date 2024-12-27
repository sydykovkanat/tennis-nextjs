'use client';

import { Loader, SocialNetworkCard, SocialNetworkCreateForm } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { Grid2X2PlusIcon } from 'lucide-react';

import { useEffect } from 'react';

import styles from './tab-content.module.css';
import { useTabsContent } from './use-tabs-content';

export const SocialNetwork = () => {
  const { socialNetworkData, socialNetworkFetching, setIsClient, isClient } = useTabsContent();

  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  return (
    <>
      {isClient && (
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
                    Добавить социальную сеть <Grid2X2PlusIcon />
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
                    socialNetworkData[0].socialNetwork.map((item) => (
                      <SocialNetworkCard key={item._id} socialItem={item} />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
