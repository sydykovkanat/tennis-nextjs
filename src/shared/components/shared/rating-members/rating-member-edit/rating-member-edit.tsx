import { RatingMemberForm } from '@/shared/components/shared';
import { useRatingMemberEdit } from '@/shared/components/shared/rating-members/hooks';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui';
import { getGenderTitles } from '@/shared/lib';
import { RatingMember } from '@/shared/types/rating-member.types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import React from 'react';

interface Props {
  forWhichGender: 'male' | 'female';
  id: string;
  existingMember: RatingMember;
  ratingMembers: RatingMember[];
}

export const RatingMemberEdit: React.FC<Props> = ({ forWhichGender, id, existingMember, ratingMembers }) => {
  const { isEditing, open, setOpen, handleClose, onFormSubmit } = useRatingMemberEdit(id);
  const { dialogTitle } = getGenderTitles(forWhichGender);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' data-testid='edit'>
          <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
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
