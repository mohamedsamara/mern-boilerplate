import React, { useState } from 'react';

import Button from '../Button';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';

interface TextNode {
  title?: string;
  content?: string;
}

const AddNoteForm = props => {
  const [note, setNote] = useState<TextNode>({ title: '', content: '' });
  const { addNote, cancel } = props;

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

  const handleSubmit = () => {
    addNote(note);
  };

  return (
    <div className="add-note-form">
      <div className="add-note-box">
        <RichTextField
          label="title"
          value={note.title}
          handleChange={handleFieldChange}
        />
        <RichTextEditor
          label="content"
          value={note}
          handleChange={handleEditorChange}
        />
        <div className="note-actions">
          <Button text="Save" block={!cancel && true} onClick={handleSubmit} />
          {cancel && <Button onClick={cancel} text="Cancel" />}
        </div>
      </div>
    </div>
  );
};

export default AddNoteForm;
