/* eslint-disable */

const postcsspresetenv = require('postcss-preset-env');
const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = ctx => {
  return {
    plugins: [
      postcsspresetenv({}),
      autoprefixer({}),
      ...(ctx.env === 'production'
        ? [
            purgecss({
              content: ['**/*.html'],
            }),
            cssnano({}),
          ]
        : []),
    ],
  };
};
