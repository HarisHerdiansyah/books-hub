import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Flex, Tooltip, Avatar, Box, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { PATH } from '../../constants';

export default function ResultCard({
  username,
  title,
  updatedAt,
  views,
  category,
  writer,
  yearPublished
}) {
  return (
    <Card w='100%' variant='outline' py={4} px={5}>
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap={3} mb={4}>
          <Tooltip label='Lihat Profil'>
            <Avatar name='Ahmad Kaseem' size='md' cursor='pointer' />
          </Tooltip>
          <Box>
            <Text
              noOfLines={1}
              fontSize='xl'
              fontWeight='semibold'
              _hover={{ textDecoration: 'underline' }}
            >
              <Link to={PATH.profile.overview}>
                @{username}/{title}
              </Link>
            </Text>
            <Text fontSize='sm' color='#444'>
              Terakhir diperbarui {updatedAt}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Tooltip label={`Total dilihat: ${views} orang`}>
            <FontAwesomeIcon
              icon={faEye}
              size='xl'
              color='#444'
              cursor='pointer'
            />
          </Tooltip>
          <Text fontWeight='semibold'>{views}</Text>
        </Box>
      </Flex>
      <Text>Kategori: {category}</Text>
      <Text>Penulis: {writer} </Text>
      <Text>Tahun: {yearPublished}</Text>
    </Card>
  );
}

ResultCard.propTypes = {
  uid: PropTypes.string,
  username: PropTypes.string,
  title: PropTypes.string,
  updatedAt: PropTypes.string,
  views: PropTypes.number,
  category: PropTypes.string,
  writer: PropTypes.string,
  yearPublished: PropTypes.number
};
