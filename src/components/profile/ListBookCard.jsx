import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import numbro from 'numbro';
import { PATH, Context } from '../../constants';
import {
  Badge,
  Card,
  Flex,
  Text,
  ButtonGroup,
  IconButton,
  useToast,
  Button,
  Tooltip
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faCheck,
  faStar as faStarSolid,
  faTrash,
  faBookmark,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';

function WishlistIcon() {
  return (
    <IconButton
      colorScheme='whiteAlpha'
      disabled
      icon={
        <FontAwesomeIcon color='darkblue' fontSize={22} icon={faBookmark} />
      }
    />
  );
}

function FavouriteButton({ isFavourite, handleFavourite }) {
  return (
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
  );
}

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
  isWishlist,
  views
}) {
  const toast = useToast();
  const navigate = useNavigate();
  const { action } = useContext(Context);
  const formattedViews =
    views > 999
      ? numbro(views).format({ average: true, mantissa: 2 }).toUpperCase()
      : views;

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

  const handleViewBook = () => {
    if (!isShowcase || isDone) {
      navigate(`${PATH.book.detail}/${id}`);
      return;
    }
  };

  return (
    <Card w='100%' variant='outline' py={4} px={5}>
      <Flex align='flex-start' justify='space-between'>
        <Flex align='center' justify='flex-start' gap={2}>
          {!isShowcase ? (
            <>
              {isWishlist ? (
                <WishlistIcon />
              ) : (
                <FavouriteButton
                  handleFavourite={handleFavourite}
                  isFavourite={isFavourite}
                />
              )}
            </>
          ) : null}
          <Text
            noOfLines={1}
            color='#392467'
            fontSize='xl'
            fontWeight='semibold'
            cursor='pointer'
            onClick={handleViewBook}
            _hover={{ textDecoration: 'underline' }}
          >
            {title}
          </Text>
        </Flex>
        {isShowcase ? (
          <Flex direction='column' align='center'>
            <Tooltip label={`Total dilihat: ${views} orang`}>
              <FontAwesomeIcon
                icon={faEye}
                size='xl'
                color='#444'
                cursor='pointer'
              />
            </Tooltip>
            <Text fontWeight='semibold'>{formattedViews}</Text>
          </Flex>
        ) : (
          <Badge colorScheme={isPublic ? 'blue' : 'gray'}>
            {isPublic ? 'Publik' : 'Privat'}
          </Badge>
        )}
      </Flex>
      <Text>Kategori: {category || '-'}</Text>
      <Text>Penulis: {writer}</Text>
      <Text>Tahun: {yearPublished}</Text>
      <Flex align='center' justify='space-between' mt={6}>
        {!isWishlist ? (
          <Badge colorScheme={isDone ? 'green' : 'orange'}>
            {isDone ? 'Selesai' : 'Belum selesai'}
          </Badge>
        ) : (
          <>
            {isShowcase ? (
              <Badge colorScheme='blue'>Wishlist</Badge>
            ) : (
              <Button
                variant='link'
                color='darkblue'
                onClick={handleUpdateWishlist}
              >
                Pindahkan ke daftar baca
              </Button>
            )}
          </>
        )}
        {!isShowcase && (
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
        )}
      </Flex>
    </Card>
  );
}

FavouriteButton.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  handleFavourite: PropTypes.func.isRequired
};

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
  isWishlist: PropTypes.bool.isRequired,
  views: PropTypes.number.isRequired
};
