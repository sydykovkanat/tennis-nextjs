import { axiosApi } from '@/shared/lib';
import { FooterElementsData } from '@/shared/types/footer.types';

export const getFooterItems = async () => {
  const { data: footerItemsData } = await axiosApi.get<FooterElementsData[]>('/footers');
  return footerItemsData;
};
