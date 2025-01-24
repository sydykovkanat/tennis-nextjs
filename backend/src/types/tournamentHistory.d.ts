import { Schema, Types } from 'mongoose';

export interface TournamentHistoryFields {
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  tournament: Schema.Types.ObjectId;
}

export interface TournamentHistoryFields extends TournamentHistoryFields {
  _id: Types.ObjectId;
}
