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
import EditPassword from '../components/EditPassword';

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
    path: '/edit-password',
    name: 'EditPasssword',
    private: true,
    component: EditPassword,
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
  {
    path: '/reset-password/:token',
    name: 'Reset-Passsword',
    protected: true,
    component: ResetPassword,
  },

  { path: '*', component: page404 },
];

export default routes;
