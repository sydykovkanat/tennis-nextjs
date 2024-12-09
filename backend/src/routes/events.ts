import express from 'express';
import { createEvent, deleteEvent, editEvent, getEvent } from '../controllers/events';

export const eventsRouter = express.Router();

eventsRouter.post('/', createEvent);
eventsRouter.delete('/:id', deleteEvent);
eventsRouter.put('/:id', editEvent);
eventsRouter.get('/:id', getEvent);
