import Homepage from '../components/Homepage';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Signup from '../components/Signup';
import page404 from '../components/404';

const routes = [
  { path: '/', exact: true, name: 'Homepage', component: Homepage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Signup', component: Signup },
  {
    path: '/dashboard',
    name: 'Dashboard',
    private: true,
    component: Dashboard,
  },
  { path: '*', component: page404 },
];

export default routes;
