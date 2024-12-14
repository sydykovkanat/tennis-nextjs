import express from 'express';
import {
  createTournament,
  deleteTournament,
  deleteTournamentsByYear,
  getTournaments,
  updateTournament,
} from '../controllers/tournament';
import { filesUpload } from '../utils/multer';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';

export const tournamentsRouter = express.Router();

tournamentsRouter.get('/', getTournaments);
tournamentsRouter.post('/', auth, permit('admin', 'moderator'), filesUpload.single('regulationsDoc'), createTournament);
tournamentsRouter.delete('/:id', auth, permit('admin', 'moderator'), deleteTournament);
tournamentsRouter.delete('/one-year/:year', auth, permit('admin', 'moderator'), deleteTournamentsByYear);
tournamentsRouter.put('/:id', auth, permit('admin', 'moderator'), filesUpload.single('regulationsDoc'), updateTournament);
