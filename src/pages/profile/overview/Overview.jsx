import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { FavBookCard } from '../../../components/profile';
import { books } from '../../../constants';

export default function Overview() {
  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='normal' mb={6}>
        Daftar Favorit
      </Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={8}>
        {books.slice(0, 4).map((book) => (
          <GridItem w='100%' key={book.id}>
            <FavBookCard bookTitle={book.bookTitle} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
