import React, { useState } from 'react';

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

  return (
    <>
      <RichTextField
        value={note.title}
        handleChange={value => handleFieldChange(value)}
      />
      <RichTextEditor
        value={note}
        handleChange={value => handleEditorChange(value)}
      />
      <div className="note-actions">
        {/* <Icon type="plus" onClick={handleSetEmpty} /> */}
        <button onClick={() => addNote(note)}>Save</button>
      </div>
    </>
  );
};

export default AddNoteForm;
