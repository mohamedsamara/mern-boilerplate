/* eslint-disable */

const webpackMerge = require('webpack-merge');

const common = require('./config/webpack/webpack.common');

let envConfig;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    envConfig = require('./config/webpack/webpack.prod');
    break;

  case 'dev':
  case 'development':
  default:
    envConfig = require('./config/webpack/webpack.dev');
}

module.exports = webpackMerge(common, envConfig);
