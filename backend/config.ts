import path from 'path';
import { CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';

const envFile = process.env['NODE_ENV'] ? `.${process.env['NODE_ENV']}.env` : '.env';
configDotenv({ path: envFile });

const rootPath = __dirname;
const corsWhitelist = [
  'http://localhost:3000',
  'http://localhost:5183',
  'http://209.145.52.153:3000',
  'http://209.145.52.153:5183',
  'https://tennis.kg',
  'https://tennis.kg:3000',
  'https://tennis.kg:5183',
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const config = {
  port: process.env['PORT'] || 8000,
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  corsOptions,
  database: process.env['MONGO_DB_URL'] || 'mongodb://localhost/tennis',
};

export default config;
