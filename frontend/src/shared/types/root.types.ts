export interface Base {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsQuery {
  [p: string]: string | number;
}

export interface Filters {
  query: NewsQuery | undefined;
}
