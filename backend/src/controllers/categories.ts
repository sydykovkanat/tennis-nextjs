import { Category } from '../model/Category';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { User } from '../model/User';
import { format } from 'date-fns';

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const ranks = await Category.find().lean();

    const formattedRanks = ranks.map((item) => ({
      ...item,
      createdAt: format(item.createdAt, 'dd.MM.yyyy, hh:mm'),
      updatedAt: format(item.updatedAt, 'dd.MM.yyyy, hh:mm'),
    }));

    return res.send(formattedRanks);
  } catch (error) {
    return next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const rank = await Category.create({ name });

    return res.send(rank);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
};

export const removeCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rank = await Category.findById(req.params.id);

    const isUsed = await User.findOne({ category: req.params.id });

    if (isUsed) {
      return res.status(400).send({ error: 'Категория привязана к пользователям!' });
    }

    if (!rank) return res.status(404).send({ message: 'Category not found' });

    await rank.deleteOne();

    return res.send({ message: 'Category deleted' });
  } catch (error) {
    return next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const isExist = await Category.findOne({ name }).select({ name: 1 }).lean().exec();

    if (isExist) return res.status(400).send({ message: 'Category already exists' });

    const category = await Category.findById(id).select({ name: 1 });

    if (!category) return res.status(404).send({ message: 'Category not found' });

    category.name = name;
    await category.save();

    return res.send(category);
  } catch (error) {
    return next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rank = await Category.findById(req.params.id);

    if (!rank) return res.status(404).send({ message: 'Category not found' });

    return res.send(rank);
  } catch (error) {
    return next(error);
  }
};
