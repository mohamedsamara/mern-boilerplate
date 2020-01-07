/* eslint-disable */

const path = require('path');
const webpack = require('webpack');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/server'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
