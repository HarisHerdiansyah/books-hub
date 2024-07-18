import { userState } from './user/reducer';
import { bookState } from './book/reducer';

export default {
  isLoading: false,
  user: userState,
  book: bookState
};
