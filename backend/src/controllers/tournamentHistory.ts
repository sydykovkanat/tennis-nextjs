import { NextFunction, Request, Response } from 'express';
import { Tournament } from '../model/Tournament';
import { TournamentHistory } from '../model/TournamentHistory';

export const toggleAdd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const tournamentId = req.params.id;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).send({ error: 'Турнир не найден!' });

    const tournamentHistory = await TournamentHistory.findOne({ user: userId, tournament: tournamentId });

    if (tournamentHistory) {
      await TournamentHistory.deleteOne({ _id: tournamentHistory._id });
      return res.send({ message: 'Турнир удален из избранных!' });
    } else {
      await TournamentHistory.create({ user: userId, tournament: tournamentId });
      return res.send({ message: 'Турнир добавлен в избранные!' });
    }
  } catch (e) {
    return next(e);
  }
};

export const getTournamentHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 6;
    const startIndex = (page - 1) * limit;

    const tournamentHistory = await TournamentHistory.find()
      .where('user')
      .equals(userId)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: 'tournament',
        select:
          'category createdAt updatedAt eventDate name participants rank registrationLink regulationsDoc resultsLink tournamentYear',
      })
      .lean();
    if (tournamentHistory.length === 0)
      return res.status(404).send({ error: 'На данный момент у вас нету избранных турниров!' });

    const total = await TournamentHistory.countDocuments({ user: userId });
    const pages = limit > 0 ? Math.ceil(total / limit) : null;

    return res.send({ page, limit, total, pages, data: tournamentHistory });
  } catch (e) {
    return next(e);
  }
};
