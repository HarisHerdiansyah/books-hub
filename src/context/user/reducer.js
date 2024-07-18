import { ACTIONS } from './action';

export const userState = {
  authState: null,
  userData: null,
  error: {
    state: false,
    title: '',
    msg: ''
  },
  loadUser: true
};

export default function userReducer(state, payload) {
  return {
    [ACTIONS.LOAD_AUTH_PROCESS]: () => ({
      ...state,
      isLoading: payload,
      user: {
        ...state.user,
        error: {
          state: false,
          title: '',
          msg: ''
        }
      }
    }),
    [ACTIONS.IS_ERROR]: () => ({
      ...state,
      user: {
        ...state.user,
        error: {
          state: true,
          title: payload.title,
          msg: payload.msg
        }
      }
    }),
    [ACTIONS.STATE_CHANGED]: () => ({
      ...state,
      user: {
        ...state.user,
        loadUser: false,
        authState: payload.authState,
        userData: payload.userData
      }
    })
  };
}
