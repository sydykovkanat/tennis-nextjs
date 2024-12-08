import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { getMonth } from '../lib/getMonth';
import { Rating } from '../model/Rating';

export const fetchRatings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const monthMap: Record<string, number> = {
      january: 1,
      february: 2,
      march: 3,
      april: 4,
      may: 5,
      june: 6,
      july: 7,
      august: 8,
      september: 9,
      october: 10,
      november: 11,
      december: 12,
    };

    const ratings = await Rating.find()
      .populate({
        path: 'events',
        populate: {
          path: 'category',
        },
      })
      .lean()
      .exec();

    const sortedRatings = ratings.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }

      return monthMap[a.month.toLowerCase()] - monthMap[b.month.toLowerCase()];
    });

    return res.send(sortedRatings);
  } catch (error) {
    return next(error);
  }
};

export const createRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rating = await Rating.create({
      chapter: req.body.chapter,
      month: req.body.month,
      year: req.body.year,
    });

    return res.status(201).send(rating);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send({
        error: `Запись в ${getMonth(req.body.month, 'ending').toLowerCase()} ${req.body.year} году уже существует!`,
        code: 409,
      });
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ error: error.errors });
    }

    return next(error);
  }
};

export const deleteRating = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);

    if (!rating) {
      return res.status(404).send({ error: 'Рейтинг не найден' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
