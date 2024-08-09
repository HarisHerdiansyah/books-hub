import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Context, PATH, utils } from '../../../constants';
import {
  Button,
  Flex,
  Box,
  Text,
  Grid,
  GridItem,
  FormLabel,
  Select
} from '@chakra-ui/react';
import { GlobalComponent, ProfileComponent } from '../../../components';

export default function ListBook() {
  const [filter, setFilter] = useState(utils.listBookDropdownValue.all);
  const [currentPage, setCurrentPage] = useState(1);
  const { state, action } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { book } = state;
  const isShowcase = pathname.includes('showcase');
  const totalPage = Math.ceil(book.lists.total / 6);

  const handleAddNavigate = () => navigate(PATH.book.add);

  const handleFilter = (e) => setFilter(e.target.value);

  const handlePrevPage = () => {
    setCurrentPage((page) => page - 1);
    action.handlePaginateDataDispatcher({
      isShowcase,
      direction: 'prev',
      cursor: book.lists.firstDoc
    });
  };

  const handleNextPage = () => {
    setCurrentPage((page) => page + 1);
    action.handlePaginateDataDispatcher({
      isShowcase,
      direction: 'next',
      cursor: book.lists.lastDoc
    });
  };

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='normal' mb={6}>
        Daftar Buku
      </Text>
      {!isShowcase && (
        <Flex align='center' justify='space-between'>
          <Button colorScheme='blue' onClick={handleAddNavigate}>
            Tambah Buku
          </Button>
          <Flex align='flex-end'>
            <FormLabel fontSize='xl' htmlFor='filter'>
              Filter:
            </FormLabel>
            <Select
              id='filter'
              onChange={handleFilter}
              value={filter}
              disabled={book.lists.length === 0}
            >
              {utils.listBookDropdown.map((list) => (
                <option value={list.value} key={list.label}>
                  {list.label}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
      )}
      {book.lists.data.length > 0 ? (
        <Grid templateColumns='repeat(2, 1fr)' gap={8} my={8}>
          {book.lists.data
            .filter((book) => {
              const { done, progress, wishlist, favourite, isPublic } =
                utils.listBookDropdownValue;
              if (filter === done) return book.isDone;
              if (filter === progress) return !book.isDone;
              if (filter === wishlist) return book.isWishlist;
              if (filter === favourite) return book.isFavourite;
              if (filter === isPublic) return book.isPublic;
              return book;
            })
            .map((book) => (
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
          <Text fontSize='xl'>-- Daftar buku kosong --</Text>
        </Flex>
      )}
      <GlobalComponent.Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </Box>
  );
}
