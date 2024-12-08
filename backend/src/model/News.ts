import { model, Schema } from 'mongoose';
import { NewsFields } from '../types/news';

const NewsSchema = new Schema<NewsFields>(
  {
    title: {
      type: String,
      required: [true, 'Введите заголовок новости!'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Введите текст новости!'],
    },
    newsCover: {
      type: String,
      required: [true, 'Загрузите обложку новости!'],
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const News = model('News', NewsSchema);
