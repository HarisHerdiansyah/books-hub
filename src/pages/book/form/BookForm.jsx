import { useLocation, useNavigate } from 'react-router-dom';
import Rating from 'react-rating';
import { Container, Text, Flex, Button, Grid } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { GridForm, Form } from '../../../components/global';

export default function BookForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isEdit = pathname.includes('edit');
  const title = isEdit ? 'Perbarui Buku' : 'Tambah Buku';
  const ratingIcon = {
    empty: <FontAwesomeIcon size='xl' color='red' icon={faStarReg} />,
    full: <FontAwesomeIcon size='xl' color='red' icon={faStarSolid} />
  };

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
          <GridForm type='text' label='Judul buku' id='bookTitle' isRequired />
          <GridForm type='text' label='Penulis' id='writer' isRequired />
          <GridForm
            type='number'
            label='Tahun terbit'
            id='yearPublished'
            isRequired
          />
          <GridForm
            type='select'
            label='Genre'
            id='genre'
            optData={[
              { value: 'Genre 1', label: 'Genre 1' },
              { value: 'Genre 2', label: 'Genre 2' }
            ]}
            isRequired
          />
        </Grid>
        <Flex align='center' my={6} gap={6}>
          <Text fontSize='xl' fontWeight='semibold'>
            Rating:
          </Text>
          <Rating
            fractions={2}
            emptySymbol={ratingIcon.empty}
            fullSymbol={ratingIcon.full}
          />
        </Flex>
        <Form type='textarea' id='descAndReview' label='Deskripsi dan Review' />
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
