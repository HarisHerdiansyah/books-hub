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
  Stack,
  useToast
} from '@chakra-ui/react';
import { ProfileComponent, GlobalComponent } from '../../../components';
import { Context } from '../../../constants';

export default function Overview() {
  const MAX_PIN = 6;
  const toast = useToast();
  const { state, action } = useContext(Context);
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { book } = state;
  const pinnedBooks = book.lists.data.filter((book) => book.isPinned);
  const [dataPin, setDataPin] = useState({ lists: [], passedData: [] });

  const isShowcase = pathname.includes('showcase');

  const handleOpenModal = () => {
    setDataPin((pin) => ({
      ...pin,
      lists: book.lists.data.map(({ id, title, isPinned }) => ({
        id,
        title,
        isPinned
      }))
    }));
    onOpen();
  };

  const handleDataPin = (e) => {
    const { id, checked } = e.target;

    const { lists, passedData } = { ...dataPin };
    const listsIndex = lists.findIndex((book) => book.id === id);
    const passedDataIndex = passedData.findIndex((book) => book.id === id);

    lists[listsIndex].isPinned = checked;

    if (passedDataIndex === -1) {
      setDataPin((pin) => ({
        lists,
        passedData: [...pin.passedData, { id, isPinned: checked }]
      }));
      return;
    }

    passedData[passedDataIndex].isPinned = checked;
    setDataPin({ lists, passedData });
    return;
  };

  const handleUpdatePinnedBooks = () => {
    action.updatePinnedBookDispatcher(dataPin.passedData, (success, data) => {
      toast(data);
      if (success) onClose();
    });
  };

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='normal' mb={6}>
        Disematkan
      </Text>
      {!isShowcase && (
        <Button colorScheme='purple' onClick={handleOpenModal}>
          Sematkan Buku
        </Button>
      )}
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
            {dataPin.lists.map((book) => (
              <GlobalComponent.Form
                onChange={handleDataPin}
                defaultChecked={book.isPinned}
                type='checkbox'
                label={book.title}
                id={book.id}
                key={book.id}
                colorScheme='purple'
                disabled={
                  dataPin.lists.filter((pin) => pin.isPinned).length ===
                    MAX_PIN && !book.isPinned
                }
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
                isShowcase={isShowcase}
                {...book}
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
