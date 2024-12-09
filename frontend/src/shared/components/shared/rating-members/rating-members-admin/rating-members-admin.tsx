'use client';

import { Loader, Title } from '@/shared/components/shared';
import {
  CategoriesEditAction,
  RatingMemberNew,
  RatingMembersAdminList,
} from '@/shared/components/shared/rating-members';
import { useRatingMembers } from '@/shared/components/shared/rating-members/hooks';
import { cn } from '@/shared/lib';

import styles from './rating-member-admin.module.css';

export const RatingMembersAdmin = () => {
  const {
    ratingMembers,
    ratingMembersFetching,
    ratingMenMembersTop8,
    ratingMenMembersTop3,
    ratingWomenMembers,
    duplicatePlaces,
  } = useRatingMembers();

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <div>
          <Title variant='h1' className={styles.adminTitle}>
            Рейтинги топ-участников
          </Title>
          <small className={styles.adminSubtitle}>Управление рейтингам и категориями рейтингов</small>
        </div>
        <CategoriesEditAction ratingMembers={ratingMembers} />
      </div>
      {ratingMembersFetching ? (
        <Loader absolute />
      ) : (
        <>
          <RatingMemberNew forWhichGender={'male'} ratingMembers={ratingMembers} className={styles.addButton} />
          <RatingMembersAdminList
            ratingMembers={ratingMenMembersTop8}
            ratingMembersAll={ratingMembers}
            title='Топ-8 мужского'
            category={ratingMembers[0]?.mensRatingCategoryTop8 || 'Здесь будет категория'}
            hasDuplicatePlaces={duplicatePlaces.mensTop8}
            className={styles.adminList}
          />
          <RatingMembersAdminList
            ratingMembers={ratingMenMembersTop3}
            ratingMembersAll={ratingMembers}
            title='Топ-3 мужского'
            category={ratingMembers[0]?.mensRatingCategoryTop3 || 'Здесь будет категория'}
            hasDuplicatePlaces={duplicatePlaces.mensTop3}
          />
          <RatingMemberNew
            forWhichGender={'female'}
            ratingMembers={ratingMembers}
            className={cn(styles.addButton, 'mt-14')}
          />
          <RatingMembersAdminList
            ratingMembers={ratingWomenMembers}
            ratingMembersAll={ratingMembers}
            title='Топ-3 женского'
            category={ratingMembers[0]?.womensRatingCategoryTop3 || 'Здесь будет категория'}
            hasDuplicatePlaces={duplicatePlaces.womensTop3}
          />
        </>
      )}
    </div>
  );
};
