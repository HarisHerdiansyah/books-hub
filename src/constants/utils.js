import { PATH } from './routes';

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

export const listBookDropdown = [
  {
    value: 'done',
    label: 'Selesai dibaca'
  },
  {
    value: 'progress',
    label: 'Belum selesai dibaca'
  },
  {
    value: 'wishlist',
    label: 'Wishlist'
  },
  {
    value: 'favs',
    label: 'Favorit'
  },
  {
    value: 'public',
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

export const books = [
  {
    id: '420dfee5-68fb-4712-a93f-07bfd8c4f224',
    bookTitle: 'Senior Group Architect',
    writer: 'Ted Flatley',
    yearPublished: '2024',
    isDone: true
  },
  {
    id: 'd1ecbcae-013e-4f63-bbc3-1137a2555150',
    bookTitle: 'Lead Program Analyst',
    writer: 'Daisy Klein',
    yearPublished: '2024',
    isDone: false
  },
  {
    id: '2dbc1c08-3d96-4bca-a480-0796a44cab51',
    bookTitle: 'Product Tactics Supervisor',
    writer: 'Hubert Jacobson',
    yearPublished: '2024',
    isDone: false
  },
  {
    id: '6ada5e96-5f60-4a77-98cf-e13f3983d64c',
    bookTitle: 'Product Accountability Analyst',
    writer: 'Curtis Fisher',
    yearPublished: '2024',
    isDone: true
  },
  {
    id: 'd147eecc-20a0-45d9-9d71-e2231e29c28e',
    bookTitle: 'Human Interactions Supervisor',
    writer: 'Brandy Cruickshank',
    yearPublished: '2023',
    isDone: true
  },
  {
    id: '019ddcab-0929-4aef-8295-a28d5c8fd013',
    bookTitle: 'National Division Assistant',
    writer: 'Ronnie Effertz',
    yearPublished: '2023',
    isDone: false
  },
  {
    id: '9955a362-577d-49e4-b972-df6f12606a27',
    bookTitle: 'Internal Response Producer',
    writer: 'Marc Windler',
    yearPublished: '2024',
    isDone: true
  },
  {
    id: '6f71d990-3f3c-4913-b474-873c0e894c68',
    bookTitle: 'International Data Agent',
    writer: 'Marlene Huels',
    yearPublished: '2024',
    isDone: false
  },
  {
    id: '9f83378f-135b-40c3-aee6-4482ee5f2fda',
    bookTitle: 'Regional Mobility Director',
    writer: 'Audrey Welch',
    yearPublished: '2024',
    isDone: true
  },
  {
    id: 'd0082ae8-a3e0-4b72-b74c-8741a33053ce',
    bookTitle: 'Investor Program Developer',
    writer: 'Louise Hane-Mayer',
    yearPublished: '2023',
    isDone: true
  }
];
