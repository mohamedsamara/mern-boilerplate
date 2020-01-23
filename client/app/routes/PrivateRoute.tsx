import { useHistory } from 'react-router-dom';

export const auth = {
  authenticated: true,
};

const PrivateRoute = ({ children }) => {
  const history = useHistory();

  if (!auth.authenticated) {
    history.push('/login');
  }

  return children;
};

export default PrivateRoute;
