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
        user: payload.authUser,
        isLoadUser: false
      },
      userData: payload.userSnapshot
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
    }),
    [ACTION.SET_USER_DATA]: () => ({
      ...state,
      userData: payload
    })
  };

  return REDUCER[action.type]();
}
