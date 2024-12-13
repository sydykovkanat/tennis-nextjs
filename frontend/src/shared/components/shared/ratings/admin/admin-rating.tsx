import { NewEvent, NewRating, RatingBlock } from '@/shared/components/shared';
import { useRating } from '@/shared/components/shared/ratings/hooks/use-rating';
import { Button, Skeleton } from '@/shared/components/ui';
import { CalendarPlusIcon, Grid2X2PlusIcon } from 'lucide-react';

import React from 'react';

export const AdminRatings: React.FC = () => {
  const { maleRatings, ratings, ratingsFetching, femaleRatings, mixedRatings } = useRating();

  return (
    <>
      <header className={'flex md:items-center justify-between gap-2 flex-col md:flex-row border-b pb-1.5'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Рейтинги</h1>
          <small className={'text-muted-foreground text-base'}>Список всех рейтингов и управление рейтингами</small>
        </div>

        <div className={'flex flex-col md:flex-row items-center gap-2'}>
          <NewRating>
            <Button className={'w-full  xs:w-max'} icon={Grid2X2PlusIcon}>
              Добавить рейтинг
            </Button>
          </NewRating>
          <NewEvent ratings={ratings}>
            <Button className={'w-full xs:w-max '} icon={CalendarPlusIcon}>
              Добавить событие
            </Button>
          </NewEvent>
        </div>
      </header>

      <section>
        {ratingsFetching ? (
          <div className={'grid grid-cols-4 gap-2 mt-4'}>
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className={'h-24 flex-1'} />
            ))}
          </div>
        ) : !ratingsFetching && ratings.length === 0 ? (
          <span className={'text-muted-foreground mt-10 block text-center'}>
            Список рейтингов пуст. Пожалуйста, добавьте рейтинг.
          </span>
        ) : (
          <div className={'mt-4 space-y-10'}>
            {maleRatings.length > 0 && (
              <div>
                <h3 className={'font-bold text-center text-xl mb-3'}>Мужской рейтинг</h3>
                <RatingBlock ratings={maleRatings} />
              </div>
            )}

            {femaleRatings.length > 0 && (
              <div>
                <h3 className={'font-bold text-center text-xl mb-3'}>Женский рейтинг</h3>
                <RatingBlock ratings={femaleRatings} />
              </div>
            )}

            {mixedRatings.length > 0 && (
              <div>
                <h3 className={'font-bold text-center text-xl mb-3'}>Смешанный рейтинг</h3>
                <RatingBlock ratings={mixedRatings} />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};
