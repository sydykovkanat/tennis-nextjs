import { NewEvent, NewRating, RatingBlock } from '@/shared/components/shared';
import { useRating } from '@/shared/components/shared/ratings/hooks/use-rating';
import { Button, Skeleton } from '@/shared/components/ui';
import { CalendarPlusIcon, Grid2X2PlusIcon } from 'lucide-react';

import React from 'react';

import styles from './admin-rating.module.css';

export const AdminRatings: React.FC = () => {
  const { maleRatings, ratings, ratingsFetching, femaleRatings, mixedRatings } = useRating();

  return (
    <>
      <header className={styles.adminRatingHeader}>
        <div>
          <h2 className={'text-2xl font-medium leading-none'}>Рейтинги</h2>
          <small className={styles.adminRatingSubTitle}>Список всех рейтингов и управление рейтингами</small>
        </div>

        <div className={styles.adminRatingButtonsContainer}>
          <NewRating>
            <Button className={styles.adminRatingButton} icon={Grid2X2PlusIcon}>
              Добавить рейтинг
            </Button>
          </NewRating>
          <NewEvent ratings={ratings}>
            <Button className={styles.adminRatingButton} icon={CalendarPlusIcon}>
              Добавить событие
            </Button>
          </NewEvent>
        </div>
      </header>

      <section>
        {ratingsFetching ? (
          <div className={styles.ratingSkeletonContainer}>
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className={styles.ratingSkeleton} />
            ))}
          </div>
        ) : !ratingsFetching && ratings.length === 0 ? (
          <span className={styles.noRatingText}>Список рейтингов пуст. Пожалуйста, добавьте рейтинг.</span>
        ) : (
          <div className={styles.adminRatingsContainer}>
            {maleRatings.length > 0 && (
              <div>
                <h3 className={styles.adminRatingTitle}>Мужской рейтинг</h3>
                <RatingBlock ratings={maleRatings} />
              </div>
            )}

            {femaleRatings.length > 0 && (
              <div>
                <h3 className={styles.adminRatingTitle}>Женский рейтинг</h3>
                <RatingBlock ratings={femaleRatings} />
              </div>
            )}

            {mixedRatings.length > 0 && (
              <div>
                <h3 className={styles.adminRatingTitle}>Смешанный рейтинг</h3>
                <RatingBlock ratings={mixedRatings} />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};
