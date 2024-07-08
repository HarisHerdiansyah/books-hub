import { createBrowserRouter } from 'react-router-dom';
import rootRoutes from '../pages/root';
import authRoutes from '../pages/auth';
import homeRoutes from '../pages/home';
import profileRoutes from '../pages/profile';
import bookRoutes from '../pages/book';
import searchResultsRoutes from '../pages/search';
import showcaseRoutes from '../pages/showcase';

const privateRoutes = {
  ...rootRoutes,
  children: [
    ...homeRoutes,
    ...profileRoutes,
    ...bookRoutes,
    ...searchResultsRoutes,
    ...showcaseRoutes
  ]
};

const router = createBrowserRouter([privateRoutes, ...authRoutes]);

export default router;
