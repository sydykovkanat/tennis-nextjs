export interface Base {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Query {
  [p: string]: string | number;
}

export interface Filters {
  query: Query | undefined;
}
