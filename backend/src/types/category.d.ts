import { Types } from 'mongoose';

export interface CategoryFields {
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface Category extends CategoryFields {
  _id: Types.ObjectId;
}