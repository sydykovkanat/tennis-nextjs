import { model, Schema, Types } from 'mongoose';
import { RewardFields } from '../types/reward';
import { User } from './User';

const RewardSchema = new Schema<RewardFields>(
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
      type: String,
      required: [true, 'Введите название турнира!'],
      trim: true,
    },
    nomination: {
      type: String,
      trim: true,
    },
    place: {
      type: Number,
      validate: {
        validator: (value: number) => value !== 0,
        message: 'Место не может быть нулевым!',
      },
    },
    icon: {
      type: String,
      enum: ['cup', 'medal', 'racket'],
      default: 'cup',
    },
  },
  { timestamps: true }
);

export const Reward = model('Reward', RewardSchema);
