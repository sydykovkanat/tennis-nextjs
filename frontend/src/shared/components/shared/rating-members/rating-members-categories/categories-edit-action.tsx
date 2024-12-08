import { RatingMembersCategoriesEdit } from '@/shared/components/shared/rating-members';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { RatingMember } from '@/shared/types/rating-member.types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import React from 'react';

interface Props {
  ratingMembers: RatingMember[];
}

export const CategoriesEditAction: React.FC<Props> = ({ ratingMembers }) => {
  if (ratingMembers.length > 0) {
    return (
      <RatingMembersCategoriesEdit
        existingMensCategoryTop8={ratingMembers[0]?.mensRatingCategoryTop8 || ''}
        existingMensCategoryTop3={ratingMembers[0]?.mensRatingCategoryTop3 || ''}
        existingWomensCategoryTop3={ratingMembers[0]?.womensRatingCategoryTop3 || ''}
      />
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button icon={PencilSquareIcon}>Изменить категории</Button>
      </PopoverTrigger>
      <PopoverContent>
        <small>Для редактирования добавьте хотя бы одного участника рейтинга</small>
      </PopoverContent>
    </Popover>
  );
};
