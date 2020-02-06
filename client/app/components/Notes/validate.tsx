import { between } from '../../utils/expression';

const validate = values => {
  const r1 = between(values.content, '<br>', '</p>');

  const errors = {
    title: '',
    content: '',
    valid: false,
  };

  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (!values.content) {
    errors.content = 'Content is required';
  } else if (!r1[1]) {
    errors.content = 'Content is required KK';
  } else if (
    errors.title.includes('required') !== true &&
    errors.content.includes('required') !== true
  ) {
    errors.valid = true;
  }
  // else {
  //   errors.valid = true;
  // }

  return errors;
};

export default validate;
