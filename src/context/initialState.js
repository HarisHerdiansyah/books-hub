import { userState } from './user/reducer';
import { bookState } from './book/reducer';
import { uploadState } from './upload/reducer';

export default {
  isLoading: false,
  user: userState,
  book: bookState,
  upload: uploadState
};
