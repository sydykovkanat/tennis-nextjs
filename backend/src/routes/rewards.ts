import express from 'express';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import { createReward, getRewards, removeReward, updateReward } from '../controllers/rewards';

export const rewardsRouter = express.Router();

rewardsRouter.post('/', auth, permit('admin', 'moderator'), createReward);
rewardsRouter.get('/', auth, getRewards);
rewardsRouter.put('/:id', auth, permit('admin', 'moderator'), updateReward);
rewardsRouter.delete('/:id', auth, permit('admin', 'moderator'), removeReward);
