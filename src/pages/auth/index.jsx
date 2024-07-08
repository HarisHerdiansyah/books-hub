import Login from './login/Login';
import { PATH } from '../../constants/routes';

const authRoutes = [
  {
    path: PATH.auth.login,
    element: <Login />
  }
];

export default authRoutes;
