import { createBrowserRouter } from 'react-router-dom';
import { rootRoutes, privateProviderRoutes } from '../layout';
import authRoutes from '../pages/auth';
import homeRoutes from '../pages/home';
import profileRoutes from '../pages/profile';
import bookRoutes from '../pages/book';
import searchResultsRoutes from '../pages/search';
import showcaseRoutes from '../pages/showcase';
import welcomeRoutes from '../pages/welcome';

const router = createBrowserRouter([
  {
    ...rootRoutes,
    children: [
      ...authRoutes,
      ...welcomeRoutes,
      {
        ...privateProviderRoutes,
        children: [
          ...homeRoutes,
          ...profileRoutes,
          ...bookRoutes,
          ...searchResultsRoutes,
          ...showcaseRoutes
        ]
      }
    ]
  }
]);

export default router;
