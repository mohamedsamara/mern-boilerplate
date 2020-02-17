import React, { useState, useEffect } from 'react';

import { Col } from 'antd';

import Button from '../Button';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';
import ValidationMessage from '../ValidationMessage';

import validate from './validate.edit';

const NoteItem = props => {
  const {
    note,
    handleFieldChange,
    handleEditorChange,
    updateNote,
    deleteNote,
  } = props;

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: note.title,
    content: note.content,
    valid: true,
    details: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (errors.valid === true && submitting) {
      updateNote(note);
      setSubmitting(false);
    }
  }, [errors]);

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
    }
  }, [handleFieldChange, handleEditorChange]);

  const fieldChange = value => {
    handleFieldChange(note._id, value);
  };

  const editorChange = value => {
    handleEditorChange(note._id, value);
  };

  const handleSave = () => {
    setErrors(validate(note));
    setSubmitting(true);
  };

  const handleDelete = () => {
    deleteNote(note._id);
  };

  return (
    <Col sm={24} md={12} lg={12} xl={6} className="gutter-row">
      <div className="note">
        <Button
          onClick={handleDelete}
          type="danger"
          shape="circle"
          icon="close"
          className="delete-note-btn"
        />
        <RichTextField
          className={`${errors.details.title && 'danger'}`}
          name="title"
          label="title"
          value={note.title}
          handleChange={fieldChange}
        />
        <ValidationMessage
          text={errors.title}
          className={`${errors.details.title && 'danger'}`}
        />
        <RichTextEditor
          className={`${errors.details.content && 'danger'}`}
          name="content"
          label="content"
          value={note.content}
          handleChange={editorChange}
        />
        <ValidationMessage
          text={errors.content}
          className={`${errors.details.content && 'danger'}`}
        />
        <div className="note-actions">
          <Button text="Save" block loading={submitting} onClick={handleSave} />
        </div>
      </div>
    </Col>
  );
};

export default NoteItem;
