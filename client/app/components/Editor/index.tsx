import React, { useEffect, useState } from 'react';
import {
  Editor as EditorDraft,
  EditorState,
  ContentState,
  convertFromHTML,
  RichUtils,
} from 'draft-js';

import { stateToHTML } from 'draft-js-export-html';

const Editor = props => {
  const { data, handleChange } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (data) {
      const blocksFromHTML = convertFromHTML(data.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );

      setEditorState(EditorState.createWithContent(state));
    }
  }, []);

  const onChange = value => {
    setEditorState(value);

    if (typeof handleChange === 'function') {
      const html = stateToHTML(editorState.getCurrentContent());
      data.content = html;
      return handleChange(html, data);
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

  return (
    <div className="editor-container">
      <div className="editor-actions">
        <button onClick={onUnderlineClick}>U</button>
        <button onClick={onBoldClick}>
          <b>B</b>
        </button>
        <button onClick={onItalicClick}>
          <em>I</em>
        </button>{' '}
      </div>
      <EditorDraft
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};

export default Editor;
