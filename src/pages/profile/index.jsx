import ProfileLayout from './layout/ProfileLayout';
import Overview from './overview/Overview';
import ListBook from './list-book/ListBook';
import Article from './article/Article';
import Settings from './settings/Settings';

export const path = {
  profile: '/profile',
  overview: '/profile/overview',
  article: '/profile/article',
  settings: '/profile/settings',
  books: '/profile/list-book'
};

const profileRoutes = {
  path: path.profile,
  element: <ProfileLayout />,
  children: [
    {
      path: path.overview,
      element: <Overview />
    },
    {
      path: path.books,
      element: <ListBook />
    },
    {
      path: path.article,
      element: <Article />
    },
    {
      path: path.settings,
      element: <Settings />
    }
  ]
};

export default profileRoutes;
