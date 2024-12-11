'use client';

import { Loader, PublicOfferCard, PublicOfferEditForm } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { selectItemsData, selectItemsFetching } from '@/shared/lib/features/footer/footers-slice';
import { EditIcon } from 'lucide-react';

import styles from './tab-content.module.css';

export const PublicOffer = () => {
  const publicOfferData = useAppSelector(selectItemsData);
  const publicOfferFetching = useAppSelector(selectItemsFetching);

  return (
    <div className={styles.publicOfferContainer}>
      {publicOfferFetching ? (
        <div className={styles.publicOfferLoader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.publicOfferEditFormContainer}>
            <PublicOfferEditForm>
              <Button disabled={publicOfferData.length === 0} className={styles.publicOfferButton}>
                Изменить публичную оферту <EditIcon />
              </Button>
            </PublicOfferEditForm>
          </div>

          {(!publicOfferFetching && publicOfferData.length === 0) ||
          (publicOfferData.length > 0 && publicOfferData[0].publicOffer === '') ? (
            <small className={styles.publicOfferNoDataMessage}>Публичная оферта не найдена.</small>
          ) : (
            <div className={styles.publicOfferCardContainer}>
              {publicOfferData.length > 0 && <PublicOfferCard publicOfferText={publicOfferData[0]?.publicOffer} />}
            </div>
          )}
        </>
      )}
    </div>
  );
};
