import { Firestore } from '../service';
import ACTION from './constant';

export default function actionCreators(dispatch) {
  return {
    getBooksDispatcher: async (uid) => {
      try {
        const books = await Firestore.getBooks(uid);
        dispatch({ type: ACTION.SET_BOOKS, payload: { books } });
      } catch (error) {
        console.log('getBooksDispatcher', error);
      }
    },
    addBookDispatcher: async (payload, cb) => {
      try {
        await Firestore.addBook(payload);
        cb(true);
      } catch (error) {
        cb(false);
        console.log('addBookDispatcher', error);
      }
    },
    updateBookDispatcher: async (bookId, payload, cb) => {
      try {
        await Firestore.updateBook(bookId, payload);
        cb(true);
      } catch (error) {
        cb(false);
        console.log('updateBookDispatcher', error);
      }
    },
    deleteBookDispatcher: async (bookId, cb) => {
      try {
        await Firestore.deleteBook(bookId);
        cb(true);
      } catch (error) {
        cb(false);
        console.log('deleteBookDispatcher', error);
      }
    },
    setUserDispatcher: (payload) => {
      dispatch({ type: ACTION.LOAD_USER_DONE, payload });
    },
    selectBookDispatcher: (bookId) => {
      dispatch({ type: ACTION.SELECT_BOOK, payload: { bookId } });
    },
    resetSelectedBookDispatcher: () => {
      dispatch({ type: ACTION.RESET_SELECTED_BOOK });
    },
    updatePinnedBookDispatcher: async (payload, cb) => {
      try {
        await Firestore.updatePinnedBook(payload);
        cb(true);
      } catch (error) {
        cb(false);
        console.log('updatePinnedBookDispatcher', error);
      }
    }
  };
}
