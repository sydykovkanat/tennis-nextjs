import { Category } from '@/shared/types/category.types';
import { Rating } from '@/shared/types/rating.types';

export interface Event {
  _id: string;
  category: Category;
  gender: 'male' | 'female';
  link: string;
  rating: Rating;
}

export interface EventMutation {
  rating: string;
  category: string;
  link: string;
}
