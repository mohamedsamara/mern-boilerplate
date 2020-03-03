import React, { ReactNode } from 'react';

interface Props {
  text?: string;
  children?: ReactNode;
  Icon?: ReactNode;
}

const Label: React.FC<Props> = (props): JSX.Element => {
  const { text, children, Icon } = props;

  return (
    <div className="label-box">
      {Icon}
      <label className="label">{text}</label>
      {children}
    </div>
  );
};

export default Label;
