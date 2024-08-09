import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import numbro from 'numbro';
import { Card, Flex, Tooltip, Avatar, Box, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { PATH, Context } from '../../constants';

export default function ResultCard({
  id,
  username,
  title,
  updatedAt,
  views,
  category,
  writer,
  yearPublished,
  userId
}) {
  const { action } = useContext(Context);

  const navigate = useNavigate();
  const formattedViews =
    views > 999
      ? numbro(views).format({ average: true, mantissa: 2 }).toUpperCase()
      : views;

  const handleViewProfile = () =>
    navigate(`${PATH.showcase.overview}/${userId}`);

  const handleViewBook = () => {
    action.updateBookDispatcher({ id, views: views + 1 });

    navigate(`${PATH.book.detail}/${id}`);
  };

  return (
    <Card w='100%' variant='outline' py={4} px={5}>
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap={3} mb={4}>
          <Tooltip label='Lihat Profil'>
            <Avatar
              name={username}
              size='md'
              cursor='pointer'
              onClick={handleViewProfile}
            />
          </Tooltip>
          <Box>
            <Text
              noOfLines={1}
              fontSize='xl'
              fontWeight='semibold'
              cursor='pointer'
              onClick={handleViewBook}
              _hover={{ textDecoration: 'underline' }}
            >
              @{username}/{title}
            </Text>
            <Text fontSize='sm' color='#444'>
              Terakhir diperbarui{' '}
              {DateTime.fromISO(updatedAt).setLocale('id').toRelativeCalendar()}
            </Text>
          </Box>
        </Flex>
        <Flex direction='column'>
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
      </Flex>
      <Text>Kategori: {category}</Text>
      <Text>Penulis: {writer} </Text>
      <Text>Tahun: {yearPublished}</Text>
    </Card>
  );
}

ResultCard.propTypes = {
  uid: PropTypes.string,
  id: PropTypes.string,
  username: PropTypes.string,
  title: PropTypes.string,
  updatedAt: PropTypes.string,
  views: PropTypes.number,
  category: PropTypes.string,
  writer: PropTypes.string,
  yearPublished: PropTypes.number,
  userId: PropTypes.string
};
