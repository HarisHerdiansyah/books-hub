import Login from './login/Login';
import Register from './register/Register';
import ResetPass from './reset-password/ResetPass';
import { PATH } from '../../constants';

const authRoutes = [
  {
    path: PATH.auth.login,
    element: <Login />
  },
  {
    path: PATH.auth.register,
    element: <Register />
  },
  {
    path: PATH.auth.resetPass,
    element: <ResetPass />
  }
];

export default authRoutes;
