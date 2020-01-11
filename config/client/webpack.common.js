/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  entry: [path.join(CURRENT_WORKING_DIR, 'client/app/index.tsx')],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.html'],
    alias: {
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
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ],
  },
  plugins: [
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
