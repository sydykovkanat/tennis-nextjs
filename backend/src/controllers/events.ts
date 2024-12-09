import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Event } from '../model/Event';
import { Rating } from '../model/Rating';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.create({
      rating: req.body.rating,
      category: req.body.category,
      gender: req.body.gender,
      link: req.body.link,
    });

    await Rating.findByIdAndUpdate(req.body.rating, { $push: { events: event._id } }, { new: true });

    return res.status(201).send(event);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ error: error.errors });
    }

    return next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).send({ error: 'Событие не найдено' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

export const editEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });

    if (!event) {
      return res.status(404).send({ error: 'Событие не найдено' });
    }

    const newEvent = await Event.findByIdAndUpdate(req.params.id, {
      rating: req.body.rating,
      category: req.body.category,
      gender: req.body.gender,
      link: req.body.link,
    });

    return res.status(200).send(newEvent);
  } catch (error) {
    return next(error);
  }
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.findById(req.params.id).populate('category').populate('rating');

    if (!event) {
      return res.status(404).send({ error: 'Событие не найдено' });
    }

    return res.status(200).send(event);
  } catch (error) {
    return next(error);
  }
};
