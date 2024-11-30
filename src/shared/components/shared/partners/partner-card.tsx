import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { Partner } from '@/shared/types/partner.types';
import Image from 'next/image';

import React from 'react';

import styles from './partner-card.module.css';

interface Props {
  className?: string;
  partner: Partner;
}

export const PartnerCard: React.FC<Props> = ({ className, partner }) => {
  return (
    <a href={partner.url} className={cn(styles.card, className)}>
      <Image width={120} height={100} src={`${API_URL}/${partner.image}`} alt={partner.name} />
      <span className={'sr-only'}>{partner.name} partner logo</span>
    </a>
  );
};
