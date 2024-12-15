'use client';

import { AdminPageHeader, Loader } from '@/shared/components/shared';
import {
  CategoriesEditAction,
  FemaleRatingSection,
  MaleRatingSection,
} from '@/shared/components/shared/rating-members';
import { useRatingMembers } from '@/shared/components/shared/rating-members/hooks';

import React from 'react';

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
      <AdminPageHeader title='Рейтинги топ-участников' description='Управление рейтингам и категориями рейтингов'>
        <CategoriesEditAction ratingMembers={ratingMembers} />
      </AdminPageHeader>

      {ratingMembersFetching ? (
        <Loader absolute />
      ) : (
        <>
          <MaleRatingSection
            ratingMembers={ratingMembers}
            ratingMenMembersTop8={ratingMenMembersTop8}
            ratingMenMembersTop3={ratingMenMembersTop3}
            duplicatePlaces={duplicatePlaces}
          />
          <FemaleRatingSection
            ratingMembers={ratingMembers}
            ratingWomenMembers={ratingWomenMembers}
            duplicatePlaces={duplicatePlaces}
          />
        </>
      )}
    </div>
  );
};
