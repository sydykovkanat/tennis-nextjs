import express from 'express';
import { createRating, deleteRating, fetchRatings } from '../controllers/ratings';

export const ratingsRouter = express.Router();

ratingsRouter.get('/', fetchRatings);
ratingsRouter.post('/', createRating);
ratingsRouter.delete('/:id', deleteRating);
