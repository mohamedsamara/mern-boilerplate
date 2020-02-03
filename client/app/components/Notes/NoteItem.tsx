import React from 'react';

import { Col } from 'antd';

import Button from '../Button';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';

const NoteItem = props => {
  const {
    note,
    handleFieldChange,
    handleEditorChange,
    updateNote,
    deleteNote,
  } = props;

  const fieldChange = value => {
    handleFieldChange(note._id, value);
  };

  const editorChange = value => {
    handleEditorChange(note._id, value);
  };

  const handleSave = () => {
    updateNote(note);
  };

  const handleDelete = () => {
    deleteNote(note._id);
  };

  return (
    <Col sm={24} md={24} lg={12} xl={8} className="gutter-row">
      <div className="note">
        <Button
          onClick={handleDelete}
          type="danger"
          shape="circle"
          icon="close"
          className="delete-note"
        />
        <RichTextField
          label="title"
          value={note.title}
          handleChange={fieldChange}
        />
        <RichTextEditor
          label="content"
          value={note}
          handleChange={editorChange}
        />
        <div className="note-actions">
          <Button text="Save" block onClick={handleSave} />
        </div>
      </div>
    </Col>
  );
};

export default NoteItem;
