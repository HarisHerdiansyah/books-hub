import { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Text, Grid, GridItem } from '@chakra-ui/react';
import { GlobalComponent, SearchComponent } from '../../components';
import { Context } from '../../constants';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const { state, action } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const { book } = state;
  const totalPage = Math.ceil(book.lists.total / 10);

  const handlePrevPage = () => {
    setCurrentPage((page) => page - 1);
    action.handlePaginateDataDispatcher({
      direction: 'prev',
      cursor: book.lists.firstDoc,
      searchInput: searchParams.get('q')
    });
  };

  const handleNextPage = () => {
    setCurrentPage((page) => page + 1);
    action.handlePaginateDataDispatcher({
      direction: 'next',
      cursor: book.lists.lastDoc,
      searchInput: searchParams.get('q')
    });
  };

  useEffect(() => {
    action.searchBookDispatcher(searchParams.get('q'));
  }, [searchParams, action]);

  return (
    <Container maxW={1000}>
      <Text fontSize='2xl' my={6}>
        Hasil pencarian untuk {searchParams.get('q')}
      </Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} my={6}>
        {!state.isLoading &&
          book.lists.data.map((b) => (
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
                userId={b.userId}
              />
            </GridItem>
          ))}
      </Grid>
      <GlobalComponent.Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </Container>
  );
}
