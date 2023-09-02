import nconf from 'nconf';
import mongoose from 'mongoose';
import logger from './logger';

mongoose.set('autoCreate', true);
mongoose.set('autoIndex', false);

import { driver } from 'stargate-mongoose';
mongoose.setDriver(driver);

const IS_PROD = nconf.get('IS_PROD');
const MAINTENANCE_MODE = nconf.get('MAINTENANCE_MODE');
const POOL_SIZE = nconf.get('MONGODB_POOL_SIZE');

// Do not connect to MongoDB when in maintenance mode
if (MAINTENANCE_MODE !== 'true') {
  //const mongooseOptions = getDefaultConnectionOptions();

  const DB_URI = nconf.get('STARGATE_JSON_API_URL');
  //const connectionUrl = IS_PROD ? DB_URI : getDevelopmentConnectionUrl(DB_URI);

  mongoose.connect(DB_URI, {
    username: nconf.get('STARGATE_JSON_USERNAME'),
    password: nconf.get('STARGATE_JSON_PASSWORD'),
    authUrl: nconf.get('STARGATE_JSON_AUTH_URL')
  }).then(() => logger.info('Connected with Stargate-Mongoose.'));
}
