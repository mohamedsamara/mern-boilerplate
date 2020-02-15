import { useHistory } from 'react-router-dom';

import { useAuth } from '../containers/Auth';

const ProtectedRoute = ({ children }) => {
  const history = useHistory();
  const { state } = useAuth();

  if (state.authenticated) {
    history.push('/dashboard');
  }

  return children;
};

export default ProtectedRoute;
