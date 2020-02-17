import { between } from '../../utils/expression';

export const validate = values => {
  const r1 = between(values.content, '<br>', '</p>');

  const errors = {
    title: '',
    content: '',
    valid: true,
    details: {
      title: '',
      content: '',
    },
  };

  if (!values.title) {
    errors.title = 'Title is required';
    errors.details.title = 'Title is required';
    errors.valid = false;
  }
  if (!values.content) {
    errors.content = 'Content is required';
    errors.details.content = 'Content is required';
    errors.valid = false;
  } else if (!r1[1]) {
    errors.content = 'Content is required';
    errors.details.content = 'Content is required';
    errors.valid = false;
  }

  return errors;
};

export default validate;
