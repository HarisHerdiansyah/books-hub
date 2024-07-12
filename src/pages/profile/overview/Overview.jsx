import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { ProfileComponent } from '../../../components';
import { Context } from '../../../constants';

export default function Overview() {
  const { state } = useContext(Context);
  const { books } = state;
  const { pathname } = useLocation();
  const isShowcase = pathname.includes('showcase');

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='normal' mb={6}>
        Disematkan
      </Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={8}>
        {books
          .filter((book) => book.isPinned === true)
          .map((book) => (
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
    </Box>
  );
}
