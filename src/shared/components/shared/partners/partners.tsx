import { getPartners } from '@/actions/partners';
import { PartnerCard } from '@/shared/components/shared';
import { cn } from '@/shared/lib/utils';

import React from 'react';
import Marquee from 'react-fast-marquee';

interface Props {
  className?: string;
}

export const Partners: React.FC<Props> = async ({ className }) => {
  const partners = await getPartners();

  return (
    <section className={'overflow-x-clip'}>
      <Marquee
        pauseOnHover={true}
        speed={40}
        className={cn(className)}
        style={{
          overflowX: 'unset',
        }}
        autoFill={true}
      >
        {partners.map((partner) => (
          <PartnerCard key={partner._id} partner={partner} />
        ))}
      </Marquee>
    </section>
  );
};
