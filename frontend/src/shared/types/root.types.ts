export interface Base {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Filters {
  query: { [p: string]: string | number } | undefined;
}
