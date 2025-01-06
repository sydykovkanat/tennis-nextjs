'use client';

import { RatingMemberForm, RatingMembersAdminList } from '@/shared/components/shared/rating-members';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { RatingMember } from '@/shared/types/rating-member.types';
import { Grid2X2PlusIcon } from 'lucide-react';

import React, { useState } from 'react';

import styles from './rating-member-admin.module.css';

interface Props {
  ratingMembers: RatingMember[];
  ratingWomenMembers: RatingMember[];
  duplicatePlaces: { mensTop8: boolean; mensTop3: boolean; womensTop3: boolean };
  fewMembersWarning: { mensTop8: boolean; mensTop3: boolean; womensTop3: boolean };
}

export const FemaleRatingSection: React.FC<Props> = ({
  ratingMembers,
  ratingWomenMembers,
  duplicatePlaces,
  fewMembersWarning,
}) => {
  const [openFemaleForm, setOpenFemaleForm] = useState(false);

  return (
    <div>
      <div className={styles.buttonContainer}>
        <Button
          className={cn(styles.addButton, 'mt-14')}
          icon={Grid2X2PlusIcon}
          onClick={() => setOpenFemaleForm(true)}
        >
          Добавить в женский рейтинг
        </Button>
      </div>

      {openFemaleForm && (
        <RatingMemberForm
          ratingMembers={ratingMembers}
          open={openFemaleForm}
          setOpen={setOpenFemaleForm}
          forWhichGender='female'
        />
      )}

      <RatingMembersAdminList
        ratingMembers={ratingWomenMembers}
        ratingMembersAll={ratingMembers}
        title='Топ-3 женского'
        category={ratingMembers[0]?.womensRatingCategoryTop3 || 'Здесь будет категория'}
        hasDuplicatePlaces={duplicatePlaces.womensTop3}
        fewMembersWarning={fewMembersWarning.womensTop3}
      />
    </div>
  );
};
