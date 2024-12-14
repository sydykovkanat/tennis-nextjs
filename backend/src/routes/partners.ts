import express from 'express';
import { imagesUpload } from '../utils/multer';
import { createNewPartner, getOnePartner, getPartners, removePartner, updatePartner } from '../controllers/partners';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';

export const partnersRouter = express.Router();

partnersRouter.get('/', getPartners);
partnersRouter.post('/', auth, permit('admin', 'moderator'), imagesUpload.single('image'), createNewPartner);
partnersRouter.delete('/:id', auth, permit('admin', 'moderator'), removePartner);
partnersRouter.put('/:id', auth, permit('admin', 'moderator'), imagesUpload.single('image'), updatePartner);
partnersRouter.get('/:id', auth, permit('admin', 'moderator'), getOnePartner);
