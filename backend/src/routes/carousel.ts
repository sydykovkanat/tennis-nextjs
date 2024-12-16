import express from 'express';
import { MediaUpload } from '../utils/multer';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import { create, getCarousel, remove, update } from '../controllers/carousel';

export const carouselRouter = express.Router();

carouselRouter.get('/', getCarousel);

carouselRouter.post(
  '/admin-post-image-carousel',
  auth,
  permit('admin', 'moderator'),
  MediaUpload.single('file'),
  create
);

carouselRouter.delete('/admin-delete-image-carousel/:id', auth, permit('admin', 'moderator'), remove);

carouselRouter.put(
  '/admin-update-image-carousel/:id',
  auth,
  permit('admin', 'moderator'),
  MediaUpload.single('file'),
  update
);
