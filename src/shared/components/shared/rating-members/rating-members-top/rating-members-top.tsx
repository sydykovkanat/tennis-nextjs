import { RatingMemberCard } from '@/shared/components/shared/rating-members/rating-member-card/rating-member-card';
import { RatingMember } from '@/shared/types/rating-member.types';

import React from 'react';

import styles from './rating-member-top.module.css';

interface Props {
  ratingMembers: RatingMember[];
  title?: string;
  subtitle?: string;
  category: string;
  ratingType: 'top3' | 'top8';
}

export const RatingMembers: React.FC<Props> = ({ ratingMembers, title, subtitle, category, ratingType }) => {
  let content: React.ReactNode = <p className={styles.noContentText}>Данные рейтинга отсутствуют</p>;

  if (ratingMembers.length > 0) {
    content = ratingMembers.map((ratingMember) => (
      <RatingMemberCard key={ratingMember._id} ratingMember={ratingMember} />
    ));
  }

  return (
    <>
      <div className={styles.titleWrapper}>
        {title && <h1 className={styles.mainTitle}>{title} рейтинг</h1>}
        {ratingType === 'top3' && subtitle && <h1 className={styles.topTitle}>Топ-3 {subtitle}</h1>}
        {ratingType === 'top8' && <h1 className={styles.topTitle}>Топ-8 участников</h1>}
        <h1 className={styles.categoryTitle}>{category}</h1>
      </div>
      <div className={styles.contentWrapper}>{content}</div>
    </>
  );
};
