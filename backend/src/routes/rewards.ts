import express from 'express';
import { createReward, getById, getRewards, removeReward, updateReward } from '../controllers/rewards';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';

export const rewardsRouter = express.Router();

rewardsRouter.post('/', auth, permit('admin', 'moderator'), createReward);
rewardsRouter.get('/', auth, getRewards);
rewardsRouter.get('/:id', auth, permit('admin', 'moderator'), getById);
rewardsRouter.put('/:id', auth, permit('admin', 'moderator'), updateReward);
rewardsRouter.delete('/:id', auth, permit('admin', 'moderator'), removeReward);
