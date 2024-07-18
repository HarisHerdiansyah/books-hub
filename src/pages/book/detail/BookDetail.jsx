import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Text, Flex, Button } from '@chakra-ui/react';
import { utils, Context } from '../../../constants';

export default function BookDetail() {
  const { state } = useContext(Context);
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { book } = state;
  const bookDetail = book.lists.find((book) => book.id === bookId);

  const handleBack = () => navigate(-1);

  return (
    <Container maxW={900}>
      <Text fontSize='3xl' fontWeight='normal' my={6}>
        Detail Buku
      </Text>
      <Box fontSize={20}>
        {Object.entries(utils.bookDetailData).map((book) => {
          if (book[0] === 'descAndReview') {
            return (
              <Box my={3} key={book[0]}>
                <Text fontWeight='semibold' mb={3}>
                  {book[1]}:
                </Text>
                <Text fontSize={18} align='justify'>
                  {bookDetail[book[0]] || '-'}
                </Text>
              </Box>
            );
          }

          return (
            <Flex my={3} key={book[0]}>
              <Text fontWeight='semibold'>{book[1]}:&nbsp;</Text>
              <Text>{bookDetail[book[0]] || '-'}</Text>
            </Flex>
          );
        })}
      </Box>
      <Button mt={12} variant='outline' colorScheme='red' onClick={handleBack}>
        Kembali
      </Button>
    </Container>
  );
}
