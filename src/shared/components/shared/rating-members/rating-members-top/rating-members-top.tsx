import { RatingMemberCard, Title } from '@/shared/components/shared';
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
  let content: React.ReactNode = <p className={styles.noContentText}>Данные рейтинга отсутствуют</p>;
  const additionalTitle =
    ratingType === 'top3' && subtitle ? `Топ-3 ${subtitle}` : ratingType === 'top8' ? 'Топ-8 участников' : '';

  if (ratingMembers.length > 0) {
    content = ratingMembers.map((ratingMember) => (
      <RatingMemberCard key={ratingMember._id} ratingMember={ratingMember} />
    ));
  }

  return (
    <div className={className}>
      <div className={styles.titleWrapper}>
        {title && (
          <Title className={styles.mainTitle} variant={'h1'}>
            {title} рейтинг
          </Title>
        )}
        {additionalTitle && (
          <Title className={styles.topTitle} variant={'h1'}>
            {additionalTitle}
          </Title>
        )}
        <Title className={styles.categoryTitle} variant={'h1'}>
          {category}
        </Title>
      </div>
      <div className={styles.contentWrapper}>{content}</div>
    </div>
  );
};
