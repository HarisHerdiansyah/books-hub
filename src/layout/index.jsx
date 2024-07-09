import RootLayout from './RootLayout';
import PrivateProvider from './provider/PrivateProvider';

const rootRoutes = {
  path: '/',
  element: <RootLayout />
};

const privateProviderRoutes = {
  path: '/',
  element: <PrivateProvider />
};

export { rootRoutes, privateProviderRoutes };
