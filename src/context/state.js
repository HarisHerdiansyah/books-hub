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

export default {
  auth: {
    user: null,
    isLoadUser: true
  },
  books: [],
  selectedBook: bookObjectDefault,
  searchResults: [],
  userData: {}
};
