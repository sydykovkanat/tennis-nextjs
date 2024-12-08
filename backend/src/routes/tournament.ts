import express from 'express';
import {
  createTournament,
  deleteTournament,
  deleteTournamentsByYear,
  getTournaments,
  updateTournament,
} from '../controllers/tournament';
import { filesUpload } from '../utils/multer';

export const tournamentsRouter = express.Router();

tournamentsRouter.get('/', getTournaments);
tournamentsRouter.post('/', filesUpload.single('regulationsDoc'), createTournament);
tournamentsRouter.delete('/:id', deleteTournament);
tournamentsRouter.delete('/one-year/:year', deleteTournamentsByYear);
tournamentsRouter.put('/:id', filesUpload.single('regulationsDoc'), updateTournament);
