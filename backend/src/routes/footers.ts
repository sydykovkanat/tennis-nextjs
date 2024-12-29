import express from 'express';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import {
  createFooterMenuPosition,
  createFooterSocialNetwork, createMainLogo,
  deleteOneFooterMenuPosition,
  deleteOneFooterSocialNetwork, getCurrentLogo,
  getFooterItems,
  getOneFooterMenuPosition,
  getOneFooterSocialNetwork, setCurrentLogo,
  updateFooterMenuPosition,
  updateFooterSocialNetwork,
  updateMainPartnerImage,
  updatePublicOffer,
} from '../controllers/footers';
import { imagesUpload } from '../utils/multer';

export const footersRouter = express.Router();

footersRouter.get('/', getFooterItems);

footersRouter.get('/get-one-social-network/:id', auth, permit('admin', 'moderator'), getOneFooterSocialNetwork);
footersRouter.post('/create-social-network', auth, permit('admin', 'moderator'), createFooterSocialNetwork);
footersRouter.patch('/update-social-network/:id', auth, permit('admin', 'moderator'), updateFooterSocialNetwork);
footersRouter.delete(
  '/delete-one-social-network/:id',
  auth,
  permit('admin', 'moderator'),
  deleteOneFooterSocialNetwork
);

footersRouter.get('/get-one-menu-position/:id', auth, permit('admin', 'moderator'), getOneFooterMenuPosition);
footersRouter.post('/create-menu-position', auth, permit('admin', 'moderator'), createFooterMenuPosition);
footersRouter.patch('/update-menu-position/:id', auth, permit('admin', 'moderator'), updateFooterMenuPosition);
footersRouter.delete('/delete-menu-position/:id', auth, permit('admin', 'moderator'), deleteOneFooterMenuPosition);

footersRouter.patch('/update-public-offer', auth, permit('admin', 'moderator'), updatePublicOffer);
footersRouter.patch(
  '/update-main-partner-image',
  auth,
  permit('admin', 'moderator'),
  imagesUpload.single('mainPartnerImage'),
  updateMainPartnerImage
);

footersRouter.post('/create-main-logo', auth, permit('admin', 'moderator'),imagesUpload.single('logo'), createMainLogo);
footersRouter.post('/set-current-logo', auth, permit('admin', 'moderator'), setCurrentLogo);
footersRouter.get('/get-current-logo', auth, permit('admin', 'moderator'), getCurrentLogo);
