import { model, Schema, Types } from 'mongoose';
import { TournamentHistoryFields } from '../types/tournamentHistory';
import { Tournament } from './Tournament';
import { User } from './User';

const TournamentHistorySchema = new Schema<TournamentHistoryFields>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (userId: Types.ObjectId) => User.findById(userId),
        message: 'Пользователь не существует!',
      },
    },
    tournament: {
      type: Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true,
      validate: async (tournamentId: Types.ObjectId) => Tournament.findById(tournamentId),
      message: 'Турнир не существует!',
    },
  },
  { timestamps: true }
);

export const TournamentHistory = model('TournamentHistory', TournamentHistorySchema);
