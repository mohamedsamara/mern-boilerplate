import React, { useState, useEffect } from 'react';

import Button from '../Button';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';
import ValidationMessage from '../ValidationMessage';

import validate from './validate.add';

interface TextNode {
  title?: string;
  content?: string;
}

const AddNoteForm = props => {
  const [values, setValues] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    valid: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const { addNote, cancel } = props;

  useEffect(() => {
    if (errors.valid === true && submitting) {
      addNote(values);
      setSubmitting(false);
    }
  }, [errors]);

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
    }
  }, [values]);

  const handleChange = e => {
    setValues(val => ({
      ...val,
      [e.name]: e.value,
    }));
  };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }

    setErrors(validate(values));
    setSubmitting(true);
  };

  return (
    <form className="add-note-form" onSubmit={handleSubmit} noValidate>
      <div className="add-note-box">
        <RichTextField
          className={`${errors.title && 'danger'}`}
          name="title"
          label="title"
          value={values.title}
          handleChange={handleChange}
        />
        <ValidationMessage
          text={errors.title}
          className={`${errors.title && 'danger'}`}
        />
        <RichTextEditor
          className={`${errors.content && 'danger'}`}
          name="content"
          label="content"
          value={values.content}
          handleChange={handleChange}
        />
        <ValidationMessage
          text={errors.content}
          className={`${errors.content && 'danger'}`}
        />
        <div className="note-actions">
          <Button
            text="Save"
            block={!cancel && true}
            loading={submitting}
            htmlType="submit"
          />
          {cancel && <Button onClick={cancel} text="Cancel" />}
        </div>
      </div>
    </form>
  );
};

export default AddNoteForm;
