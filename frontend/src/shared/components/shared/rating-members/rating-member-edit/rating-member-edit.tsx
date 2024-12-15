import { RatingMemberForm } from '@/shared/components/shared/rating-members';
import { useRatingMemberEdit } from '@/shared/components/shared/rating-members/hooks';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui';
import { getGenderTitles } from '@/shared/lib';
import { RatingMember } from '@/shared/types/rating-member.types';

import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  forWhichGender: 'male' | 'female';
  id: string;
  existingMember: RatingMember;
  ratingMembers: RatingMember[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const RatingMemberEdit: React.FC<Props> = ({
  forWhichGender,
  id,
  existingMember,
  ratingMembers,
  children,
  open,
  setOpen,
}) => {
  const { isEditing, handleClose, onFormSubmit } = useRatingMemberEdit(id);
  const { dialogTitle } = getGenderTitles(forWhichGender);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='dark:bg-[#1F2937]' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать участника {dialogTitle} рейтинга</DialogTitle>
        </DialogHeader>
        <RatingMemberForm
          forWhichGender={forWhichGender}
          isLoading={isEditing}
          onClose={handleClose}
          onSubmit={onFormSubmit}
          existingMember={existingMember}
          ratingMembers={ratingMembers}
        />
      </DialogContent>
    </Dialog>
  );
};
