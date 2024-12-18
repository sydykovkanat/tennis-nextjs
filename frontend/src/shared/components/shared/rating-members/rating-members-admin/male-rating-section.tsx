'use client';

import { RatingMemberForm, RatingMembersAdminList } from '@/shared/components/shared/rating-members';
import { Button } from '@/shared/components/ui';
import { RatingMember } from '@/shared/types/rating-member.types';
import { Grid2X2PlusIcon } from 'lucide-react';

import React, { useState } from 'react';

import styles from './rating-member-admin.module.css';

interface Props {
  ratingMembers: RatingMember[];
  ratingMenMembersTop8: RatingMember[];
  ratingMenMembersTop3: RatingMember[];
  duplicatePlaces: { mensTop8: boolean; mensTop3: boolean; womensTop3: boolean };
}
export const MaleRatingSection: React.FC<Props> = ({
  ratingMembers,
  ratingMenMembersTop8,
  ratingMenMembersTop3,
  duplicatePlaces,
}) => {
  const [openMaleForm, setOpenMaleForm] = useState(false);
  return (
    <div>
      <div className={styles.buttonContainer}>
        <Button className={styles.addButton} icon={Grid2X2PlusIcon} onClick={() => setOpenMaleForm(true)}>
          Добавить в мужской рейтинг
        </Button>
      </div>

      {openMaleForm && (
        <RatingMemberForm
          ratingMembers={ratingMembers}
          open={openMaleForm}
          setOpen={setOpenMaleForm}
          forWhichGender='male'
        />
      )}

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
    </div>
  );
};
