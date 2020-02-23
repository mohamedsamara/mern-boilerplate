import { SET_USER_DATA, UNSET_USER_DATA } from './constants';

const initialState = {
  user: null,
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case UNSET_USER_DATA:
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
