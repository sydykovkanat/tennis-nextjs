'use client';

import { Confirm } from '@/shared/components/shared';
import { RatingMemberForm } from '@/shared/components/shared/rating-members';
import { useRatingMemberDelete } from '@/shared/components/shared/rating-members/hooks';
import { Button, Card } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { RatingMember } from '@/shared/types/rating-member.types';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';

import React, { useState } from 'react';

import styles from './rating-member-admin-card.module.css';

interface Props {
  ratingMember: RatingMember;
  ratingMembers: RatingMember[];
}

export const RatingMemberAdminCard: React.FC<Props> = ({ ratingMember, ratingMembers }) => {
  const image = `${API_URL}/${ratingMember.image}`;
  const { handleDelete, isDeleting } = useRatingMemberDelete();
  const [open, setOpen] = useState(false);

  return (
    <Card className={cn(styles.card, 'dark:bg-[#1F2937]')} data-testid={`${ratingMember.name}`}>
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
        <h5 className={styles.place}>№ {ratingMember.place}</h5>
        <h5 className={styles.name}>{ratingMember.name}</h5>
        <div className={styles.actionsWrapper}>
          <Confirm onOk={() => handleDelete(ratingMember._id)}>
            <Button size='sm' disabled={isDeleting === ratingMember._id} data-testid='delete' icon={Trash} />
          </Confirm>
          <Button size='sm' data-testid='edit' icon={Pencil} onClick={() => setOpen(true)} />
          {open && (
            <RatingMemberForm
              open={open}
              setOpen={setOpen}
              ratingMembers={ratingMembers}
              id={ratingMember._id}
              existingMember={ratingMember}
              forWhichGender={ratingMember.gender === 'female' ? 'female' : 'male'}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
