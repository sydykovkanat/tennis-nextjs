import express from 'express';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import {
  createFooterMenuPosition,
  createFooterSocialNetwork,
  deleteOneFooterMenuPosition,
  deleteOneFooterSocialNetwork,
  getFooterItems,
  getOneFooterMenuPosition,
  getOneFooterSocialNetwork,
  updateFooterMenuPosition,
  updateFooterSocialNetwork,
  updateMainPartnerImage,
  updatePublicOffer,
} from '../controllers/footers';
import { imagesUpload } from '../utils/multer';

export const footersRouter = express.Router();

footersRouter.get('/', getFooterItems);

footersRouter.get('/get-one-social-network/:id', auth, permit('admin'), getOneFooterSocialNetwork);
footersRouter.post('/create-social-network', auth, permit('admin'), createFooterSocialNetwork);
footersRouter.patch('/update-social-network/:id', auth, permit('admin'), updateFooterSocialNetwork);
footersRouter.delete('/delete-one-social-network/:id', auth, permit('admin'), deleteOneFooterSocialNetwork);

footersRouter.get('/get-one-menu-position/:id', auth, permit('admin'), getOneFooterMenuPosition);
footersRouter.post('/create-menu-position', auth, permit('admin'), createFooterMenuPosition);
footersRouter.patch('/update-menu-position/:id', auth, permit('admin'), updateFooterMenuPosition);
footersRouter.delete('/delete-menu-position/:id', auth, permit('admin'), deleteOneFooterMenuPosition);

footersRouter.patch('/update-public-offer', auth, permit('admin'), updatePublicOffer);
footersRouter.patch(
  '/update-main-partner-image',
  auth,
  permit('admin'),
  imagesUpload.single('mainPartnerImage'),
  updateMainPartnerImage
);
