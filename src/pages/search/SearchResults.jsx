import { useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Text, Grid, GridItem } from '@chakra-ui/react';
import { SearchComponent } from '../../components';
import { Context } from '../../constants';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const { state, action } = useContext(Context);
  const { user, book } = state;

  useEffect(() => {
    console.log(book.searchResults);
  }, [book.searchResults]);

  useEffect(() => {
    action.searchBookDispatcher(searchParams.get('q'), user.userData.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, user.userData.uid]);

  return (
    <Container maxW={1000}>
      <Text fontSize='2xl' my={6}>
        Hasil pencarian untuk {searchParams.get('q')}
      </Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} my={6}>
        {!state.isLoading &&
          book.searchResults.map((b) => (
            <GridItem key={b.id}>
              <SearchComponent.ResultCard
                id={b.id}
                username={b.username}
                title={b.title}
                updatedAt={b.updatedAt}
                views={b.views}
                category={b.category}
                writer={b.writer}
                yearPublished={b.yearPublished}
              />
            </GridItem>
          ))}
      </Grid>
    </Container>
  );
}
