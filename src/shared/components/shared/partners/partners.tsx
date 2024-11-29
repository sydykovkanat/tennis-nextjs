import { getPartners } from '@/actions/partners';
import { PartnerCard } from '@/shared/components/shared/partners/partner-card';
import { cn } from '@/shared/lib/utils';

import React from 'react';
import Marquee from 'react-fast-marquee';

interface Props {
  className?: string;
}

export const Partners: React.FC<Props> = async ({ className }) => {
  const partners = await getPartners();

  return (
    <Marquee
      className={cn(className)}
      style={{
        overflowX: 'unset',
      }}
    >
      {partners.map((partner) => (
        <PartnerCard key={partner._id} partner={partner} />
      ))}
    </Marquee>
  );
};
