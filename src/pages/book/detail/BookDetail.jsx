import { Box, Container, Text, Flex } from '@chakra-ui/react';

export default function BookDetail() {
  return (
    <Container maxW={900}>
      <Text fontSize='3xl' fontWeight='normal' my={6}>
        Detail Buku
      </Text>
      <Box fontSize={20}>
        <Flex my={3}>
          <Text fontWeight='semibold'>Judul:&nbsp;</Text>
          <Text>Negeri 5 Menara</Text>
        </Flex>
        <Flex my={3}>
          <Text fontWeight='semibold'>Penulis:&nbsp;</Text>
          <Text>Ahmad Fuadi</Text>
        </Flex>
        <Flex my={3}>
          <Text fontWeight='semibold'>Tahun Terbit:&nbsp;</Text>
          <Text>2013</Text>
        </Flex>
        <Flex my={3}>
          <Text fontWeight='semibold'>Genre:&nbsp;</Text>
          <Text>-</Text>
        </Flex>
        <Flex my={3}>
          <Text fontWeight='semibold'>Rating:&nbsp;</Text>
          <Text>-</Text>
        </Flex>
        <Box my={3}>
          <Text fontWeight='semibold' mb={3}>
            Deskripsi:
          </Text>
          <Text fontSize={18} align='justify'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            itaque impedit quasi! Iure accusantium tenetur voluptates dicta
            sequi? Quis provident assumenda atque fuga facilis dicta vel,
            perferendis odio ullam temporibus nemo cupiditate tempora nulla
            consectetur quidem ad recusandae fugit autem iusto molestiae
            nesciunt sequi. Possimus aspernatur facilis provident dolorum culpa.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
