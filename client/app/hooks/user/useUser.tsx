import React, { useState } from 'react';

interface User {
  _id: string;
  email: string;
  role: string;
  created: string;
  __v?: number;
  profile: {
    firstName: string;
    lastName: string;
    website: string;
    bio: string;
    gender: string;
    birthdate: string;
  };
}

interface UserState {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const userState: User = {
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

const useUser = (): UserState => {
  const [user, setValue] = useState(userState);

  const setUser = val => {
    setValue(val);
  };

  return { user, setUser };
};

export default useUser;
