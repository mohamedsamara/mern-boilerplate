import React from 'react';

interface Props {
  text?: string;
}

const Label: React.FC<Props> = (props): JSX.Element => {
  const { text } = props;

  return <label className="label">{text}</label>;
};

export default Label;
