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
        user: { ...payload },
        isLoadUser: false
      }
    }),
  };

  return REDUCER[action.type]();
}
