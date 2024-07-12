import { bookObjectDefault } from './state';
import ACTION from './constant';

export default function reducer(state, action) {
  const { payload } = action;
  const REDUCER = {
    [ACTION.SET_BOOKS]: () => ({
      ...state,
      books: payload.books
    }),
    [ACTION.LOAD_USER_DONE]: () => ({
      ...state,
      auth: {
        user: payload,
        isLoadUser: false
      }
    }),
    [ACTION.SELECT_BOOK]: () => {
      const selectedBook = state.books.find(
        (book) => book.id === payload.bookId
      );
      return {
        ...state,
        selectedBook
      };
    },
    [ACTION.RESET_SELECTED_BOOK]: () => ({
      ...state,
      selectedBook: bookObjectDefault
    })
  };

  return REDUCER[action.type]();
}
