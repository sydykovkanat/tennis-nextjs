import { Base } from '@/shared/types/root.types';

export interface Reward extends Base {
  user: string;
  tournament: string;
  place?: number;
  nomination?: string;
  icon: string;
}

export interface RewardResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: Reward[];
}

export interface RewardMutation {
  user: string;
  tournament: string;
  place: number | undefined;
  nomination: string;
  icon: string;
}
