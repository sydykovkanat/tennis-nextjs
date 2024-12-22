import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib/helpers/utils';
import { RatingMember } from '@/shared/types/rating-member.types';
import Image from 'next/image';

import React from 'react';

import styles from './rating-member-card.module.css';

interface Props {
  ratingMember: RatingMember;
}

export const RatingMemberCard: React.FC<Props> = ({ ratingMember }) => {
  const image = `${API_URL}/${ratingMember.image}`;
  const nameParts = ratingMember.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={ratingMember.name}
        className={styles.cardImage}
        width={192}
        height={192}
        style={{ objectFit: 'cover' }}
        quality={100}
        loading={'lazy'}
      />
      <div className={styles.cardInfoWrapper}>
        <p className={styles.cardInfoNameWrapper}>
          <span className={cn(styles.cardInfoNameSpan, 'text-left')}>{firstName}</span>
          <span className={cn(styles.cardInfoNameSpan, 'text-right')}>{lastName}</span>
          {ratingMember.place === 1 && <span className={styles.cardInfoNameFirst} />}
        </p>
        <p className={cn(styles.cardInfoPlace, 'dark:text-white')}>{ratingMember.place} место</p>
      </div>
    </div>
  );
};
