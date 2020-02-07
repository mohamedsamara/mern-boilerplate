import React, { useState, useEffect } from 'react';

import Button from '../Button';
import RichTextEditor from '../RichTextEditor';
import RichTextField from '../RichTextField';
import ValidationMessage from '../ValidationMessage';

import validate from './validate';

interface TextNode {
  title?: string;
  content?: string;
}

const AddNoteForm = props => {
  const [values, setValues] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    valid: false,
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const { addNote, cancel } = props;

  useEffect(() => {
    if (errors.valid === true && isSubmitting) {
      setSubmitting(false);
      addNote(values);
    }
  }, [errors]);

  useEffect(() => {
    if (isSubmitting) {
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
            loading={isSubmitting}
            htmlType="submit"
          />
          {cancel && <Button onClick={cancel} text="Cancel" />}
        </div>
      </div>
    </form>
  );
};

export default AddNoteForm;
