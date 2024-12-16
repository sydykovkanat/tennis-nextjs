'use client';

import { PartnersProvider, usePartners } from '@/shared/components/admin/partners/partners-context';
import { AdminPageHeader, Loader } from '@/shared/components/shared';
import { AdminPartnerCard } from '@/shared/components/shared/partners/admin-partner-card';
import { AdminPartnerCreate } from '@/shared/components/shared/partners/admin-partner-create';
import { Button } from '@/shared/components/ui';
import { Grid2X2PlusIcon } from 'lucide-react';

import React, { useEffect } from 'react';

const PartnersPageContent: React.FC = () => {
  const { getPartners, partners, partnersFetching } = usePartners();

  useEffect(() => {
    void getPartners();
  }, [getPartners]);

  return (
    <div>
      {partnersFetching ? (
        <Loader absolute />
      ) : partners.length === 0 ? (
        <h3 className='text-center mt-10'>
          Партнеры не найдены
          <br />
          Попробуйте обновить страницу
        </h3>
      ) : (
        <>
          <AdminPageHeader title={'Партнеры'} description={'Список всех партнеров и управление партнерами'}>
            <AdminPartnerCreate>
              <Button icon={Grid2X2PlusIcon}>
                Добавить партнера
              </Button>
            </AdminPartnerCreate>
          </AdminPageHeader>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
            {partners.map((partner) => (
              <AdminPartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const Partners = () => {
  return (
    <PartnersProvider>
      <PartnersPageContent />
    </PartnersProvider>
  );
};
