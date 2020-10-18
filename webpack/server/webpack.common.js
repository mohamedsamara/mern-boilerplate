/* eslint-disable */
'use strict';

const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');

const CURRENT_WORKING_DIR = process.cwd();
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist/server'),
    filename: 'server.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
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
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new dotenv(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
  ],
};
