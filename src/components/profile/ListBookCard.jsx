import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { PATH, Context } from '../../constants';
import {
  Badge,
  Card,
  Flex,
  Text,
  ButtonGroup,
  IconButton,
  useToast,
  Button
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faCheck,
  faStar as faStarSolid,
  faTrash,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';

export default function ListBookCard({
  id,
  isShowcase,
  title,
  isPublic,
  isDone,
  category,
  writer,
  yearPublished,
  isFavourite,
  isWishlist
}) {
  const toast = useToast();
  const navigate = useNavigate();
  const { action } = useContext(Context);

  const handleEditNavigate = () => {
    action.selectBookDispatcher(id);
    navigate(`${PATH.book.edit}/${id}`);
  };

  const handleDelete = () => {
    action.deleteBookDispatcher({ id, title }, (data) => toast(data));
  };

  const handleMarkDone = () => {
    action.updateBookDispatcher(
      { id, title, isDone: true },
      'markDone',
      (data) => toast(data)
    );
  };

  const handleFavourite = () => {
    action.updateBookDispatcher(
      { id, title, isFavourite: !isFavourite },
      'favourite',
      (data) => toast(data)
    );
  };

  const handleUpdateWishlist = () => {
    action.updateBookDispatcher(
      { id, title, isWishlist: false },
      'wishlist',
      (data) => toast(data)
    );
  };

  return (
    <Card w='100%' variant='outline' py={4} px={5}>
      <Flex align='center' justify='space-between' mb={4}>
        <Flex align='center' justify='flex-start' gap={2}>
          {isWishlist ? (
            <IconButton
              colorScheme='whiteAlpha'
              disabled
              icon={
                <FontAwesomeIcon
                  color='darkblue'
                  fontSize={22}
                  icon={faBookmark}
                />
              }
            />
          ) : (
            <IconButton
              colorScheme='whiteAlpha'
              icon={
                <FontAwesomeIcon
                  color='#ebeb05'
                  fontSize={22}
                  icon={isFavourite ? faStarSolid : faStarReg}
                />
              }
              onClick={handleFavourite}
            />
          )}
          <Text
            noOfLines={1}
            color='#392467'
            fontSize='xl'
            fontWeight='semibold'
            _hover={{ textDecoration: 'underline' }}
          >
            <Link to={`${PATH.book.detail}/${id}`}>
              {title}
            </Link>
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
          {!isWishlist ? (
            <Badge colorScheme={isDone ? 'green' : 'orange'}>
              {isDone ? 'Selesai' : 'Belum selesai'}
            </Badge>
          ) : (
            <Button
              variant='link'
              color='darkblue'
              onClick={handleUpdateWishlist}
            >
              Pindahkan ke daftar baca
            </Button>
          )}
          <ButtonGroup>
            <IconButton
              size='lg'
              colorScheme='red'
              icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={handleDelete}
            />
            <IconButton
              size='lg'
              colorScheme='yellow'
              icon={<FontAwesomeIcon icon={faPencilAlt} />}
              onClick={handleEditNavigate}
            />
            {!isDone && !isWishlist && (
              <IconButton
                size='lg'
                colorScheme='green'
                icon={<FontAwesomeIcon icon={faCheck} fontSize={24} />}
                onClick={handleMarkDone}
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
  isShowcase: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  writer: PropTypes.string.isRequired,
  yearPublished: PropTypes.number.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  isWishlist: PropTypes.bool.isRequired
};
