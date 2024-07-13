import { useContext } from 'react';
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
  ModalFooter
} from '@chakra-ui/react';
import { ProfileComponent, GlobalComponent } from '../../../components';
import { Context } from '../../../constants';

export default function Overview() {
  const { state } = useContext(Context);
  const { books } = state;
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isShowcase = pathname.includes('showcase');
  const pinnedBooks = books.filter((book) => book.isPinned === true);

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
          {books.map((book) => (
            <Text key={book.id}>{book.title}</Text>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='purple'>Simpan</Button>
        </ModalFooter>
      </GlobalComponent.Modal>
      {pinnedBooks.length > 0 ? (
        <Grid templateColumns='repeat(2, 1fr)' gap={8}>
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
