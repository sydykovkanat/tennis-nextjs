import { Schema, Types } from 'mongoose';
import { TournamentFields } from './tournament';

export interface TournamentHistoryFields {
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  tournament: Schema.Types.ObjectId | TournamentFields;
}

export interface TournamentHistoryFields extends TournamentHistoryFields {
  _id: Types.ObjectId;
}
