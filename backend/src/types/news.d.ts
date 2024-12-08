export interface NewsFields {
  title: string;
  subtitle?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  newsCover?: string;
  images?: string[];
}
