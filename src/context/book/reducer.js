import { ACTIONS } from './action';

export const bookObjectDefault = {
  id: '',
  title: '',
  writer: '',
  yearPublished: 0,
  category: '',
  isDone: false,
  isPublic: false,
  isFavourite: false,
  isWishlist: false,
  isPinned: false,
  createdAt: '',
  updatedAt: '',
  userId: '',
  rating: 0,
  descAndReview: ''
};

export const bookState = {
  lists: [],
  selectedBook: bookObjectDefault,
  loadBook: false,
  error: {
    state: false,
    title: '',
    msg: ''
  }
};

export default function bookReducer(state, payload) {
  return {
    [ACTIONS.LOAD_BOOKS]: () => ({
      ...state,
      book: {
        ...state.book,
        loadBook: true,
        error: {
          state: false,
          title: '',
          msg: ''
        }
      }
    }),
    [ACTIONS.SET_BOOKS]: () => ({
      ...state,
      book: {
        ...state.book,
        loadBook: false,
        lists: payload
      }
    }),
    [ACTIONS.SELECT_BOOK]: () => {
      const selectedBook = state.book.lists.find((b) => b.id === payload);
      return {
        ...state,
        book: {
          ...state.book,
          selectedBook
        }
      };
    },
    [ACTIONS.RESET_SELECTED_BOOK]: () => ({
      ...state,
      book: {
        ...state.book,
        selectedBook: bookObjectDefault
      }
    }),
    [ACTIONS.LOAD_BOOKS_ERROR]: () => ({
      ...state,
      book: {
        ...state.book,
        error: {
          state: true,
          title: payload.title,
          msg: payload.msg
        }
      }
    }),
    [ACTIONS.WRITE_OR_DELETE_BOOK]: () => ({
      ...state,
      isLoading: payload
    })
  };
}
