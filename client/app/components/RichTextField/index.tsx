import React, { useState, useEffect, useRef } from 'react';

import Label from '../Label';

interface Props {
  className?: string;
  value: string;
  label?: string;
  name: string;
  handleChange: (event) => void;
}

const RichTextField: React.FC<Props> = (props): JSX.Element => {
  const { className, value, handleChange, label, name } = props;
  const [input, setInput] = useState(undefined);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, []);

  const onChange = () => {
    const e = {
      name,
      value,
    };

    if (typeof handleChange === 'function') {
      e.value = inputRef.current.innerText;
      return handleChange(e);
    }
  };

  const styles = `content-editable${className ? ` ${className}` : ''}`;

  return (
    <div className="rich-text-field">
      <Label text={label} />
      <div
        className={styles}
        role="textbox"
        tabIndex={0}
        ref={inputRef}
        contentEditable
        onInput={onChange}
        suppressContentEditableWarning
      >
        {input}
      </div>
    </div>
  );
};

export default RichTextField;
