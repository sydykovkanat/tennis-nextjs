import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { RatingMember } from '@/shared/types/rating-member.types';

import React from 'react';

import styles from './rating-member-card.module.css';

interface Props {
  ratingMember: RatingMember;
}

export const RatingMemberCard: React.FC<Props> = ({ ratingMember }) => {
  const image = `${API_URL}/${ratingMember.image}`;
  const fullName = ratingMember.name;
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className={styles.card}>
      <img src={image} alt={ratingMember.name} className={styles.cardImage} />
      <div className={styles.cardInfoWrapper}>
        <p className={styles.cardInfoNameWrapper}>
          <span className={cn(styles.cardInfoNameSpan, 'text-left')}>{firstName}</span>
          <span className={cn(styles.cardInfoNameSpan, 'text-right')}>{lastName}</span>
          {ratingMember.place === 1 && <span className={styles.cardInfoNameFirst} />}
        </p>
        <p className={styles.cardInfoPlace}>{ratingMember.place} место</p>
      </div>
    </div>
  );
};
