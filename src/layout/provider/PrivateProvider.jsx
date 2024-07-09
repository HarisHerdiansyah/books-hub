import { Navigate, Outlet } from 'react-router-dom';
import { Apps } from './Context';
import { useContext } from 'react';

export default function PrivateProvider() {
  const { user } = useContext(Apps);

  if (user !== null) {
    return <Outlet />;
  }

  return <Navigate to='/auth/login' />;
}
