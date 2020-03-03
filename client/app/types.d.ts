declare module '*.css';
declare module '*.png';

interface Options {
  cachePolicy: 'string';
}

export type OptionsPreview = Pick<Options, null>;
