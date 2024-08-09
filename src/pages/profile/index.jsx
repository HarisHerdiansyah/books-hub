import ProfileLayout from './layout/ProfileLayout';
import Overview from './overview/Overview';
import ListBook from './list-book/ListBook';
import Article from './article/Article';
import Settings from './settings/Settings';
import { PATH } from '../../constants';

const profileRoutes = [
  {
    path: PATH.profile.profile,
    element: <ProfileLayout />,
    children: [
      {
        path: PATH.profile.overview,
        element: <Overview />
      },
      {
        path: PATH.profile.books,
        element: <ListBook />
      },
      {
        path: PATH.profile.article,
        element: <Article />
      },
      {
        path: PATH.profile.settings,
        element: <Settings />
      }
    ]
  }
];

export default profileRoutes;
