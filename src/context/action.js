import { Firestore, Auth, Storage } from '../service';
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
    setUserDispatcher: async (authUser) => {
      try {
        const userSnapshot = authUser
          ? await Firestore.getUserData(authUser.uid)
          : {};
        dispatch({
          type: ACTION.LOAD_USER_DONE,
          payload: { authUser, userSnapshot }
        });
      } catch (error) {
        console.log('setUserDispatcher', error);
      }
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
    },
    loginDispatcher: async (payload, cb) => {
      try {
        const userSnapshot = await Auth.login(payload);
        const firstLogin = userSnapshot?.firstLogin;
        dispatch({ type: ACTION.SET_USER_DATA, payload: userSnapshot });
        cb(firstLogin);
      } catch (error) {
        console.log('loginDispatcher', error);
      }
    },
    registerDispatcher: async (payload, cb) => {
      try {
        await Auth.register(payload);
        cb(true);
      } catch (error) {
        cb(false);
        console.log('registerDispatcher', error);
      }
    },
    logoutDispatcher: async () => await Auth.logout(),
    uploadFileDispatcher: async (payload, cb) => {
      const { file, uid } = payload;
      try {
        const fileURL = await Storage.uploadFile(file, uid);
        cb(true, fileURL);
      } catch (error) {
        cb(false);
        console.log('uploadFileDispatcher', error);
      }
    },
    updateUserDataDispatcher: async (uid, payload, cb) => {
      try {
        await Firestore.updateUserData(uid, payload);
        dispatch({ type: ACTION.SET_USER_DATA, payload });
        cb(true);
      } catch (error) {
        cb(false);
        console.log('updateUserDataDispatcher', error);
      }
    }
  };
}
