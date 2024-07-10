import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../constants';
import { Card, Text, Flex, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default function FavBookCard({ bookTitle, isShowcase }) {
  const navigate = useNavigate();

  const handleEditNavigate = () => navigate(PATH.book.edit);

  return (
    <Card variant='outline' py={4} px={5}>
      <Flex align='center' justify='space-between'>
        <Link to='/book/detail'>
          <Button
            fontSize={22}
            fontWeight='semibold'
            color='#392467'
            mb={4}
            variant='link'
          >
            {bookTitle}
          </Button>
        </Link>
        <FontAwesomeIcon icon={faStar} color='red' />
      </Flex>
      <Text>Publik: Ya/Tidak</Text>
      <Text>Rating: 4.5/5</Text>
      {!isShowcase && (
        <Flex justify='space-between' mt={6}>
          <Button colorScheme='red' variant='link'>
            Hapus dari favorit
          </Button>
          <Button
            colorScheme='yellow'
            leftIcon={<FontAwesomeIcon icon={faPencilAlt} />}
            onClick={handleEditNavigate}
          >
            Edit
          </Button>
        </Flex>
      )}
    </Card>
  );
}

FavBookCard.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  isShowcase: PropTypes.bool
};
