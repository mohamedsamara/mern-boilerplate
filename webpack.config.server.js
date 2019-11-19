/* eslint-disable */

const path = require('path');
const nodeExternals = require('webpack-node-externals');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    name: 'server',
    entry: [path.join(CURRENT_WORKING_DIR, './server/index.js')],
    output: {
      path: path.join(CURRENT_WORKING_DIR, '/dist/server'),
      filename: 'server.bundle.js',
      publicPath: '/',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  };
};
