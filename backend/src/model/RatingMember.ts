import mongoose from 'mongoose';
import { RatingMemberFields } from '../types/rating';

const Schema = mongoose.Schema;

const RatingMemberSchema = new Schema<RatingMemberFields>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    place: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    ratingType: {
      type: String,
      required: true,
      enum: ['mensTop8', 'mensTop3', 'womensTop3'],
    },
    mensRatingCategoryTop8: {
      type: String,
      default: 'Здесь будет категория для мужского топ-8',
    },
    mensRatingCategoryTop3: {
      type: String,
      default: 'Здесь будет категория для мужского топ-3',
    },
    womensRatingCategoryTop3: {
      type: String,
      default: 'Здесь будет категория для женского топ-3',
    },
  },
  { timestamps: true }
);

export const RatingMember = mongoose.model('RatingMember', RatingMemberSchema);
