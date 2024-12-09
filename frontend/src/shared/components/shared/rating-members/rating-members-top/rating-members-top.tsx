import { Title } from '@/shared/components/shared';
import { RatingMemberCard } from '@/shared/components/shared/rating-members';
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
        {title && (
          <Title className={styles.mainTitle} variant={'h3'}>
            {title} рейтинг
          </Title>
        )}
        {additionalTitle && (
          <Title className={styles.topTitle} variant={'h3'}>
            {additionalTitle}
          </Title>
        )}
        <Title className={styles.categoryTitle} variant={'h4'}>
          {category}
        </Title>
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
