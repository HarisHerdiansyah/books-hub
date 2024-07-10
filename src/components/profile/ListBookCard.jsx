import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../constants';
import { Card, Flex, Text, Button, ButtonGroup } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck, faStar } from '@fortawesome/free-solid-svg-icons';

export default function ListBookCard({ isShowcase }) {
  const navigate = useNavigate();

  const handleEditNavigate = () => navigate(PATH.book.edit);

  return (
    <Card w='100%' variant='outline' py={4} px={5}>
      {/* <CardBody> */}
      <Flex align='center' justify='space-between' mb={4}>
        <Flex align='center' justify='flex-start' gap={2}>
          <FontAwesomeIcon color='#ebeb05' fontSize={18} icon={faStar} />
          <Link to='/book/detail'>
            <Button
              fontSize={22}
              fontWeight='semibold'
              color='#392467'
              variant='link'
            >
              Negeri 5 Menara
            </Button>
          </Link>
        </Flex>
        <Text fontWeight='semibold' textDecoration='underline'>
          Publik
        </Text>
      </Flex>
      <Text>Kategori: Novel</Text>
      <Text>Author: Ahmad Fuadi</Text>
      <Text>Tahun: 2020</Text>
      {/* </CardBody> */}
      {!isShowcase && (
        <Flex align='center' justify='space-between' mt={6}>
          <Button colorScheme='red' variant='link'>
            Hapus buku
          </Button>
          <ButtonGroup>
            <Button
              colorScheme='yellow'
              leftIcon={<FontAwesomeIcon icon={faPencilAlt} />}
              onClick={handleEditNavigate}
            >
              Edit
            </Button>
            <Button
              colorScheme='green'
              leftIcon={<FontAwesomeIcon icon={faCheck} />}
            >
              Selesai
            </Button>
          </ButtonGroup>
        </Flex>
      )}
    </Card>
  );
}

ListBookCard.propTypes = {
  isShowcase: PropTypes.bool
};
