import { createBrowserRouter } from 'react-router-dom';
import homeRoutes from '../pages/home';
import profileRoutes from '../pages/profile';
import bookRoutes from '../pages/book';

const router = createBrowserRouter([homeRoutes, profileRoutes, ...bookRoutes]);

export default router;
