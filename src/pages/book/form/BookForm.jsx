import { useLocation, useNavigate } from 'react-router-dom';
import Rating from 'react-rating';
import {
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Grid,
  GridItem,
  Textarea,
  Select
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

export default function BookForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isEdit = pathname.includes('edit');
  const title = isEdit ? 'Perbarui Buku' : 'Tambah Buku';

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxW={900}>
      <Text fontSize='3xl' fontWeight='normal' my={6}>
        {title}
      </Text>
      <form>
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <GridItem>
            <FormControl isRequired>
              <FormLabel fontSize='xl' htmlFor='bookTitle'>
                Judul buku:
              </FormLabel>
              <Input autoComplete='off' type='text' id='bookTitle' />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel fontSize='xl' htmlFor='writer'>
                Penulis:
              </FormLabel>
              <Input autoComplete='off' type='text' id='writer' />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel fontSize='xl' htmlFor='yearPublished'>
                Tahun Terbit:
              </FormLabel>
              <Input autoComplete='off' type='number' id='yearPublished' />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel fontSize='xl' htmlFor='genre'>
                Genre:
              </FormLabel>
              <Select id='genre' placeholder='Cari genre'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
            </FormControl>
          </GridItem>
        </Grid>
        <Flex align='center' my={6} gap={6}>
          <Text fontSize='xl' fontWeight='semibold'>
            Rating:
          </Text>
          <Rating
            fractions={2}
            emptySymbol={
              <FontAwesomeIcon size='xl' color='red' icon={faStarReg} />
            }
            fullSymbol={
              <FontAwesomeIcon size='xl' color='red' icon={faStarSolid} />
            }
          />
        </Flex>
        <FormControl>
          <FormLabel fontSize='xl' htmlFor='description'>
            Deskripsi dan Review:
          </FormLabel>
          <Textarea id='description' />
        </FormControl>
        <Flex align='center' justify='space-between' mt={12}>
          <Button colorScheme='red' variant='outline' onClick={handleBack}>
            Batalkan
          </Button>
          <Button
            type='submit'
            colorScheme={isEdit ? 'yellow' : 'blue'}
            onClick={handleBack}
          >
            {title}
          </Button>
        </Flex>
      </form>
    </Container>
  );
}
