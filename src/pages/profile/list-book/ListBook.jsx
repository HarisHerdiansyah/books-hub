import { useNavigate } from 'react-router-dom';
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
import { ListBookCard } from '../../../components/profile';

export default function ListBook() {
  const navigate = useNavigate();

  const handleAddNavigate = () => navigate('/book/add');

  return (
    <Box w='100%'>
      <Text fontSize='3xl' fontWeight='normal' mb={6}>
        Daftar Buku
      </Text>
      <Flex align='center' justify='space-between'>
        <Button colorScheme='blue' onClick={handleAddNavigate}>
          Tambah Buku
        </Button>
        <Flex align='flex-end'>
          <FormLabel fontSize='xl' htmlFor='filter'>
            Filter:
          </FormLabel>
          <Select placeholder='Select option'>
            <option value='option1'>Selesai dibaca</option>
            <option value='option2'>Belum selesai dibaca</option>
            <option value='option3'>Wishlist</option>
            <option value='option3'>Favorit</option>
            <option value='option3'>Publik</option>
          </Select>
        </Flex>
      </Flex>
      <Grid templateColumns='repeat(2, 1fr)' gap={8} my={8}>
        <GridItem>
          <ListBookCard />
        </GridItem>
        <GridItem>
          <ListBookCard />
        </GridItem>
        <GridItem>
          <ListBookCard />
        </GridItem>
        <GridItem>
          <ListBookCard />
        </GridItem>
      </Grid>
    </Box>
  );
}
