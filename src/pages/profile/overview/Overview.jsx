import { Box, Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

export default function Overview() {
  return (
    <Flex my={8} gap={8}>
      <Box w={350}>
        <Card variant='outline' py={4} w={350}>
          <Box
            w={225}
            h={225}
            border={'1px solid black'}
            m='auto'
            borderRadius={150}
          ></Box>
          <CardHeader>
            <Text fontSize='3xl' fontWeight='semibold' color='#392467'>
              Maya Astuti
            </Text>
            <Text fontSize='2xl'>@mayaa</Text>
          </CardHeader>
          <CardBody>
            <Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
              fuga, velit atque earum consequatur veritatis! At ullam aperiam
              alias asperiores, nostrum culpa quos. Porro aut, voluptates magni
              at nam minus.
            </Text>
          </CardBody>
        </Card>
      </Box>
      <Box w='100%'>
        <Text fontSize='3xl' fontWeight='normal' mb={6}>Favorited books :</Text>
        <Grid templateColumns='repeat(2, 1fr)' gap={8}>
          <GridItem w='100%'>
            <Card variant='outline'>
              <CardBody>
                <Text fontSize={22} fontWeight='normal'>Judul Buku</Text>
                <Text my={2}>Tahun Terbit: 2024</Text>
                <Text my={2}>Author: John Doe</Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem w='100%'>
            <Card variant='outline'>
              <CardBody>
                <Text fontSize={22} fontWeight='normal'>Judul Buku</Text>
                <Text my={2}>Tahun Terbit: 2024</Text>
                <Text my={2}>Author: John Doe</Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem w='100%'>
            <Card variant='outline'>
              <CardBody>
                <Text fontSize={22} fontWeight='normal'>Judul Buku</Text>
                <Text my={2}>Tahun Terbit: 2024</Text>
                <Text my={2}>Author: John Doe</Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem w='100%'>
            <Card variant='outline'>
              <CardBody>
                <Text fontSize={22} fontWeight='normal'>Judul Buku</Text>
                <Text my={2}>Tahun Terbit: 2024</Text>
                <Text my={2}>Author: John Doe</Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}
