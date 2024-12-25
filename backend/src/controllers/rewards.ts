import { NextFunction, Request, Response } from 'express';
import { Error, Types } from 'mongoose';
import { format } from 'date-fns';
import { Reward } from '../model/Reward';

export const createReward = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, tournament, nomination, place, icon } = req.body;

    const reward = await Reward.create({
      user,
      tournament,
      nomination,
      place,
      icon,
    });

    return res.send(reward);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
};

export const getRewards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dateFormat = 'dd.MM.yyyy';
    const { userId } = req.query;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 16;
    const startIndex = (page - 1) * limit;
    console.log(req.query.page);
    const rewards = await Reward.find()
      .where('user')
      .equals(userId)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .lean();
    if (rewards.length === 0) return res.status(404).send({ error: 'На данный момент у вас нету наград!' });

    const formattedRewards = rewards.map((item) => ({
      ...item,
      createdAt: format(item.createdAt, dateFormat),
      updatedAt: format(item.updatedAt, dateFormat),
    }));

    const total = await Reward.countDocuments({ user: userId });
    const pages = limit > 0 ? Math.ceil(total / limit) : null;

    return res.send({ page, limit, total, pages, data: formattedRewards });
  } catch (e) {
    return next(e);
  }
};

export const updateReward = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: 'Неправильный id!' });
    }

    const { tournament, nomination, place, icon } = req.body;
    const { id } = req.params;

    const existingReward = await Reward.findById(id);
    if (!existingReward) return res.status(404).send({ message: 'Награда не найдена!' });

    const rewardData = {
      tournament: tournament || existingReward.tournament,
      nomination: nomination || existingReward.nomination,
      place: place || existingReward.place,
      icon: icon || existingReward.icon,
    };

    const updatedReward = await Reward.findByIdAndUpdate(id, rewardData, { new: true, runValidators: true });
    if (!updatedReward) return res.status(404).send({ error: 'Награда не найдена или ошибка при сохранении!' });

    return res.send(updatedReward);
  } catch (error) {
    return next(error);
  }
};

export const removeReward = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: 'Неправильный тип id!' });
    }

    const id = req.params.id;
    const rewards = await Reward.findById(id);

    if (!rewards) {
      return res.status(404).send({ error: 'Награда не найдена!' });
    }

    await Reward.deleteOne({ _id: id });

    return res.send({ message: 'Награда успешно удалена!' });
  } catch (e) {
    return next(e);
  }
};
