import express from 'express';
import { createEvent, deleteEvent, editEvent, getEvent } from '../controllers/events';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';

export const eventsRouter = express.Router();

eventsRouter.post('/', auth, permit('admin', 'moderator'), createEvent);
eventsRouter.delete('/:id', auth, permit('admin', 'moderator'), deleteEvent);
eventsRouter.put('/:id', auth, permit('admin', 'moderator'), editEvent);
eventsRouter.get('/:id', auth, permit('admin', 'moderator'), getEvent);
