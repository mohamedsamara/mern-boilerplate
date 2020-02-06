import React, { useEffect, useState } from 'react';
import {
  Editor,
  EditorState,
  ContentState,
  convertFromHTML,
  RichUtils,
} from 'draft-js';

import { Button } from 'antd';
import { stateToHTML } from 'draft-js-export-html';

import Label from '../Label';

const ButtonGroup = Button.Group;

const RichTextEditor = props => {
  const { className, value, handleChange, label, name } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (value) {
      const blocksFromHTML = convertFromHTML(value);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );

      setEditorState(EditorState.createWithContent(state));
    }
  }, []);

  const onChange = val => {
    setEditorState(val);
    const e = {
      name,
      value,
    };

    if (typeof handleChange === 'function') {
      e.value = stateToHTML(editorState.getCurrentContent());
      return handleChange(e);
    }
  };

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const styles = `draft-editor ${className}`;

  return (
    <div className="rich-text-editor">
      <div className="editor-actions">
        <ButtonGroup>
          <Button onClick={onBoldClick}>
            <b>B</b>
          </Button>
          <Button onClick={onUnderlineClick}>U</Button>
          <Button onClick={onItalicClick}>
            <em>I</em>
          </Button>
        </ButtonGroup>
      </div>
      <Label text={label} />
      <div className={styles}>
        <Editor
          className="draft-input"
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
