'use client';

import { PartnersProvider, usePartners } from '@/app/(root)/admin/partners/partners-context';
import { AdminPageHeader, Loader } from '@/shared/components/shared';
import { AdminPartnerCard } from '@/shared/components/shared/partners/admin-partner-card';
import { AdminPartnerCreate } from '@/shared/components/shared/partners/admin-partner-create';
import { Button } from '@/shared/components/ui';
import { Plus } from 'lucide-react';

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
              <Button size={'sm'} icon={Plus}>
                Добавить партнера
              </Button>
            </AdminPartnerCreate>
          </AdminPageHeader>
          <div className='flex items-center gap-3 flex-wrap'>
            {partners.map((partner) => (
              <AdminPartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function Page() {
  return (
    <PartnersProvider>
      <PartnersPageContent />
    </PartnersProvider>
  );
}
