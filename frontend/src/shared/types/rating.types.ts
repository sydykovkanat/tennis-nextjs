import { Event } from './event.types';

export interface Rating {
  _id: string;
  chapter: 'male' | 'female' | 'mixed';
  year: number;
  events: Event[];
}

export interface RatingMutation {
  year: string;
  chapter: string;
}
