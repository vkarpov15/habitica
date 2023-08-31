/* eslint-disable global-require, no-process-env, import/no-commonjs */

// Register babel hook so we can write the real entry file (server.js) in ES6
// In production, the es6 code is pre-transpiled so it doesn't need it
if (process.env.NODE_ENV !== 'production') {
  require('@babel/register'); // eslint-disable-line import/no-extraneous-dependencies
}

const cluster = require('cluster');
const nconf = require('nconf');

const setupNconf = require('./libs/setupNconf');

// Initialize configuration BEFORE anything
setupNconf();

// Initialize @google-cloud/trace-agent
require('./libs/gcpTraceAgent');

const logger = require('./libs/logger').default;

const IS_PROD = nconf.get('IS_PROD');
const IS_DEV = nconf.get('IS_DEV');
const CORES = Number(nconf.get('WEB_CONCURRENCY')) || 0;

// Setup the cluster module
module.exports = require('./server.js');
