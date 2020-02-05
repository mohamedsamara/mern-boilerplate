import { useState } from 'react';

const useActive = initialValue => {
  const [value, setValue] = useState(initialValue);

  return [value, val => setValue(val)];
};

export default useActive;
