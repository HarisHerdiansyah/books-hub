import BookDetail from './detail/BookDetail';
import BookForm from './form/BookForm';
import { PATH } from '../../constants';

const bookRoutes = [
  {
    path: PATH.book.add,
    element: <BookForm />
  },
  {
    path: `${PATH.book.edit}/:bookId`,
    element: <BookForm />
  },
  {
    path: `${PATH.book.detail}/:bookId`,
    element: <BookDetail />
  }
];

export default bookRoutes;
