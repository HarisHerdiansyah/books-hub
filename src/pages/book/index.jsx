import BookDetail from './detail/BookDetail';
import BookForm from './form/BookForm';
import { PATH } from '../../constants';

const bookRoutes = [
  {
    path: PATH.book.add,
    element: <BookForm />
  },
  {
    path: PATH.book.edit,
    element: <BookForm />
  },
  {
    path: PATH.book.detail,
    element: <BookDetail />
  }
];

export default bookRoutes;
