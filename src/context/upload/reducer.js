import { ACTIONS } from './action';

export const uploadState = {
  loading: false,
  error: false,
  success: false,
  errorMsg: '',
  userFileInput: null,
  fileDownloadURL: '',
  localGeneratedURL: '',
  showUploadButton: false
};

export default function uploadReducer(state, payload) {
  return {
    [ACTIONS.START_UPLOAD]: () => ({
      ...state,
      upload: {
        ...state.upload,
        loading: true,
        showUploadButton: false
      }
    }),
    [ACTIONS.UPLOAD_ERROR]: () => ({
      ...state,
      upload: {
        ...state.upload,
        loading: false,
        error: true,
        errorMsg: payload.errMsg
      }
    }),
    [ACTIONS.UPLOAD_SUCCESS]: () => ({
      ...state,
      upload: {
        ...state.upload,
        loading: false,
        success: true,
        userFileInput: null,
        fileDownloadURL: payload.url
      }
    }),
    [ACTIONS.SET_FILE]: () => ({
      ...state,
      upload: {
        error: false,
        success: false,
        userFileInput: payload.file,
        localGeneratedURL: payload.localURL || '',
        showUploadButton: true
      }
    })
  };
}
