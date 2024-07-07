import PropTypes from 'prop-types';
import { Card, CardBody, Text } from '@chakra-ui/react';

export default function FavBookCard({ bookTitle, writer, yearPublished }) {
  return (
    <Card variant='outline'>
      <CardBody>
        <Text fontSize={22} fontWeight='normal'>
          {bookTitle}
        </Text>
        <Text my={2}>Tahun Terbit: {yearPublished}</Text>
        <Text my={2}>Author: {writer}</Text>
      </CardBody>
    </Card>
  );
}

FavBookCard.propTypes = {
  bookTitle: PropTypes.string.isRequired,
  writer: PropTypes.string.isRequired,
  yearPublished: PropTypes.string.isRequired
};
