import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Rating from 'react-rating';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import {
  Container,
  Text,
  Flex,
  Button,
  Grid,
  useToast
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { GlobalComponent } from '../../../components';
import { utils, Context, functions } from '../../../constants';

export default function BookForm() {
  const toast = useToast();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { state, action } = useContext(Context);
  const { user, book } = state;
  const [initialBook, setInitialBook] = useState(book.selectedBook);
  const [visibility, setVisibility] = useState(
    initialBook.isPublic ? 'Publik' : 'Privat'
  );
  const [rating, setRating] = useState(initialBook.rating);

  const { username } = JSON.parse(window.sessionStorage.getItem('userData'));
  const isEdit = pathname.includes('edit');
  const currentAction = isEdit ? 'Perbarui Buku' : 'Tambah Buku';
  const ratingIcon = {
    empty: <FontAwesomeIcon size='xl' color='#ebeb05' icon={faStarReg} />,
    full: <FontAwesomeIcon size='xl' color='#ebeb05' icon={faStarSolid} />
  };
  const dropdownCategory = utils.bookCategoryDropdown.map((cat) => ({
    value: cat,
    label: cat
  }));

  const handleBack = () => {
    action.resetSelectedBookDispatcher();
    navigate(-1);
  };

  const handleFormControl = (e) => {
    setInitialBook((b) => {
      if (e.target.type === 'checkbox') {
        return {
          ...b,
          [e.target.id]: e.target.checked
        };
      }

      if (e.target.type === 'number') {
        return {
          ...b,
          [e.target.id]: parseInt(e.target.value)
        };
      }

      return {
        ...b,
        [e.target.id]: e.target.value
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataBook = {};

    if (!isEdit) {
      const { title, writer } = initialBook;
      const keywords = functions.keywordBuilder({
        title,
        writer,
        username
      });
      dataBook = {
        ...initialBook,
        id: uuid(),
        createdAt: DateTime.utc().toISO(),
        isPublic: visibility === 'Publik',
        userId: user.authState.uid,
        searchKeywords: keywords
      };
      action.addBookDispatcher(dataBook, (data) => {
        toast(data);
        handleBack();
      });
      return;
    }

    dataBook = {
      ...initialBook,
      updatedAt: DateTime.utc().toISO(),
      isPublic: visibility === 'Publik',
      rating
    };
    action.updateBookDispatcher(dataBook, 'update', (data) => {
      toast(data);
      handleBack();
    });
    return;
  };

  return (
    <Container maxW={900}>
      <Text fontSize='3xl' fontWeight='normal' my={6}>
        {currentAction}
      </Text>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <GlobalComponent.GridForm
            onChange={handleFormControl}
            type='text'
            label='Judul buku'
            id='title'
            value={initialBook.title}
            isRequired
          />
          <GlobalComponent.GridForm
            onChange={handleFormControl}
            type='text'
            label='Penulis'
            id='writer'
            value={initialBook.writer}
            isRequired
          />
          <GlobalComponent.GridForm
            onChange={handleFormControl}
            type='number'
            label='Tahun terbit'
            id='yearPublished'
            value={initialBook.yearPublished.toString()}
            isRequired
          />
          <GlobalComponent.GridForm
            placeholder='-- Pilih Kategori --'
            onChange={handleFormControl}
            type='select'
            label='Kategori'
            id='category'
            value={initialBook.category}
            optData={dropdownCategory}
            isRequired
          />
          <GlobalComponent.GridForm
            onChange={setVisibility}
            type='radio-group'
            id='isPublic'
            value={visibility}
            stackDirection='column'
            optData={[
              { value: 'Privat', label: 'Privat' },
              { value: 'Publik', label: 'Publik' }
            ]}
          />
          {!isEdit && (
            <GlobalComponent.GridForm
              onChange={handleFormControl}
              type='checkbox'
              label='Tambah ke wishlist'
              id='isWishlist'
            />
          )}
        </Grid>
        {isEdit && initialBook.isDone ? (
          <>
            <Flex align='center' my={6} gap={6}>
              <Text fontSize='xl' fontWeight='semibold'>
                Rating:
              </Text>
              <Rating
                onChange={setRating}
                fractions={2}
                initialRating={rating}
                emptySymbol={ratingIcon.empty}
                fullSymbol={ratingIcon.full}
              />
            </Flex>
            <GlobalComponent.Form
              onChange={handleFormControl}
              type='textarea'
              id='descAndReview'
              label='Deskripsi dan Review'
              value={initialBook.descAndReview}
              currentCountChar={initialBook.descAndReview.length}
              limitChar={300}
            />
          </>
        ) : null}
        <Flex align='center' justify='space-between' my={12}>
          <Button colorScheme='red' variant='outline' onClick={handleBack}>
            Batalkan
          </Button>
          <Button type='submit' colorScheme={isEdit ? 'yellow' : 'blue'}>
            {currentAction}
          </Button>
        </Flex>
      </form>
    </Container>
  );
}
