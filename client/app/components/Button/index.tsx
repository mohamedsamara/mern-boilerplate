import React from 'react';

import { Button as ButtonAntd } from 'antd';

const Button = props => {
  const {
    children,
    className,
    type,
    shape,
    icon,
    text,
    block,
    onClick,
  } = props;

  return (
    <ButtonAntd
      className={className}
      type={type}
      shape={shape}
      icon={icon}
      onClick={onClick}
      block={block}
    >
      {text}
      {children}
    </ButtonAntd>
  );
};

export default Button;
