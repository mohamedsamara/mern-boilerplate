import React, { useState, useEffect, useRef } from 'react';

import Label from '../Label';

const RichTextField = props => {
  const { value, handleChange, label } = props;
  const [input, setInput] = useState(undefined);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, []);

  const onChange = () => {
    if (typeof handleChange === 'function') {
      return handleChange(inputRef.current.innerText);
    }
  };

  return (
    <div className="rich-text-field">
      <Label text={label} />
      <div
        className="content-editable"
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
