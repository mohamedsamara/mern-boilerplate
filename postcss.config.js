const postcsspresetenv = require('postcss-preset-env');
const purgecss = require('@fullhuman/postcss-purgecss');
const postcssnormalize = require('postcss-normalize');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = ctx => {
  return {
    plugins: [
      postcsspresetenv({}),
      autoprefixer({}),
      postcssnormalize({}),
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
