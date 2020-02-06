import React from 'react';

import { Button as ButtonAntd } from 'antd';

const Button = props => {
  const {
    children,
    className,
    type,
    size,
    shape,
    icon,
    text,
    block,
    loading,
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
      loading={loading}
    >
      {text}
      {children}
    </ButtonAntd>
  );
};

export default Button;
