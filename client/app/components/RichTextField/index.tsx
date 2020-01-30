import React, { useState, useEffect, useRef } from 'react';

const RichTextField = props => {
  const { data, handleChange } = props;
  const [input, setInput] = useState();
  const [editable, setEditable] = useState(false);
  const inputRef = useRef(null);
  const prevInputRef = useRef(null);
  const fieldRef = useRef(null);

  useEffect(() => {
    if (data) {
      setInput(data);
    }
  }, [data]);

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
    prevInputRef.current = inputRef.current.innerText;
  };

  const handleBlur = () => {
    setEditable(false);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      setEditable(false);
      setInput(inputRef.current.innerText);
      setInput(prevInputRef.current);
    }
  };

  return (
    <div ref={fieldRef} className="rich-text-field">
      <div
        className={`content-editable${editable ? ' focused' : ''}`}
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
