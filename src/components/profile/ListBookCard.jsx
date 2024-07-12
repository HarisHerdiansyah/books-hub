import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { PATH, Context } from '../../constants';
import {
  Badge,
  Card,
  Flex,
  Text,
  Button,
  ButtonGroup,
  IconButton
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faCheck,
  faStar
} from '@fortawesome/free-solid-svg-icons';

export default function ListBookCard({
  id,
  isShowcase,
  title,
  isPublic,
  isDone,
  category,
  writer,
  yearPublished,
  isFavourite
}) {
  const navigate = useNavigate();
  const { action } = useContext(Context);

  const handleEditNavigate = () => {
    action.selectBookDispatcher(id);
    navigate(`${PATH.book.edit}/${id}`);
  };

  const handleDeleteAction = () => action.deleteBookDispatcher(id);

  const handleMarkDoneAction = () =>
    action.updateBookDispatcher(id, { isDone: true });

  return (
    <Card w='100%' variant='outline' py={4} px={5}>
      <Flex align='center' justify='space-between' mb={4}>
        <Flex align='center' justify='flex-start' gap={2}>
          {isFavourite && (
            <FontAwesomeIcon color='#ebeb05' fontSize={18} icon={faStar} />
          )}
          <Text
            noOfLines={1}
            color='#392467'
            fontSize='xl'
            fontWeight='semibold'
            _hover={{ textDecoration: 'underline' }}
          >
            <Link to='/book/detail'>{title}</Link>
          </Text>
        </Flex>
        <Badge colorScheme={isPublic ? 'blue' : 'gray'}>
          {isPublic ? 'Publik' : 'Privat'}
        </Badge>
      </Flex>
      <Text>Kategori: {category || '-'}</Text>
      <Text>Penulis: {writer}</Text>
      <Text>Tahun: {yearPublished}</Text>
      {!isShowcase && (
        <Flex align='center' justify='space-between' mt={6}>
          <Button colorScheme='red' variant='link' onClick={handleDeleteAction}>
            Hapus buku
          </Button>
          <ButtonGroup>
            <IconButton
              size='lg'
              colorScheme='yellow'
              icon={<FontAwesomeIcon icon={faPencilAlt} />}
              onClick={handleEditNavigate}
            />
            {!isDone && (
              <IconButton
                size='lg'
                colorScheme='green'
                icon={<FontAwesomeIcon icon={faCheck} />}
                onClick={handleMarkDoneAction}
              />
            )}
          </ButtonGroup>
        </Flex>
      )}
    </Card>
  );
}

ListBookCard.propTypes = {
  id: PropTypes.string.isRequired,
  isShowcase: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  writer: PropTypes.string.isRequired,
  yearPublished: PropTypes.number.isRequired,
  isFavourite: PropTypes.bool.isRequired
};
