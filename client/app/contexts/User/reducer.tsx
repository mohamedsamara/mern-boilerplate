import { UserState, UserActionTypes, UserActions } from './types';

const initialState: UserState = {
  user: {
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
  },
  loading: true,
};

const userReducer = (state: UserState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER_DATA: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case UserActionTypes.UNSET_USER_DATA:
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export { userReducer, initialState };
