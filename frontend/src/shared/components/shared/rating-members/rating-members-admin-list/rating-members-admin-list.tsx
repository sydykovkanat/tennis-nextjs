import { WarningMessage } from '@/shared/components/shared';
import { RatingMemberAdminCard } from '@/shared/components/shared/rating-members';
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
  fewMembersWarning: boolean;
}

export const RatingMembersAdminList: React.FC<Props> = ({
  ratingMembers,
  ratingMembersAll,
  title,
  category,
  hasDuplicatePlaces,
  className,
  fewMembersWarning,
}) => {
  return (
    <section className={className}>
      <header className={styles.titlesWrapper}>
        <h3 className={styles.mainTitle}>{title} рейтинга</h3>
        <h4 className={styles.categoryTitle}>{category}</h4>
      </header>
      <div className={styles.warningMessagesContainer}>
        {hasDuplicatePlaces && (
          <WarningMessage message={`Обнаружены дублирующиеся места в ${title} рейтинга. Проверьте данные.`} />
        )}
        {fewMembersWarning && (
          <WarningMessage message={`В ${title} рейтинга недостаточно участников!`} variant='error' />
        )}
      </div>
      <div className={styles.contentContainer}>
        {ratingMembers.length > 0 ? (
          ratingMembers.map((ratingMember) => (
            <RatingMemberAdminCard
              ratingMember={ratingMember}
              ratingMembers={ratingMembersAll}
              key={ratingMember._id}
            />
          ))
        ) : (
          <small>Данные рейтинга отсутствуют</small>
        )}
      </div>
    </section>
  );
};
