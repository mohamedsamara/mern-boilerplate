import { useState } from 'react';

const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);

  return [value, () => setValue(!value)];
};

export default useToggle;
