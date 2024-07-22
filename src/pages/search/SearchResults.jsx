import { Container, Text, Grid, GridItem } from '@chakra-ui/react';
import { SearchComponent } from '../../components';

export default function SearchResults() {
  return (
    <Container maxW={1000}>
      <Text fontSize='3xl' my={6}>
        Hasil Pencarian : Negeri 5 Menara
      </Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} my={6}>
        <GridItem>
          <SearchComponent.ResultCard />
        </GridItem>
      </Grid>
    </Container>
  );
}
