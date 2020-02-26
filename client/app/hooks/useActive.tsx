import { useState, Dispatch, SetStateAction } from 'react';

const useActive = (
  initialValue: boolean,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(initialValue);
  return [value, val => setValue(val)];
};

export default useActive;
