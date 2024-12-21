import { Base } from '@/shared/types/root.types';

export interface Reward extends Base {
  user: string;
  tournament: string;
  place: number;
  nomination?: string;
  icon?: string;
}
