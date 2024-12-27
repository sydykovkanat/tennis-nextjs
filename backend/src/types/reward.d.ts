import { Schema, Types } from 'mongoose';

export interface RewardFields {
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  tournament: string;
  place: number;
  nomination?: string;
  icon: 'cup' | 'medal' | 'racket';
}

export interface Reward extends RewardFields {
  _id: Types.ObjectId
}