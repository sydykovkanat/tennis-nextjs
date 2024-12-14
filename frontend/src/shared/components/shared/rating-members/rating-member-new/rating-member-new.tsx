import { RatingMemberForm } from '@/shared/components/shared/rating-members';
import { useRatingMemberNew } from '@/shared/components/shared/rating-members/hooks';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui';
import { cn, getGenderTitles } from '@/shared/lib';
import { RatingMember } from '@/shared/types/rating-member.types';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './rating-member-new.module.css';

interface Props {
  forWhichGender: 'male' | 'female';
  ratingMembers: RatingMember[];
  className?: string;
}

export const RatingMemberNew: React.FC<Props> = ({ forWhichGender, ratingMembers, className }) => {
  const { isCreating, open, setOpen, handleClose, onFormSubmit } = useRatingMemberNew();
  const { buttonTitle, dialogTitle } = getGenderTitles(forWhichGender);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={className}>
          <Button className={cn(styles.addButton)} icon={SquaresPlusIcon}>
            Добавить в {buttonTitle} рейтинг
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'} aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Добавить участника {dialogTitle} рейтинга</DialogTitle>
        </DialogHeader>
        <RatingMemberForm
          forWhichGender={forWhichGender}
          isLoading={isCreating}
          onClose={handleClose}
          onSubmit={onFormSubmit}
          ratingMembers={ratingMembers}
        />
      </DialogContent>
    </Dialog>
  );
};
