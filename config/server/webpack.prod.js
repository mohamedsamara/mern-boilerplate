/* eslint-disable */

const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const common = require('./webpack.common');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = merge(common, {
  mode: 'production',
  entry: [path.join(CURRENT_WORKING_DIR, './server/index.js')],
  externals: [nodeExternals()],
});
