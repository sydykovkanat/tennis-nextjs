import { usePartners } from '@/app/(root)/admin/partners/partners-context';
import { AdminPartnerEdit, Confirm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { Partner } from '@/shared/types/partner.types';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';

import React from 'react';

import styles from './admin-partner-card.module.css';

interface Props {
  className?: string;
  partner: Partner;
}

export const AdminPartnerCard: React.FC<Props> = ({ className, partner }) => {
  const { partnersDeleting, handleDelete } = usePartners();

  return (
    <Card className={cn(styles.card, className)}>
      <div className={styles.cardInner}>
        <div className={styles.cardBlock}>
          <Image src={`${API_URL}/${partner.image}`} alt={`${partner.name} logo`} width={70} height={70} />
          <h3>{partner.name}</h3>
        </div>

        <div className={styles.cardBlock}>
          <AdminPartnerEdit id={partner._id}>
            <Button size='icon' icon={Pencil} />
          </AdminPartnerEdit>
          <Confirm onOk={() => handleDelete(partner._id)}>
            <Button size='icon' icon={Trash} loading={partnersDeleting === partner._id} />
          </Confirm>
        </div>
      </div>
    </Card>
  );
};
