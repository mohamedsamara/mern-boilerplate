import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const auth = {
  authenticated: false,
};

const token = localStorage.getItem('token');

if (token) {
  const { exp } = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  auth.authenticated = true;

  if (exp < currentTime) {
    //
  }
}

const PrivateRoute = ({ children }) => {
  const history = useHistory();

  if (!auth.authenticated) {
    history.push('/login');
  }

  return children;
};

export default PrivateRoute;
