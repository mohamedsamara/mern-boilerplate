import React, { useState } from 'react';

import { IUser } from '../../contexts/User/types';

interface IUserState {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

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

const useUser = (): IUserState => {
  const [user, setValue] = useState(userState);

  const setUser = val => {
    setValue(val);
  };

  return { user, setUser };
};

export default useUser;
