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
        cb();
      } catch (error) {
        console.log('addBookDispatcher', error);
      }
    },
    updateBookDispatcher: async (payload) =>
      await Firestore.updateBook(payload),
    deleteBookDispatcher: async (payload) =>
      await Firestore.deleteBook(payload),
    setUserDispatcher: (payload) =>
      dispatch({ type: ACTION.LOAD_USER_DONE, payload })
  };
}
