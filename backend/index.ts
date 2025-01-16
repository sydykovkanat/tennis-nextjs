import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { carouselRouter } from './src/routes/carousel';
import { categoriesRouter } from './src/routes/categories';
import { eventsRouter } from './src/routes/events';
import { newsRouter } from './src/routes/news';
import { partnersRouter } from './src/routes/partners';
import { ratingMembersRouter } from './src/routes/ratingMembers';
import { ratingsRouter } from './src/routes/ratings';
import { usersRouter } from './src/routes/users';
import { footersRouter } from './src/routes/footers';
import { tournamentsRouter } from './src/routes/tournament';
import { rewardsRouter } from './src/routes/rewards';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/ratingMembers', ratingMembersRouter);
app.use('/carousel', carouselRouter);
app.use('/news', newsRouter);
app.use('/rewards', rewardsRouter);
app.use('/categories', categoriesRouter);
app.use('/partners', partnersRouter);
app.use('/ratings', ratingsRouter);
app.use('/events', eventsRouter);
app.use('/footers', footersRouter);
app.use('/tournaments', tournamentsRouter);

const run = async () => {
  console.log('connecting to database...');
  await mongoose.connect(config.database);
  console.log('connected to database');

  console.log('starting server...');
  app.listen(config.port, () => {
    console.log(`Server running at http://127.0.0.1:${config.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
