import express from 'express';
import { auth } from '../middleware/auth';
import {
  addUser,
  forgotPassword,
  getOneUser,
  getPermissionLevel,
  getUsers,
  login,
  logout,
  register,
  resetPassword,
  updateActiveStatus,
  updateCurrentProfile,
  updateProfile,
} from '../controllers/users';
import { permit } from '../middleware/permit';

export const usersRouter = express.Router();

usersRouter.get('/get-users', auth, permit('admin', 'moderator'), getUsers);
usersRouter.get('/:id', auth, getOneUser);
usersRouter.get('/:id/permission', auth, getPermissionLevel);
usersRouter.post('/', register);
usersRouter.post('/add-user', auth, permit('admin', 'moderator'), addUser);
usersRouter.post('/sessions', login);
usersRouter.delete('/sessions', auth, logout);
usersRouter.post('/forgot-password', forgotPassword);
usersRouter.post('/reset-password/:token', resetPassword);
usersRouter.put('/update-info', auth, updateProfile);
usersRouter.put('/:id/update-info', auth, updateCurrentProfile);
usersRouter.patch('/:id/toggleActive', auth, permit('admin', 'moderator'), updateActiveStatus);
