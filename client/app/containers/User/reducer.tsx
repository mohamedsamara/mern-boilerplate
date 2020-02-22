import { SET_USER_DATA, UNSET_USER_DATA } from './constants';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case UNSET_USER_DATA:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export { userReducer, initialState };
