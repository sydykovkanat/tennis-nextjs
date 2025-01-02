import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    chapter: {
      type: String,
      enum: ['male', 'female', 'mixed'],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    events: {
      type: [Schema.Types.ObjectId],
      ref: 'Event',
    },
  },
  { timestamps: true }
);

RatingSchema.index({ month: 1, year: 1 }, { unique: true });

export const Rating = mongoose.model('Rating', RatingSchema);
