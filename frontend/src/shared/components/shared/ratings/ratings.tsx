import { RatingCard } from '@/shared/components/shared';
import { cn } from '@/shared/lib';
import { Rating } from '@/shared/types/rating.types';

import React from 'react';

import styles from './ratings.module.css';

interface Props {
  className?: string;
  ratings: Rating[];
}

export const Ratings: React.FC<Props> = ({ className, ratings }) => {
  return (
    <div className={cn(styles.container, className)}>
      {ratings.map((item) => (
        <div className={styles.ratings} key={item._id}>
          <RatingCard rating={item} />
        </div>
      ))}
    </div>
  );
};
