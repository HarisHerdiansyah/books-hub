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
import { ProfileComponent } from '../../../components';

export default function ListBook() {
  const [filter, setFilter] = useState(utils.listBookDropdownValue.all);
  const { state } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { books } = state;
  const isShowcase = pathname.includes('showcase');

  const handleAddNavigate = () => navigate(PATH.book.add);

  const handleFilter = (e) => setFilter(e.target.value);

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
            <Select id='filter' onChange={handleFilter} value={filter}>
              {utils.listBookDropdown.map((list) => (
                <option value={list.value} key={list.label}>
                  {list.label}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
      )}
      <Grid templateColumns='repeat(2, 1fr)' gap={8} my={8}>
        {books
          .filter((book) => {
            const { done, progress, wishlist, favourite, isPublic } =
              utils.listBookDropdownValue;
            if (filter === done) return book.isDone === true;
            if (filter === progress) return book.isDone === false;
            if (filter === wishlist) return book.isWishlist === true;
            if (filter === favourite) return book.isFavourite === true;
            if (filter === isPublic) return book.isPublic === true;
            return book;
          })
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
