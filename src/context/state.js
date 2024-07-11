export const bookObjectDefault = {
  id: '',
  title: '',
  writer: '',
  yearPublished: 1970,
  category: '',
  isDone: false,
  isPublic: false,
  isFavourite: false,
  isWishlist: false,
  isPinned: false,
  createdAt: '',
  updatedAt: '',
  rating: 1.0,
  descAndReview: ''
};

export default {
  auth: {
    user: null,
    isLoadUser: true
  },
  books: [],
  selectedBook: bookObjectDefault,
  searchResults: []
};
