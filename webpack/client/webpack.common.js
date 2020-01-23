/* eslint-disable */
'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const CURRENT_WORKING_DIR = process.cwd();
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  entry: [path.join(CURRENT_WORKING_DIR, 'client/app/index.tsx')],
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json',
      '.css',
      '.scss',
      '.less',
      '.html',
    ],
    alias: {
      '@ant-design/icons/lib/dist$': path.join(
        CURRENT_WORKING_DIR,
        'client/app/icons.tsx',
      ),
      app: 'client/app',
    },
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
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
    new AntdDayjsWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'client/public',
      },
    ]),
  ],
};
