import React, { FC } from 'react';

import { Button as ButtonAntd } from 'antd';

import { Props } from './types';

const Button: FC<Props> = (props): JSX.Element => {
  const {
    children,
    className,
    type,
    size,
    shape,
    icon,
    text,
    block,
    ghost,
    loading,
    htmlType,
    onClick,
  } = props;

  return (
    <ButtonAntd
      className={className}
      type={type}
      size={size}
      shape={shape}
      icon={icon}
      onClick={onClick}
      block={block}
      htmlType={htmlType}
      loading={loading}
      ghost={ghost}
    >
      {text}
      {children}
    </ButtonAntd>
  );
};

export default Button;
