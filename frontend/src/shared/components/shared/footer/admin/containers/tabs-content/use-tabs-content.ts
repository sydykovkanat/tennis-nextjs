import { useAppSelector } from '@/shared/hooks/hooks';
import { selectItemsData, selectItemsFetching } from '@/shared/lib/features/footer/footers-slice';

import { useState } from 'react';

export const useTabsContent = () => {
  const [isClient, setIsClient] = useState(false);

  const mainPartnerData = useAppSelector(selectItemsData);
  const mainPartnerFetching = useAppSelector(selectItemsFetching);
  const menuPositionData = useAppSelector(selectItemsData);
  const menuPositionFetching = useAppSelector(selectItemsFetching);
  const publicOfferData = useAppSelector(selectItemsData);
  const publicOfferFetching = useAppSelector(selectItemsFetching);
  const socialNetworkData = useAppSelector(selectItemsData);
  const socialNetworkFetching = useAppSelector(selectItemsFetching);

  return {
    mainPartnerData,
    mainPartnerFetching,
    menuPositionData,
    menuPositionFetching,
    publicOfferData,
    publicOfferFetching,
    isClient,
    setIsClient,
    socialNetworkData,
    socialNetworkFetching,
  };
};
