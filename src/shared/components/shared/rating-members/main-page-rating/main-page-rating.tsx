import { getRatingMembers } from '@/actions/rating-members';
import { RatingMembersTop } from '@/shared/components/shared';
import { cn } from '@/shared/lib/utils';

import React from 'react';

import styles from './main-page-rating.module.css';

interface Props {
  className?: string;
}

export const MainPageRating: React.FC<Props> = async ({ className }) => {
  const ratingMembers = await getRatingMembers();
  const ratingMenMembersTop8 = ratingMembers.filter(
    (ratingMember) => ratingMember.gender === 'male' && ratingMember.ratingType === 'mensTop8',
  );
  const ratingMenMembersTop3 = ratingMembers.filter(
    (ratingMember) => ratingMember.gender === 'male' && ratingMember.ratingType === 'mensTop3',
  );
  const ratingWomenMembers = ratingMembers.filter((ratingMember) => ratingMember.gender === 'female');

  return (
    <div className={cn(className)}>
      <div className={styles.manTop8}>
        <RatingMembersTop
          ratingMembers={ratingMenMembersTop8}
          category={ratingMembers[0]?.mensRatingCategoryTop8 || 'Мужская категория'}
          title='Мужской'
          ratingType='top8'
        />
      </div>
      <div className={styles.manTop3}>
        <RatingMembersTop
          ratingMembers={ratingMenMembersTop3}
          category={ratingMembers[0]?.mensRatingCategoryTop3 || 'Мужская категория'}
          subtitle='участника'
          ratingType='top3'
        />
      </div>
      <div>
        <RatingMembersTop
          ratingMembers={ratingWomenMembers}
          category={ratingMembers[0]?.womensRatingCategoryTop3 || 'Женская категория'}
          title='Женский'
          subtitle='участницы'
          ratingType='top3'
        />
      </div>
    </div>
  );
};
