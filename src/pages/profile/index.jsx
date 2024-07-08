import ProfileLayout from './layout/ProfileLayout';
import Overview from './overview/Overview';
import ListBook from './list-book/ListBook';
import Article from './article/Article';
import Settings from './settings/Settings';
import { profilePath } from '../../constants/routes';

const profileRoutes = {
  path: profilePath.profile,
  element: <ProfileLayout />,
  children: [
    {
      path: profilePath.overview,
      element: <Overview />
    },
    {
      path: profilePath.books,
      element: <ListBook />
    },
    {
      path: profilePath.article,
      element: <Article />
    },
    {
      path: profilePath.settings,
      element: <Settings />
    }
  ]
};

export default profileRoutes;
