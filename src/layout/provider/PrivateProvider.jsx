import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context, PATH } from '../../constants';

export default function PrivateProvider() {
  const { state } = useContext(Context);
  const { user } = state;

  if (user.authState !== null) {
    return <Outlet />;
  }

  return <Navigate to={PATH.auth.login} />;
}
