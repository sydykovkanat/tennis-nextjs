import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    rating: {
      type: Schema.Types.ObjectId,
      ref: 'Rating',
      required: true,

      validate: {
        validator: async (value: string) => {
          const rating = await mongoose.model('Rating').findById(value);
          return !!rating;
        },

        message: 'Rating does not exist',
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,

      validate: {
        validator: async (value: string) => {
          const category = await mongoose.model('Category').findById(value);
          return !!category;
        },

        message: 'Category does not exist',
      },
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', EventSchema);
