import { useHistory } from 'react-router-dom';

import { useAuth } from '../containers/Auth';

const PrivateRoute = ({ children }) => {
  const history = useHistory();
  const { state } = useAuth();

  if (!state.authenticated) {
    history.push('/login');
  }

  return children;
};

export default PrivateRoute;
