import Homepage from '../components/Homepage';
import Notes from '../components/Notes';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ForgotPassword from '../components/ForgotPassword';
import page404 from '../components/404';
import Logout from '../components/Logout';
import Dashboard from '../components/Dashboard';
import EditProfile from '../components/EditProfile';
import ResetPassword from '../components/ResetPassword';

const routes = [
  { path: '/', exact: true, name: 'Homepage', component: Homepage },
  { path: '/notes', name: 'Notes', private: true, component: Notes },
  {
    path: '/dashboard',
    name: 'Dashboard',
    private: true,
    component: Dashboard,
  },
  {
    path: '/profile',
    name: 'Profile',
    private: true,
    component: EditProfile,
  },
  {
    path: '/reset-password',
    name: 'Reset-Passsword',
    private: true,
    component: ResetPassword,
  },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/login', name: 'Login', protected: true, component: Login },
  { path: '/register', name: 'Signup', protected: true, component: Signup },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    protected: true,
    component: ForgotPassword,
  },

  { path: '*', component: page404 },
];

export default routes;
