import { Confirm, Title } from '@/shared/components/shared';
import { RatingMemberEdit } from '@/shared/components/shared/rating-members';
import { useRatingMemberDelete } from '@/shared/components/shared/rating-members/hooks';
import { Button, Card } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { RatingMember } from '@/shared/types/rating-member.types';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import React from 'react';

import styles from './rating-member-admin-card.module.css';

interface Props {
  ratingMember: RatingMember;
  ratingMembers: RatingMember[];
}

export const RatingMemberAdminCard: React.FC<Props> = ({ ratingMember, ratingMembers }) => {
  const image = `${API_URL}/${ratingMember.image}`;
  const { handleDelete, isDeleting } = useRatingMemberDelete();

  return (
    <Card className={styles.card} data-testid={`${ratingMember.name}`}>
      <div className={styles.cardInner}>
        <Image
          src={image}
          alt={ratingMember.name}
          width={50}
          height={50}
          style={{ objectFit: 'cover' }}
          quality={100}
          className={styles.cardImage}
        />
        <Title variant='h5' className={styles.place}>
          № {ratingMember.place}
        </Title>
        <Title variant='h5' className={styles.name}>
          {ratingMember.name}
        </Title>
        <div className={styles.actionsWrapper}>
          <Confirm onOk={() => handleDelete(ratingMember._id)}>
            <Button size='sm' disabled={isDeleting === ratingMember._id} data-testid='delete' icon={TrashIcon} />
          </Confirm>
          <RatingMemberEdit
            ratingMembers={ratingMembers}
            id={ratingMember._id}
            existingMember={ratingMember}
            forWhichGender={ratingMember.gender === 'female' ? 'female' : 'male'}
          />
        </div>
      </div>
    </Card>
  );
};