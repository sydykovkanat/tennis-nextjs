import { Types } from 'mongoose';

export interface CategoryFields {
  name: string;
}

export interface Category extends CategoryFields {
  _id: Types.ObjectId;
}