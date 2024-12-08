import express from 'express';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import {
  createCategory,
  getCategories,
  getCategoryById,
  removeCategory,
  updateCategory,
} from '../controllers/categories';

export const categoriesRouter = express.Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.post('/', auth, permit('admin'), createCategory);
categoriesRouter.delete('/:id', auth, permit('admin'), removeCategory);
categoriesRouter.put('/:id', auth, permit('admin'), updateCategory);
categoriesRouter.get('/:id', getCategoryById);
