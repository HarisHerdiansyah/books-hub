import { Box, Container, Text, Flex } from '@chakra-ui/react';
import { utils } from '../../../constants';

export default function BookDetail() {
  return (
    <Container maxW={900}>
      <Text fontSize='3xl' fontWeight='normal' my={6}>
        Detail Buku
      </Text>
      <Box fontSize={20}>
        {Object.entries(utils.bookDetailMock).map((book) => {
          if (book[0] === 'descAndReview') {
            return (
              <Box my={3} key={book[0]}>
                <Text fontWeight='semibold' mb={3}>
                  {utils.keyWording[book[0]]}:
                </Text>
                <Text fontSize={18} align='justify'>
                  {book[1]}
                </Text>
              </Box>
            );
          }

          return (
            <Flex my={3} key={book[0]}>
              <Text fontWeight='semibold'>{utils.keyWording[book[0]]}:&nbsp;</Text>
              <Text>{book[1]}</Text>
            </Flex>
          );
        })}
      </Box>
    </Container>
  );
}
