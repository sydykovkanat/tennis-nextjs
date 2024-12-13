import express from 'express';
import { createRating, deleteRating, fetchRatings } from '../controllers/ratings';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';

export const ratingsRouter = express.Router();

ratingsRouter.get('/', fetchRatings);
ratingsRouter.post('/', auth, permit('admin', 'moderator'), createRating);
ratingsRouter.delete('/:id', auth, permit('admin', 'moderator'), deleteRating);
