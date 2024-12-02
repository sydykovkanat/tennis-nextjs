import { getPartners } from '@/actions/partners';
import { PartnerCard, Title } from '@/shared/components/shared';
import { cn } from '@/shared/lib/utils';

import React from 'react';
import Marquee from 'react-fast-marquee';

import styles from './partners.module.css';

interface Props {
  className?: string;
}

export const Partners: React.FC<Props> = async ({ className }) => {
  const partners = await getPartners();

  return (
    <>
      <Title variant={'h1'} className={cn(styles.mainTitle)}>
        Наши Партнеры
      </Title>
      <section className={styles.container}>
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
    </>
  );
};
