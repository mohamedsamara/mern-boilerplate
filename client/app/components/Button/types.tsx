import { ReactNode, MouseEvent } from 'react';

declare const ButtonTypes: [
  'default',
  'primary',
  'ghost',
  'dashed',
  'danger',
  'link',
];
export declare type ButtonType = typeof ButtonTypes[number];
declare const ButtonShapes: ['circle', 'circle-outline', 'round'];
export declare type ButtonShape = typeof ButtonShapes[number];
declare const ButtonSizes: ['large', 'default', 'small'];
export declare type ButtonSize = typeof ButtonSizes[number];
declare const ButtonHTMLTypes: ['submit', 'button', 'reset'];
export declare type ButtonHTMLType = typeof ButtonHTMLTypes[number];

export interface Props {
  children?: ReactNode;
  className?: string;
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: string;
  text?: string;
  block?: boolean;
  ghost?: boolean;
  loading?: boolean;
  htmlType?: ButtonHTMLType;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}
