import { useLocation } from 'react-router-dom';
import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { ProfileComponent } from '../../../components';
import { utils } from '../../../constants';

export default function Overview() {
  const { pathname } = useLocation();
  const isShowcase = pathname.includes('showcase');

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='normal' mb={6}>
        Disematkan
      </Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={8}>
        {utils.books.slice(0, 4).map((book) => (
          <GridItem w='100%' key={book.id}>
            <ProfileComponent.ListBookCard bookTitle={book.bookTitle} isShowcase={isShowcase} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
