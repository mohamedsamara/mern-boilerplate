import React from 'react';

const ValidationMessage = props => {
  const { text, className } = props;

  const styles = `validation${className ? ` ${className}` : ''}`;

  return (
    <div className={styles}>
      <p className="validation-error">{text}</p>
    </div>
  );
};

export default ValidationMessage;
