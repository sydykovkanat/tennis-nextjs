import { Rating } from '@/shared/types/rating.types';

export interface Event {
  _id: string;
  category: string;
  rank: string;
  gender: 'male' | 'female';
  link: string;
  rating: Rating;
}

export interface EventMutation {
  rating: string;
  category: string;
  rank: string;
  link: string;
}
