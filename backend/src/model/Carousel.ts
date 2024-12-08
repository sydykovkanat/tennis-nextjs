import mongoose from 'mongoose';
import { CarouselFields } from '../types/carousel';

const Schema = mongoose.Schema;

const CarouselSchema = new Schema<CarouselFields>(
  {
    image: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Carousel = mongoose.model('Carousel', CarouselSchema);
