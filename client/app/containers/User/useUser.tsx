import { useContext } from 'react';

import UserContext from './context';

const useUser = () => useContext(UserContext);

export default useUser;
