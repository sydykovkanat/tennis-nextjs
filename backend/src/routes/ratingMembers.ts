import express from 'express';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import {
  createRatingMember,
  deleteRatingMember,
  getRatingMembers,
  updateRatingMember,
  updateRatingMembersCategories,
} from '../controllers/ratingMembers';
import { imagesUpload } from '../utils/multer';

export const ratingMembersRouter = express.Router();

ratingMembersRouter.get('/', getRatingMembers);
ratingMembersRouter.post('/', auth, permit('admin', 'moderator'), imagesUpload.single('image'), createRatingMember);
ratingMembersRouter.delete('/:id', auth, permit('admin', 'moderator'), deleteRatingMember);
ratingMembersRouter.put('/:id', auth, permit('admin', 'moderator'), imagesUpload.single('image'), updateRatingMember);
ratingMembersRouter.patch('/categories', auth, permit('admin', 'moderator'), updateRatingMembersCategories);
