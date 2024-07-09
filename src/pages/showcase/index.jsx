import ProfileLayout from '../profile/layout/ProfileLayout';
import Overview from '../profile/overview/Overview';
import ListBook from '../profile/list-book/ListBook';
import { PATH } from '../../constants';

const showcaseRoutes = [
  {
    path: PATH.showcase.showcase,
    element: <ProfileLayout />,
    children: [
      {
        path: PATH.showcase.overview,
        element: <Overview />
      },
      {
        path: PATH.showcase.books,
        element: <ListBook />
      }
    ]
  }
];

export default showcaseRoutes;
