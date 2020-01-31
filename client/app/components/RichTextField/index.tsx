import React, { useState, useEffect, useRef } from 'react';

const RichTextField = props => {
  const { value, handleChange } = props;
  const [input, setInput] = useState(undefined);
  const [editable, setEditable] = useState(false);
  const [style, setStyle] = useState(false);
  const inputRef = useRef(null);
  const prevInputRef = useRef(null);

  useEffect(() => {
    if (value) {
      setInput(value);
    } else {
      setEditable(true);
    }
  }, []);

  useEffect(() => {
    if (editable) {
      inputRef.current.focus();
    }
  }, [editable]);

  const onChange = () => {
    if (typeof handleChange === 'function') {
      return handleChange(inputRef.current.innerText);
    }
  };

  const handleClick = () => {
    setEditable(true);
    setStyle(true);
    prevInputRef.current = inputRef.current.innerText;
  };

  const handleBlur = () => {
    setStyle(false);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      setEditable(false);
      setStyle(true);
      setInput(inputRef.current.innerText);
      setInput(prevInputRef.current);
    }
  };

  return (
    <div className={`rich-text-field${style ? ' focused' : ''}`}>
      <div
        className="content-editable"
        role="textbox"
        tabIndex={0}
        ref={inputRef}
        contentEditable={editable}
        onInput={onChange}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        suppressContentEditableWarning
      >
        {input}
      </div>
    </div>
  );
};

export default RichTextField;
