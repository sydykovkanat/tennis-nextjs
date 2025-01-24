import express from 'express';
import { getTournamentHistory, toggleAdd } from '../controllers/tournamentHistory';
import { auth } from '../middleware/auth';

export const tournamentHistoryRouter = express.Router();

tournamentHistoryRouter.get('/', auth, getTournamentHistory);
tournamentHistoryRouter.patch('/:id', auth, toggleAdd);
