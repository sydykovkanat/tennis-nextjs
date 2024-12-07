import { RatingMemberAdminCard, Title, WarningMessage } from '@/shared/components/shared';
import { RatingMember } from '@/shared/types/rating-member.types';

import React from 'react';

import styles from './rating-members-admin-list.module.css';

interface Props {
  ratingMembers: RatingMember[];
  ratingMembersAll: RatingMember[];
  title: string;
  category: string;
  hasDuplicatePlaces: boolean;
  className?: string;
}

export const RatingMembersAdminList: React.FC<Props> = ({
  ratingMembers,
  ratingMembersAll,
  title,
  category,
  hasDuplicatePlaces,
  className,
}) => {
  let content: React.ReactNode = <small className={styles.noContentText}>Данные рейтинга отсутствуют</small>;

  if (ratingMembers.length > 0) {
    content = ratingMembers.map((ratingMember) => (
      <RatingMemberAdminCard key={ratingMember._id} ratingMember={ratingMember} ratingMembers={ratingMembersAll} />
    ));
  }

  return (
    <div className={className}>
      <div className={styles.titlesWrapper}>
        <Title variant='h1' className={styles.mainTitle}>
          {title} рейтинга
        </Title>
        <Title variant='h1' className={styles.categoryTitle}>
          {category}
        </Title>
      </div>
      {hasDuplicatePlaces && (
        <WarningMessage
          message={`Обнаружены дублирующиеся места в ${title} рейтинга. Проверьте данные.`}
          className='mt-2'
        />
      )}
      <div className={styles.contentContainer}>{content}</div>
    </div>
  );
};
