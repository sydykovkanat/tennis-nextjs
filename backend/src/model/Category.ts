import mongoose, { type HydratedDocument } from 'mongoose';
import { CategoryFields } from '../types/category';

const Schema = mongoose.Schema;

const CategorySchema = new Schema<CategoryFields>(
  {
    name: {
      type: String,
      required: true,
      unique: true,

      validate: {
        validator: async function (value: string): Promise<boolean> {
          if (!(this as HydratedDocument<CategoryFields>).isModified('name')) {
            return true;
          }

          const rank = await Category.findOne({ name: value });
          return !rank;
        },
        message: 'A category with this name already exists',
      },
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', CategorySchema);
