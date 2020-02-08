/* eslint-disable */
const postcsspresetenv = require('postcss-preset-env');
const postcssnormalize = require('postcss-normalize');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = ctx => {
  return {
    plugins: [
      postcsspresetenv({}),
      autoprefixer({}),
      postcssnormalize({}),
      ...(ctx.env === 'production' ? [cssnano({})] : []),
    ],
  };
};
