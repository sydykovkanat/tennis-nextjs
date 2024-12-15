import { RatingMemberCard } from '@/shared/components/shared/rating-members';
import { cn } from '@/shared/lib';
import { RatingMember } from '@/shared/types/rating-member.types';

import React from 'react';

import styles from './rating-member-top.module.css';

interface Props {
  ratingMembers: RatingMember[];
  title?: string;
  subtitle?: string;
  category: string;
  ratingType: 'top3' | 'top8';
  className?: string;
}

export const RatingMembersTop: React.FC<Props> = ({
  ratingMembers,
  title,
  subtitle,
  category,
  ratingType,
  className,
}) => {
  const additionalTitle =
    ratingType === 'top3' && subtitle ? `Топ-3 ${subtitle}` : ratingType === 'top8' ? 'Топ-8 участников' : '';

  return (
    <section className={className}>
      <div className={styles.titleWrapper}>
        {title && <h3 className={styles.mainTitle}>{title} рейтинг</h3>}
        {additionalTitle && <h4 className={cn(styles.topTitle, 'dark:text-white')}>{additionalTitle}</h4>}
        <h5 className={styles.categoryTitle}>{category}</h5>
      </div>
      <div className={styles.contentWrapper}>
        {ratingMembers.length > 0 ? (
          ratingMembers.map((ratingMember) => <RatingMemberCard key={ratingMember._id} ratingMember={ratingMember} />)
        ) : (
          <p className={styles.noContentText}>Данные рейтинга отсутствуют</p>
        )}
      </div>
    </section>
  );
};
