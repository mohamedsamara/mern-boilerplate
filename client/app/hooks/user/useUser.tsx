import { useState, Dispatch, SetStateAction } from 'react';

import { IUser } from '../../contexts/User/types';

const userState: IUser = {
  _id: '',
  email: '',
  role: '',
  created: '',
  __v: 0,
  profile: {
    firstName: '',
    lastName: '',
    website: '',
    bio: '',
    gender: '',
    birthdate: null,
  },
};

const useUser = (): [IUser, Dispatch<SetStateAction<IUser>>] => {
  const [user, setValue] = useState<IUser>(userState);

  const setUser = val => {
    setValue(val);
  };

  return [user, setUser];
};

export default useUser;
