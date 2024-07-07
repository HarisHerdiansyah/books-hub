import { createBrowserRouter } from 'react-router-dom';
import homeRoutes from '../pages/home';
import profileRoutes from '../pages/profile';

const router = createBrowserRouter([homeRoutes, profileRoutes]);

export default router;
