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
categoriesRouter.post('/', auth, permit('admin', 'moderator'), createCategory);
categoriesRouter.delete('/:id', auth, permit('admin', 'moderator'), removeCategory);
categoriesRouter.put('/:id', auth, permit('admin', 'moderator'), updateCategory);
categoriesRouter.get('/:id', getCategoryById);
