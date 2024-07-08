import { createBrowserRouter } from 'react-router-dom';
import homeRoutes from '../pages/home';
import profileRoutes from '../pages/profile';
import bookRoutes from '../pages/book';
import searchResultsRoutes from '../pages/search';
import showcaseRoutes from '../pages/showcase';

const router = createBrowserRouter([
  ...homeRoutes,
  ...profileRoutes,
  ...bookRoutes,
  ...searchResultsRoutes,
  ...showcaseRoutes
]);

export default router;
