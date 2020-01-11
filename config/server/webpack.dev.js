/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const startServerPlugin = require('start-server-webpack-plugin');

const common = require('./webpack.common');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = merge(common, {
  mode: 'development',
  entry: [
    'webpack/hot/poll?1000',
    path.join(CURRENT_WORKING_DIR, './server/index.ts'),
  ],
  watch: true,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  plugins: [
    new startServerPlugin({
      name: 'server.bundle.js',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
