import BookDetail from './detail/BookDetail';
import BookForm from './form/BookForm';
import { bookPath } from '../../constants/routes';

const bookRoutes = [
  {
    path: bookPath.add,
    element: <BookForm />
  },
  {
    path: bookPath.edit,
    element: <BookForm />
  },
  {
    path: bookPath.detail,
    element: <BookDetail />
  }
];

export default bookRoutes;
