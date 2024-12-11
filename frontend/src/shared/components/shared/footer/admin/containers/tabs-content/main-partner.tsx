'use client';

import { Loader, MainPartnerCard, MainPartnerEditForm } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { selectItemsData, selectItemsFetching } from '@/shared/lib/features/footer/footers-slice';
import { EditIcon } from 'lucide-react';

import styles from './tab-content.module.css';

export const MainPartner = () => {
  const mainPartnerData = useAppSelector(selectItemsData);
  const mainPartnerFetching = useAppSelector(selectItemsFetching);

  return (
    <div className={styles.mainPartnerContainer}>
      {mainPartnerFetching ? (
        <div className={styles.mainPartnerLoader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.mainPartnerEditButtonContainer}>
            <MainPartnerEditForm>
              <Button disabled={mainPartnerData.length === 0} className={styles.mainPartnerEditButton}>
                Изменить ген.партнера <EditIcon />
              </Button>
            </MainPartnerEditForm>
          </div>

          {(!mainPartnerFetching && mainPartnerData.length === 0) ||
          (mainPartnerData.length > 0 && mainPartnerData[0].mainPartnerImage === '') ? (
            <small className={styles.mainPartnerNoImageMessage}>Изображение ген.партнера не найдено.</small>
          ) : (
            <div className={styles.mainPartnerCardContainer}>
              {mainPartnerData.length > 0 && <MainPartnerCard image={mainPartnerData[0].mainPartnerImage} />}
            </div>
          )}
        </>
      )}
    </div>
  );
};
