import { Base } from '@/shared/types/root.types';

export interface News extends Base {
  title: string;
  subtitle: string;
  content: string;
  newsCover: string;
  images: string[];
}

export interface NewsMutation {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  newsCover: string | File;
  images: string[] | File[];
}

export interface NewsResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: News[];
}
