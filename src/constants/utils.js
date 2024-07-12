import PATH from './routes';

export const profileNavLink = [
  {
    id: '/profile/overview-Overview',
    text: 'Beranda',
    path: PATH.profile.overview
  },
  {
    id: '/profile/list-book-Books',
    text: 'Buku',
    path: PATH.profile.books
  },
  {
    id: '/profile/settings-Settings',
    text: 'Pengaturan',
    path: PATH.profile.settings
  }
];

export const showcaseNavLink = [
  {
    id: '/showcase/overview-Overview',
    text: 'Beranda',
    path: PATH.showcase.overview
  },
  {
    id: '/showcase/list-book-Books',
    text: 'Buku',
    path: PATH.showcase.books
  }
];

export const listBookDropdownValue = {
  all: 'all',
  done: 'done',
  progress: 'progress',
  wishlist: 'wishlist',
  favourite: 'favourite',
  isPublic: 'public'
};

export const listBookDropdown = [
  {
    value: listBookDropdownValue.all,
    label: 'Semua',
    default: true
  },
  {
    value: listBookDropdownValue.done,
    label: 'Selesai dibaca'
  },
  {
    value: listBookDropdownValue.progress,
    label: 'Belum selesai dibaca'
  },
  {
    value: listBookDropdownValue.wishlist,
    label: 'Wishlist'
  },
  {
    value: listBookDropdownValue.favourite,
    label: 'Favorit'
  },
  {
    value: listBookDropdownValue.isPublic,
    label: 'Publik'
  }
];

export const keyWording = {
  bookTitle: 'Judul Buku',
  writer: 'Penulis',
  yearPublished: 'Tahun Terbit',
  rating: 'Rating',
  genre: 'Genre',
  descAndReview: 'Deskripsi dan Review'
};

export const bookDetailMock = {
  bookTitle: 'Filosofi Teras',
  writer: 'Henry Manampiring',
  yearPublished: '2020',
  rating: '4.5',
  genre: 'Personal Development',
  descAndReview:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam itaque impedit quasi! Iure accusantium tenetur voluptates dicta sequi? Quis provident assumenda atque fuga facilis dicta vel, perferendis odio ullam temporibus nemo cupiditate tempora nulla consectetur quidem ad recusandae fugit autem iusto molestiae nesciunt sequi. Possimus aspernatur facilis provident dolorum culpa.'
};

export const bookCategoryDropdown = [
  'Novel & Komik',
  'Cerita Fiksi',
  'Seni',
  'Sosial & Budaya',
  'Politik & Hukum',
  'Agama',
  'Saintek',
  'Psikologi & Pengembangan Diri',
  'Aset & Keuangan',
  'Buku Panduan & Pembelajaran'
];
