import { Firestore } from '../service';
import ACTION from './constant';

export default function actionCreators(dispatch) {
  return {
    getBooksDispatcher: async () => {
      try {
        const books = await Firestore.getBooks();
        dispatch({ type: ACTION.GET_BOOKS, payload: { books } });
      } catch (error) {
        console.log('getBooksDispatcher', error);
      }
    },
    addBookDispatcher: async (payload) => await Firestore.addBook(payload),
    updateBookDispatcher: async (payload) =>
      await Firestore.updateBook(payload),
    deleteBookDispatcher: async (payload) =>
      await Firestore.deleteBook(payload),
    setUserDispatcher: (payload) =>
      dispatch({ type: ACTION.LOAD_USER_DONE, payload })
  };
}
