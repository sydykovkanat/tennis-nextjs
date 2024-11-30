export interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  newsCover: string;
  updatedAt: string;
  createdAt: string;
}

export interface Blogs {
  data: Blog[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
