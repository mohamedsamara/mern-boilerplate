import React from 'react';

interface Props {
  text?: string;
  className?: string;
}

const ValidationMessage: React.FC<Props> = (props): JSX.Element => {
  const { text, className } = props;

  const styles = `validation${className ? ` ${className}` : ''}`;

  return (
    <div className={styles}>
      <p className="validation-error">{text}</p>
    </div>
  );
};

export default ValidationMessage;
