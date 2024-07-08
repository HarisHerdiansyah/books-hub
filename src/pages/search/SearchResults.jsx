import { Link } from 'react-router-dom';
import { PATH } from '../../constants/routes';
import {
  Button,
  Card,
  CardBody,
  Container,
  Text,
  Grid,
  GridItem
} from '@chakra-ui/react';

export default function SearchResults() {
  return (
    <Container maxW={900}>
      <Text fontSize='3xl' my={6}>
        Hasil Pencarian : Negeri 5 Menara
      </Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} my={6}>
        <GridItem>
          <Card variant='outline' w='100%'>
            <CardBody>
              <Link to={PATH.book.detail}>
                <Button colorScheme='blue' variant='link' fontSize='xl' my={2}>
                  @username/judul buku
                </Button>
              </Link>
              <Text my={2}>Tanggal publikasi: 24 Maret 2024</Text>
              <Text my={2}>Total kunjungan: 298 kali</Text>
              <Link to={PATH.showcase.overview}>
                <Button colorScheme='pink' variant='link'>
                  Lihat Profil
                </Button>
              </Link>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card variant='outline' w='100%'>
            <CardBody>
              <Button colorScheme='blue' variant='link' fontSize='xl' my={2}>
                @username/judul buku
              </Button>
              <Text my={2}>Tanggal publikasi: 24 Maret 2024</Text>
              <Text my={2}>Total kunjungan: 298 kali</Text>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
}
