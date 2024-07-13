import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Button,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Stack
} from '@chakra-ui/react';
import { ProfileComponent, GlobalComponent } from '../../../components';
import { Context } from '../../../constants';

export default function Overview() {
  const { state } = useContext(Context);
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { books } = state;
  const pinnedBooks = books.filter((book) => book.isPinned);
  const [dataPin, setDataPin] = useState(
    pinnedBooks.map((b) => ({ id: b.id, isPinned: b.isPinned }))
  ); // pass for batch update

  const isShowcase = pathname.includes('showcase');

  const handleDataPin = (e) => {
    if (dataPin.filter((data) => data.isPinned).length === 6) {
      console.log('tidak bisa menambahkan lagi buku');
      return;
    }

    const { id, checked } = e.target;
    const copyDataPin = [...dataPin];
    const bookIndex = copyDataPin.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      setDataPin((pinnedBook) => [...pinnedBook, { id, isPinned: checked }]);
      return;
    }

    copyDataPin[bookIndex].isPinned = checked;
    return;
  };

  const handleUpdatePinnedBooks = () => {
    console.log(dataPin);
  };

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='normal' mb={6}>
        Disematkan
      </Text>
      <Button colorScheme='purple' onClick={onOpen}>
        Sematkan Buku
      </Button>
      <GlobalComponent.Modal
        title='Sematkan Buku'
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        closeBtn
      >
        <ModalBody>
          <Text>Kamu hanya dapat menyematkan maksimal 6 buku.</Text>
          <Stack my={6}>
            {books.map((book) => (
              <GlobalComponent.Form
                onChange={handleDataPin}
                defaultChecked={book.isPinned}
                type='checkbox'
                label={book.title}
                id={book.id}
                key={book.id}
                colorScheme='purple'
              />
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='purple' onClick={handleUpdatePinnedBooks}>
            Simpan
          </Button>
        </ModalFooter>
      </GlobalComponent.Modal>
      {pinnedBooks.length > 0 ? (
        <Grid templateColumns='repeat(2, 1fr)' gap={8} my={8}>
          {pinnedBooks.map((book) => (
            <GridItem w='100%' key={book.id}>
              <ProfileComponent.ListBookCard
                id={book.id}
                title={book.title}
                isPublic={book.isPublic}
                isDone={book.isDone}
                category={book.category}
                writer={book.writer}
                yearPublished={book.yearPublished}
                isFavourite={book.isFavourite}
                isShowcase={isShowcase}
              />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Flex justify='center' mt={12}>
          <Text fontSize='2xl'>-- Tidak ada buku yang disematkan --</Text>
        </Flex>
      )}
    </Box>
  );
}
