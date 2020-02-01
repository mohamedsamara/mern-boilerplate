import React, { useState } from 'react';

import { Button } from 'antd';

import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';

interface TextNode {
  title?: string;
  content?: string;
}

const AddNoteForm = props => {
  const [note, setNote] = useState<TextNode>({ title: '', content: '' });

  const { addNote } = props;

  const handleFieldChange = value => {
    const newNote = { ...note };
    newNote.title = value;
    setNote(newNote);
  };

  const handleEditorChange = value => {
    const newNote = { ...note };
    newNote.content = value;
    setNote(newNote);
  };

  const handleSubmit = newNote => {
    addNote(newNote);
  };

  return (
    <div className="add-note-form">
      <div className="add-note-box">
        <RichTextField
          label="title"
          value={note.title}
          handleChange={value => handleFieldChange(value)}
        />
        <RichTextEditor
          label="content"
          value={note}
          handleChange={value => handleEditorChange(value)}
        />
        <div className="note-actions">
          <Button block onClick={() => handleSubmit(note)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteForm;
