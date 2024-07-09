import { Navigate, Outlet } from 'react-router-dom';
import { Apps } from '../../layout/Context';
import { useEffect, useContext } from 'react';

export default function Root() {
  const { user } = useContext(Apps);

  useEffect(() => {
    console.log(user);
  });

  if (user !== null) {
    return <Outlet />;
  }

  return <Navigate to='/auth/login' />;
}
