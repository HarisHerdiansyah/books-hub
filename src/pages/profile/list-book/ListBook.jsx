import { useNavigate, useLocation } from 'react-router-dom';
import { utils } from '../../../constants';
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isShowcase = pathname.includes('showcase');

  const handleAddNavigate = () => navigate('/book/add');

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
            <Select placeholder='Select option'>
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
        <GridItem>
          <ProfileComponent.ListBookCard isShowcase={isShowcase} />
        </GridItem>
        <GridItem>
          <ProfileComponent.ListBookCard isShowcase={isShowcase} />
        </GridItem>
        <GridItem>
          <ProfileComponent.ListBookCard isShowcase={isShowcase} />
        </GridItem>
        <GridItem>
          <ProfileComponent.ListBookCard isShowcase={isShowcase} />
        </GridItem>
      </Grid>
    </Box>
  );
}
